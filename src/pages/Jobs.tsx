
import { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;
import { MapPin, Clock, DollarSign, Users, Briefcase, GraduationCap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
  const response = await fetch(`${API_URL}/api/v1/jobs`);
        if (!response.ok) throw new Error("Failed to fetch jobs");
        const data = await response.json();
        // If backend returns { jobs: [...] }, use data.jobs; else use data
        if (Array.isArray(data)) {
          setJobs(data);
        } else if (Array.isArray(data.jobs)) {
          setJobs(data.jobs);
        } else {
          setJobs([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-brand-light">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-light to-brand-accent/20 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
              Join Our <span className="bg-gradient-to-r from-brand-dark to-brand-accent bg-clip-text text-transparent">Team</span>
            </h1>
            <p className="text-xl text-brand-dark/80 max-w-3xl mx-auto mb-8">
              Be part of a dynamic team that's shaping the future of technology. 
              We offer competitive salaries, great benefits, and opportunities for growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-brand-dark hover:bg-brand-dark/90 text-brand-light">
                View Open Positions
              </Button>
              <Button size="lg" variant="outline" className="border-brand-accent text-brand-dark hover:bg-brand-accent hover:text-white">
                Learn About Our Culture
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-brand-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="animate-scale-in">
              <div className="text-3xl font-bold text-brand-dark mb-2">50+</div>
              <div className="text-brand-dark/70">Team Members</div>
            </div>
            <div className="animate-scale-in" style={{ animationDelay: "150ms" }}>
              <div className="text-3xl font-bold text-brand-dark mb-2">15+</div>
              <div className="text-brand-dark/70">Countries</div>
            </div>
            <div className="animate-scale-in" style={{ animationDelay: "300ms" }}>
              <div className="text-3xl font-bold text-brand-dark mb-2">100+</div>
              <div className="text-brand-dark/70">Projects Delivered</div>
            </div>
            <div className="animate-scale-in" style={{ animationDelay: "450ms" }}>
              <div className="text-3xl font-bold text-brand-dark mb-2">5</div>
              <div className="text-brand-dark/70">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
              Open Positions
            </h2>
            <p className="text-xl text-brand-dark/70 max-w-2xl mx-auto">
              Find your next career opportunity with us
            </p>
          </div>

          <div className="space-y-6">
            {loading && <div className="text-center text-brand-dark">Loading jobs...</div>}
            {error && <div className="text-center text-red-500">{error}</div>}
            {!loading && !error && jobs.length === 0 && (
              <div className="text-center text-brand-dark">No jobs found.</div>
            )}
            {!loading && !error && jobs.map((job, index) => (
              <Card 
                key={job.id} 
                className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slide-in-from-left bg-white border-brand-accent/20"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                  <div className="mb-4 lg:mb-0">
                    <h3 className="text-2xl font-semibold text-brand-dark mb-2">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-brand-dark/70">
                      <div className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        <span>{job.department}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GraduationCap className="h-4 w-4" />
                        <span>{job.experience}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Badge className="bg-brand-accent text-white border-0 text-center">
                      {job.salary}
                    </Badge>
                    <Badge variant="outline" className="border-brand-accent text-brand-dark text-center">
                      Posted {job.posted}
                    </Badge>
                  </div>
                </div>
                <p className="text-brand-dark/80 mb-4">
                  {job.description}
                </p>
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-brand-dark mb-2">Requirements:</h4>
                  <ul className="space-y-1">
                    {Array.isArray(job.requirements) ? job.requirements.map((req, idx) => (
                      <li key={idx} className="text-brand-dark/70 text-sm flex items-start">
                        <span className="text-brand-accent mr-2">•</span>
                        {req}
                      </li>
                    )) : null}
                  </ul>
                </div>
                <div className="flex gap-3">
                  <Link to={`/job-application/${job.id}`}>
                    <Button className="bg-brand-dark hover:bg-brand-dark/90 text-brand-light">
                      Apply Now
                    </Button>
                  </Link>
                  <Button variant="outline" className="border-brand-accent text-brand-dark hover:bg-brand-accent hover:text-white">
                    Save Job
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-brand-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
              Why Work With Us?
            </h2>
            <p className="text-xl text-brand-dark/70 max-w-2xl mx-auto">
              We offer more than just a job - we provide a platform for growth and innovation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center bg-white border-brand-accent/20">
              <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-brand-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-brand-dark">Great Team Culture</h3>
              <p className="text-brand-dark/70">Work with passionate professionals in a collaborative environment</p>
            </Card>
            
            <Card className="p-8 text-center bg-white border-brand-accent/20">
              <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-8 w-8 text-brand-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-brand-dark">Learning & Development</h3>
              <p className="text-brand-dark/70">Continuous learning opportunities and professional development</p>
            </Card>
            
            <Card className="p-8 text-center bg-white border-brand-accent/20">
              <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-brand-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-brand-dark">Competitive Benefits</h3>
              <p className="text-brand-dark/70">Attractive salary packages and comprehensive benefits</p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Jobs;
