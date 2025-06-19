import { ExternalLink, Star, Users, Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const Products = () => {
  const products = [
    {
      id: 1,
      name: "ERP Solutions Suite",
      category: "Enterprise",
      description: "Comprehensive Enterprise Resource Planning system designed for medium to large businesses. Includes modules for accounting, inventory, HR, and project management.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      features: ["Multi-module integration", "Real-time analytics", "Cloud-based", "Mobile access"],
      price: "Custom pricing",
      rating: 4.8,
      users: "500+",
      status: "Available"
    },
    {
      id: 2,
      name: "School Management System",
      category: "Education",
      description: "Complete school administration platform covering student enrollment, grading, attendance tracking, and parent communication.",
      image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=600&h=400&fit=crop",
      features: ["Student portal", "Grade management", "Attendance tracking", "Parent communication"],
      price: "$299/month",
      rating: 4.9,
      users: "200+",
      status: "Available"
    },
    {
      id: 3,
      name: "E-Commerce Platform",
      category: "Retail",
      description: "Modern e-commerce solution with advanced inventory management, payment processing, and analytics dashboard.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      features: ["Multi-vendor support", "Payment gateway", "Inventory management", "Analytics dashboard"],
      price: "$199/month",
      rating: 4.7,
      users: "1000+",
      status: "Available"
    },
    {
      id: 4,
      name: "Healthcare Management",
      category: "Healthcare",
      description: "Digital health platform for clinics and hospitals with patient records, appointment scheduling, and billing integration.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop",
      features: ["Patient records", "Appointment scheduling", "Billing integration", "Prescription management"],
      price: "$399/month",
      rating: 4.6,
      users: "150+",
      status: "Available"
    },
    {
      id: 5,
      name: "Project Management Tool",
      category: "Productivity",
      description: "Collaborative project management platform with task tracking, team communication, and progress analytics.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
      features: ["Task management", "Team collaboration", "Time tracking", "Progress reports"],
      price: "$49/month",
      rating: 4.5,
      users: "2000+",
      status: "Available"
    },
    {
      id: 6,
      name: "Financial Analytics AI",
      category: "FinTech",
      description: "AI-powered financial analysis tool that provides insights, predictions, and automated reporting for businesses.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      features: ["AI predictions", "Automated reports", "Risk analysis", "Performance metrics"],
      price: "Coming Soon",
      rating: 0,
      users: "0",
      status: "Coming Soon"
    }
  ];

  const categories = ["All", "Enterprise", "Education", "Retail", "Healthcare", "Productivity", "FinTech"];

  return (
    <div className="min-h-screen bg-brand-light">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-light to-brand-accent/20 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
              Our <span className="bg-gradient-to-r from-brand-dark to-brand-accent bg-clip-text text-transparent">Products</span>
            </h1>
            <p className="text-xl text-brand-dark/80 max-w-3xl mx-auto">
              Discover our portfolio of innovative software solutions designed to streamline 
              operations and drive business growth across various industries.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-brand-light border-b border-brand-accent/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button 
                key={category} 
                variant="outline" 
                className="border-brand-accent text-brand-dark hover:bg-brand-accent hover:text-brand-light transition-all duration-300"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <Card 
                key={product.id} 
                className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-slide-in-from-left bg-white border-brand-accent/20"
                style={{ animationDelay: `${200 + index * 150}ms` }}
              >
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-brand-accent text-white border-0">
                      {product.category}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge 
                      variant={product.status === "Available" ? "default" : "secondary"}
                      className={product.status === "Available" ? "bg-green-600 text-white border-0" : "bg-brand-accent/20 text-brand-dark border-0"}
                    >
                      {product.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-brand-dark mb-2">
                    {product.name}
                  </h3>
                  <p className="text-brand-dark/70 mb-4 text-sm">
                    {product.description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex flex-wrap gap-2">
                      {product.features.map((feature) => (
                        <span 
                          key={feature} 
                          className="text-xs bg-brand-accent/10 text-brand-dark px-2 py-1 rounded-full border border-brand-accent/20"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    {product.status === "Available" && (
                      <div className="flex items-center justify-between text-sm text-brand-dark/70">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span>{product.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{product.users} users</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-semibold text-brand-accent">
                      {product.price}
                    </div>
                    <div className="flex gap-2">
                      {product.status === "Available" ? (
                        <>
                          <Button size="sm" variant="outline" className="border-brand-accent text-brand-dark hover:bg-brand-accent hover:text-white">
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Demo
                          </Button>
                          <Button size="sm" className="bg-brand-dark hover:bg-brand-dark/90 text-brand-light">
                            Get Started
                          </Button>
                        </>
                      ) : (
                        <Button size="sm" variant="outline" disabled className="border-brand-accent/50 text-brand-dark/50">
                          Coming Soon
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Solutions Section */}
      <section className="py-20 bg-brand-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
              Need a Custom Solution?
            </h2>
            <p className="text-xl text-brand-dark/80 max-w-2xl mx-auto">
              Don't see what you're looking for? We specialize in creating custom software 
              solutions tailored to your specific business needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center bg-white border-brand-accent/20">
              <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-brand-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-brand-dark">Consultation</h3>
              <p className="text-brand-dark/70">We understand your unique requirements</p>
            </Card>
            
            <Card className="p-8 text-center bg-white border-brand-accent/20">
              <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-brand-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-brand-dark">Custom Development</h3>
              <p className="text-brand-dark/70">Tailored solutions built from scratch</p>
            </Card>
            
            <Card className="p-8 text-center bg-white border-brand-accent/20">
              <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="h-8 w-8 text-brand-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-brand-dark">Deployment & Support</h3>
              <p className="text-brand-dark/70">Full deployment and ongoing maintenance</p>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/contact">
              <Button size="lg" className="bg-gradient-to-r from-brand-dark to-brand-accent hover:from-brand-dark/90 hover:to-brand-accent/90 text-brand-light">
                Request Custom Solution
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
