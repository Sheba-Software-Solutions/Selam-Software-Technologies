# Selam Software Backend Specification

Version: 1.0.0  
Status: Draft (Foundation Scope)  
Owner: Backend Team  
Last Updated: 2025-09-14

---
## 1. Purpose & Scope
This document is the single source of truth for implementing the backend services powering the Selam Software website. It defines domain models, API contracts, authentication, validation, operational requirements, and extension points. Frontend relies on these endpoints for: 
- Product catalog management (admin CRUD) & public product retrieval
- Job postings & public job listing / job application submission
- Job application intake & administrative review lifecycle
- Contact form submission intake & administrative triage
- Secure admin authentication & session/token management

Out-of-scope for Phase 1:
- Payments / billing automation
- Multi-tenant access control
- Real-time notifications (websockets)
- Internationalization (i18n) server-side

---
## 2. Architectural Overview
Recommended stack (adjust per org standards):
- Runtime: Node.js 20 LTS
- Framework: Express.js (or NestJS if opinionated layering preferred)
- Database: PostgreSQL 15+ (transactional + relational integrity)
- ORM / Query: Prisma (type-safe schema & migration control)
- Auth: JWT (short-lived access) + HttpOnly Refresh Token rotation
- Caching (Phase 2 optional): Redis (ephemeral: session / rate-limits)
- Containerization: Docker (multi-stage build)
- Deployment Targets: Staging + Production (AWS / Azure / Render etc.)
- Observability: pino (structured logs), OpenTelemetry (future), Prometheus scrape (future)

Layering Suggestion:
1. API Layer (controllers / route handlers)
2. Service Layer (business logic)
3. Repository (Prisma client abstractions)
4. Common (validation, errors, auth utilities)
5. Infra (config, db, logger)

---
## 3. Domain Model Summary
| Domain | Entity | Description |
|--------|--------|-------------|
| Products | Product | Software offerings displayed publicly |
| Jobs | JobPosting | Open roles listed publicly |
| Job Applications | JobApplication | Candidate submissions for job postings |
| Contact | ContactMessage | Inbound contact form submissions |
| Auth | AdminUser | System-defined administrative users |
| Audit | AuditLog | Immutable record of admin actions |

---
## 4. Data Models (Proposed Prisma Schema Snippets)
```prisma
model AdminUser {
  id            String   @id @default(cuid())
  email         String   @unique
  passwordHash  String
  displayName   String
  role          AdminRole @default(ADMIN)
  isActive      Boolean  @default(true)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  auditLogs     AuditLog[]
}

enum AdminRole { ADMIN SUPER_ADMIN }

model Product {
  id            String    @id @default(cuid())
  slug          String    @unique
  name          String
  category      String
  shortDescription String  @db.Text
  longDescription  String? @db.Text
  features      String[]
  priceModel    String    // e.g. "Custom pricing" or "$49/month"
  status        ProductStatus @default(ACTIVE)
  heroImageUrl  String?
  gallery       String[]
  rating        Float?    // optional aggregate
  usersCount    Int?      // optional aggregate
  isArchived    Boolean   @default(false)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

enum ProductStatus { ACTIVE COMING_SOON DISCONTINUED }

model JobPosting {
  id            String   @id @default(cuid())
  title         String
  department    String
  location      String
  employmentType EmploymentType
  description   String   @db.Text
  requirements  String[]
  responsibilities String[]
  compensationRange String?
  isPublished    Boolean  @default(true)
  isArchived     Boolean  @default(false)
  publishAt      DateTime @default(now())
  closeAt        DateTime?
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
  applications   JobApplication[]
}

enum EmploymentType { FULL_TIME PART_TIME CONTRACT INTERN }

model JobApplication {
  id            String   @id @default(cuid())
  jobId         String
  job           JobPosting @relation(fields: [jobId], references: [id])
  candidateName String
  candidateEmail String
  candidatePhone String?
  coverLetter   String?  @db.Text
  resumeUrl     String?  // stored file path / S3 URL
  linkedinUrl   String? 
  portfolioUrl  String?
  status        ApplicationStatus @default(SUBMITTED)
  reviewedAt    DateTime?
  reviewerId    String?
  reviewer      AdminUser? @relation(fields: [reviewerId], references: [id])
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  auditLogs     AuditLog[]
}

enum ApplicationStatus { SUBMITTED IN_REVIEW SHORTLISTED REJECTED HIRED WITHDRAWN }

model ContactMessage {
  id            String   @id @default(cuid())
  name          String
  email         String
  subject       String
  message       String   @db.Text
  status        ContactStatus @default(NEW)
  handledById   String?
  handledBy     AdminUser? @relation(fields: [handledById], references: [id])
  handledAt     DateTime?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  auditLogs     AuditLog[]
}

enum ContactStatus { NEW IN_PROGRESS RESOLVED DISMISSED }

model AuditLog {
  id          String   @id @default(cuid())
  actorId     String?
  actor       AdminUser? @relation(fields: [actorId], references: [id])
  entityType  String
  entityId    String
  action      String
  metadata    Json?
  createdAt   DateTime @default(now())
}

// Indexing suggestions
@@index([slug], map: "idx_product_slug")
@@index([isPublished, isArchived])
@@index([jobId, status])
@@index([email])
```

### Field Notes
- `features` & arrays stored as Postgres text[] (Prisma String[])
- Soft archival via `isArchived` to preserve history & relationships
- `AuditLog` captures all admin mutating actions (create/update/status transitions)

---
## 5. Relationships
- Product: standalone (future: link to pricing plans / modules)
- JobPosting 1..* JobApplication
- AdminUser 1..* AuditLog (actor)
- AdminUser optional reviewer for JobApplication & handler for ContactMessage

---
## 6. Validation Rules
| Entity | Field | Rules |
|--------|-------|-------|
| Product | name | required, 3-120 chars |
| Product | slug | required, kebab-case, unique |
| Product | category | required, 2-60 chars |
| Product | priceModel | required, <= 80 chars |
| Product | features | max 25 items, each 2-80 chars |
| JobPosting | title | required, 3-120 chars |
| JobPosting | department | optional, <= 80 chars |
| JobPosting | location | required, <= 120 chars |
| JobPosting | employmentType | enum validated |
| JobPosting | closeAt | must be > publishAt if provided |
| JobApplication | candidateName | required, 2-120 chars |
| JobApplication | candidateEmail | valid email |
| JobApplication | resumeUrl | optional, must be https if provided |
| ContactMessage | name | required 2-80 |
| ContactMessage | subject | 2-140 chars |
| ContactMessage | message | 5-5000 chars |
| Auth | password | 12+ chars, 1 upper, 1 lower, 1 digit, 1 symbol |

All inputs validated at API boundary using Zod/Yup schema. Reject 422 on violation.

---
## 7. API Design Principles
- RESTful JSON
- Use nouns, plural resources
- Versioning: prefix with `/api/v1` (gateway rewrite allowed)
- Idempotent safe methods: GET; Mutations: POST/PUT/PATCH/DELETE
- Consistent error envelope
- Pagination: cursor-based for large sets (fallback: page/limit)
- Filtering via query params (whitelist fields)
- Sorting: `?sort=field:asc,field2:desc`

### 7.1 Standard Response Shape
```json
{
  "success": true,
  "data": { /* resource or collection */ },
  "meta": { "pagination": {"nextCursor": "..."} }
}
```
Error:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "One or more fields are invalid",
    "details": [{"field": "name", "message": "Too short"}]
  }
}
```

### 7.2 Authentication
- Auth routes under `/api/v1/auth/*`
- Admin login issues: Access Token (JWT, 15m) + Set-Cookie (HttpOnly, Secure) Refresh Token (rotation, 7d)
- Refresh endpoint rotates token & invalidates prior refresh (store token hash + expiry in DB/Redis)
- Logout invalidates refresh token record
- All admin-only endpoints require `Authorization: Bearer <accessToken>`

### 7.3 Rate Limiting (Recommended)
- 60 requests / minute / IP for public submission endpoints (applications, contact)
- 300 requests / minute / IP for authenticated admin
- 10 login attempts / 15 min / IP + account lock escalations (temporary)

---
## 8. Endpoints Specification
Base: `/api/v1`

### 8.1 Auth
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | /auth/login | None | Admin login (email + password) |
| POST | /auth/refresh | Refresh cookie | Rotate & reissue tokens |
| POST | /auth/logout | Access + Refresh | Invalidate refresh |
| GET | /auth/me | Access | Return admin profile |

### 8.2 Products
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | /products | Public | List products (filter: status, category) |
| GET | /products/:id | Public | Get single product |
| POST | /products | Admin | Create product |
| PUT | /products/:id | Admin | Replace product |
| PATCH | /products/:id | Admin | Partial update |
| DELETE | /products/:id | Admin | Soft delete (set isArchived) |
| POST | /products/:id/status | Admin | Change status / archive |

### 8.3 Jobs
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | /jobs | Public | List published, non-archived jobs |
| GET | /jobs/:id | Public | Get job posting |
| POST | /jobs | Admin | Create job posting |
| PUT | /jobs/:id | Admin | Replace job |
| PATCH | /jobs/:id | Admin | Partial update |
| POST | /jobs/:id/publish | Admin | Publish/unpublish toggle |
| DELETE | /jobs/:id | Admin | Archive job |

### 8.4 Job Applications
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | /jobs/:id/applications | Public | Submit application |
| GET | /applications | Admin | List applications (filters: jobId, status) |
| GET | /applications/:id | Admin | Get application detail |
| PATCH | /applications/:id/status | Admin | Transition status (SUBMITTED->IN_REVIEW->SHORTLISTED/REJECTED/HIRED) |

### 8.5 Contact Messages
| Method | Path | Auth | Description |
|--------|------|-------------|-------------|
| POST | /contact | Public | Submit message |
| GET | /contact-messages | Admin | List messages (status filter) |
| GET | /contact-messages/:id | Admin | View message |
| PATCH | /contact-messages/:id/status | Admin | Update status & handler |

### 8.6 Audit Logs
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | /audit-logs | Admin | Paginated query (filters: actorId, entityType) |

---
## 9. Request / Response Examples
### 9.1 Create Product (POST /products)
Request:
```json
{
  "name": "ERP Solutions Suite",
  "slug": "erp-solutions-suite",
  "category": "Enterprise",
  "shortDescription": "Comprehensive ERP system for mid-large orgs.",
  "longDescription": "Full modular ERP with accounting, HR, inventory.",
  "features": ["Real-time analytics", "HR module", "Inventory tracking"],
  "priceModel": "Custom pricing",
  "status": "ACTIVE",
  "heroImageUrl": "https://cdn.example.com/img/erp-hero.png"
}
```
Response 201:
```json
{ "success": true, "data": { "id": "clx...", "name": "ERP Solutions Suite", "status": "ACTIVE" } }
```

### 9.2 Submit Job Application (POST /jobs/:id/applications)
```json
{
  "candidateName": "Jane Doe",
  "candidateEmail": "jane@example.com",
  "candidatePhone": "+12025550123",
  "coverLetter": "I bring 5 years of...",
  "resumeUrl": "https://files.example.com/resumes/jane.pdf",
  "linkedinUrl": "https://www.linkedin.com/in/janedoe/"
}
```

### 9.3 Contact Form (POST /contact)
```json
{
  "name": "Startup Founder",
  "email": "founder@example.com",
  "subject": "Need a custom SaaS platform",
  "message": "We are looking for a partner to build..."
}
```

---
## 10. Status Transition Rules
### JobApplication
| From | To (Allowed) |
|------|--------------|
| SUBMITTED | IN_REVIEW, REJECTED |
| IN_REVIEW | SHORTLISTED, REJECTED |
| SHORTLISTED | HIRED, REJECTED |
| REJECTED | (terminal) |
| HIRED | (terminal) |
| WITHDRAWN | (terminal, only if candidate self-cancels - future) |

### ContactMessage
| From | To |
|------|----|
| NEW | IN_PROGRESS, RESOLVED, DISMISSED |
| IN_PROGRESS | RESOLVED, DISMISSED |
| RESOLVED | (terminal) |
| DISMISSED | (terminal) |

### Product Status
| From | To |
|------|----|
| ACTIVE | COMING_SOON (rare), DISCONTINUED |
| COMING_SOON | ACTIVE, DISCONTINUED |
| DISCONTINUED | (terminal) |

All transitions logged to `AuditLog` with actor + previous/next state metadata.

---
## 11. Authentication & Authorization Details
- System seeds an initial SUPER_ADMIN via migration (email + temporary password hashed)
- Password stored using Argon2id (preferred) with memory/time parameters tuned for 2025 hardware
- On login: verify password, issue JWT with claims: `sub`, `role`, `iat`, `exp`
- Access Token TTL: 15m; Refresh TTL: 7d
- Refresh rotation: store hashed refresh token (tokenId + userId + expiresAt + revoked flag)
- Revoke on logout, password reset, compromise detection
- Only SUPER_ADMIN can create additional AdminUser entries (Phase 2)
- Authorization enforcement: middleware checks role; all admin endpoints require `role in (ADMIN,SUPER_ADMIN)`

---
## 12. Security Controls
| Control | Description |
|---------|-------------|
| Input Validation | Zod schemas reject malformed payloads |
| Rate Limiting | Redis + token bucket per IP/route class |
| Brute Force Protection | Increment login failures; temporary lock after threshold |
| HTTPS Only | Enforce TLS termination at load balancer; set HSTS |
| Secure Cookies | `HttpOnly`, `Secure`, `SameSite=Strict` for refresh token |
| CSP Headers | Mitigate XSS (served via frontend; backend sets defaults) |
| Logging | No sensitive PII (passwords, tokens) in logs |
| Audit Trail | All admin mutations recorded |
| Password Hash | Argon2id with salt; never store raw |
| File Upload Sanitization | Resume file type validation (MIME + extension) |

---
## 13. Pagination & Query Strategy
- Default page size: 20, max: 100
- Cursor pattern: `?cursor=<opaque-id>&limit=20`
- Return `meta.pagination = { nextCursor }` when more results
- Sorting whitelist: Products (`name`, `createdAt`), Jobs (`publishAt`), Applications (`createdAt`, `status`)

---
## 14. Error Codes
| Code | HTTP | Meaning |
|------|------|---------|
| VALIDATION_ERROR | 422 | Schema validation failed |
| UNAUTHORIZED | 401 | Missing/invalid credentials |
| FORBIDDEN | 403 | Insufficient role |
| NOT_FOUND | 404 | Resource not found |
| CONFLICT | 409 | Unique constraint / state conflict |
| RATE_LIMITED | 429 | Too many requests |
| INTERNAL_ERROR | 500 | Unhandled server issue |

---
## 15. Logging & Monitoring
- Log Format: JSON lines (pino) with correlationId (header `x-request-id` or generated)
- Levels: info (requests), warn (recoverable), error (exceptions)
- Mask sensitive fields before logging
- Future: metrics counters (requests_total, db_query_duration_ms)

---
## 16. Configuration & Environment Variables
| Variable | Description | Example |
|----------|-------------|---------|
| PORT | HTTP port | 8080 |
| DATABASE_URL | Postgres connection string | postgres://user:pass@host:5432/db |
| JWT_ACCESS_SECRET | HMAC secret for access tokens | (long random) |
| JWT_REFRESH_SECRET | HMAC secret for refresh tokens | (long random) |
| ACCESS_TOKEN_TTL | Access token TTL (s) | 900 |
| REFRESH_TOKEN_TTL | Refresh token TTL (s) | 604800 |
| RATE_LIMIT_REDIS_URL | Redis connection | redis://... |
| FILE_STORAGE_BUCKET | S3 bucket for resumes | s3://... |
| ALLOWED_ORIGINS | CORS allowed origins CSV | https://app.example.com |
| LOG_LEVEL | pino log level | info |

Secrets managed via environment (use Vault/SSM in prod). Never commit secrets.

---
## 17. Deployment & Migration Workflow
1. Update Prisma schema
2. Run `prisma migrate dev` (local) / `prisma migrate deploy` (CI/CD)
3. Seed SUPER_ADMIN if none exists
4. Run test suite (unit + integration)
5. Build Docker image
6. Deploy to staging; run smoke tests
7. Promote to production after approval

Rollback: apply previous migration snapshot & redeploy prior image. Ensure backward compatible changes (avoid destructive changes without plan).

---
## 18. File Upload Handling (Resume)
- Client uploads resume (PDF/DOC/DOCX max 5MB)
- Backend verifies MIME & extension
- Store to object storage with key pattern: `resumes/<applicationId>/<timestamp>-<sanitized-filename>`
- Persist public (signed URL) or internal URL in `resumeUrl`

---
## 19. Performance & Scalability
| Concern | Strategy |
|---------|----------|
| N+1 Queries | Prisma includes / batching |
| High Read Load | Add Redis cache layer for product list (TTL 5m) |
| Write Contention | Keep transactions short; avoid long-running locks |
| Large Result Sets | Enforce pagination & size caps |
| Slow Startup | Lazy init heavy services (future) |

---
## 20. Testing Strategy
| Layer | Tools | Notes |
|-------|-------|-------|
| Unit | Jest / Vitest | Pure functions & services |
| Integration | Supertest + Test DB | Spin ephemeral DB container |
| E2E (future) | Playwright | Validate API with realistic flows |
| Security | Dependency scanning | GitHub Dependabot / Snyk |

Seed Data: create 2 sample Products, 1 JobPosting, and admin user.

---
## 21. Admin Workflows (Narrative)
### Product Management
1. Admin creates product (draft by default if we add draft state later)
2. Admin updates content/features/status
3. Admin archives instead of deleting; UI hides archived

### Job & Applications
1. Admin posts job (published = true by default)
2. Candidate submits application (public endpoint, rate limited)
3. Admin reviews queue (status SUBMITTED)
4. Admin moves to IN_REVIEW then SHORTLISTED/REJECTED/HIRED

### Contact Messages
1. Public submits message
2. Admin triages NEW -> IN_PROGRESS -> RESOLVED or DISMISSED

All transitions -> `AuditLog`.

---
## 22. Audit Logging Format
```json
{
  "id": "clx...",
  "actorId": "clxAdmin..",
  "entityType": "Product",
  "entityId": "clxProd..",
  "action": "STATUS_CHANGE",
  "metadata": {"from": "COMING_SOON", "to": "ACTIVE"},
  "createdAt": "2025-09-14T12:00:00Z"
}
```

---
## 23. Error Handling Conventions
- Throw typed errors (e.g., ValidationError, AuthError, NotFoundError)
- Global middleware maps to HTTP & standard envelope
- Uncaught exceptions -> 500 + logged `errorId` returned to client

---
## 24. Future Enhancements
| Feature | Rationale |
|---------|-----------|
| Webhooks for applications | Notify external ATS / CRM |
| Email notifications | Alert admin on new application/contact |
| Role hierarchy (support staff) | Granular access |
| Product versioning | Track historical modifications |
| Search service (Elastic) | Full-text over jobs/products |
| Metrics dashboard | Ops observability |

---
## 25. Open Questions / Decisions Needed
| Topic | Question |
|-------|----------|
| Product Demo Links | Are demos externally hosted or require signed URLs? |
| Resume Storage | Use S3 or local disk fallback? |
| Contact Auto-Reply | Should system send confirmation email? |
| Multi-language | Future requirement? |

---
## 26. Quick Start (Local Dev)
```bash
# Install deps
npm install

# Start Postgres (example with docker)
docker run --name selam-pg -e POSTGRES_PASSWORD=dev -p 5432:5432 -d postgres:15

# Set env vars (.env)
cp .env.example .env

# Prisma generate & migrate
npx prisma generate
npx prisma migrate dev --name init

# Run dev server
npm run dev
```

---
## 27. Glossary
| Term | Definition |
|------|------------|
| Archived | Soft-deleted; hidden from public but retained |
| Shortlisted | Candidate advanced for deeper evaluation |
| Audit Log | Immutable admin action record |
| Token Rotation | Issuing a new refresh token each refresh & revoking the old |

---
## 28. Acceptance Criteria (Phase 1)
- Admin can login & retrieve profile
- Admin can create/update/archive product
- Public can list & view products (ACTIVE + COMING_SOON) excluding archived
- Admin can create job posting & publish/unpublish/archive
- Public can list jobs & submit applications
- Admin can view & transition application statuses
- Public can submit contact message
- Admin can triage contact messages
- All admin mutations recorded in audit logs
- Validation & error format consistent across endpoints

---
## 29. Non-Functional Checklist
| Area | Goal |
|------|------|
| Security | No critical vulnerabilities (npm audit) |
| Latency | P50 < 150ms for basic GET list (cold cache) |
| Uptime | 99% initial target |
| Logs | CorrelationId on every request |
| Migrations | Zero data loss on deploy |

---
## 30. License / Ownership
Internal proprietary system. All rights reserved by Selam Software Solutions.

---
## 31. Change Log
| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2025-09-14 | Initial draft |

---
End of Document.
