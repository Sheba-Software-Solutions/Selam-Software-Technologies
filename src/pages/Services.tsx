
import { Code, Smartphone, Globe, Database, Shield, Headphones, ArrowRight, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Services = () => {
  const services = [
    {
      icon: <Code className="h-8 w-8" />,
      title: "Custom Software Development",
      description: "Tailored software solutions built from scratch to meet your specific business requirements and objectives.",
      features: ["Full-stack development", "API integration", "Database design", "Quality assurance"],
      price: "Starting at $5,000"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Web Application Development",
      description: "Modern, responsive web applications using cutting-edge technologies and best practices.",
      features: ["React/Vue.js development", "Progressive Web Apps", "E-commerce solutions", "CMS development"],
      price: "Starting at $3,000"
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications for iOS and Android devices.",
      features: ["Native iOS/Android", "React Native", "Flutter development", "App store deployment"],
      price: "Starting at $8,000"
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Database Solutions",
      description: "Comprehensive database design, optimization, and management services for your applications.",
      features: ["Database design", "Performance optimization", "Data migration", "Backup solutions"],
      price: "Starting at $2,000"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Security & Compliance",
      description: "Robust security implementations and compliance solutions to protect your digital assets.",
      features: ["Security audits", "Penetration testing", "GDPR compliance", "Data encryption"],
      price: "Starting at $4,000"
    },
    {
      icon: <Headphones className="h-8 w-8" />,
      title: "Technical Support",
      description: "Ongoing technical support and maintenance services to ensure your systems run smoothly.",
      features: ["24/7 monitoring", "Bug fixes", "Performance optimization", "Regular updates"],
      price: "Starting at $500/month"
    }
  ];

  const process = [
    {
      step: "01",
      title: "Discovery & Planning",
      description: "We analyze your requirements and create a detailed project roadmap."
    },
    {
      step: "02",
      title: "Design & Prototype",
      description: "Creating wireframes and prototypes to visualize the final product."
    },
    {
      step: "03",
      title: "Development",
      description: "Building your solution using agile methodology with regular updates."
    },
    {
      step: "04",
      title: "Testing & Launch",
      description: "Comprehensive testing followed by deployment and go-live support."
    }
  ];

  return (
    <div className="min-h-screen bg-brand-light">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-light to-brand-accent/20 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
              Our <span className="bg-gradient-to-r from-brand-dark to-brand-accent bg-clip-text text-transparent">Services</span>
            </h1>
            <p className="text-xl text-brand-dark/80 max-w-3xl mx-auto mb-8">
              We provide comprehensive software development services to help businesses 
              thrive in the digital landscape with cutting-edge technology solutions.
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-brand-dark hover:bg-brand-dark/90 text-brand-light">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
              What We Offer
            </h2>
            <p className="text-xl text-brand-dark/70 max-w-2xl mx-auto">
              From concept to deployment, we provide end-to-end software development services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-slide-in-from-left bg-white border-brand-accent/20"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="w-16 h-16 bg-brand-accent/10 rounded-lg flex items-center justify-center mb-6 text-brand-accent">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-brand-dark mb-3">
                  {service.title}
                </h3>
                <p className="text-brand-dark/70 mb-4">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-brand-dark/80 text-sm">
                      <CheckCircle className="h-4 w-4 text-brand-accent mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-brand-accent">
                    {service.price}
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-brand-accent text-brand-dark hover:bg-brand-accent hover:text-white"
                  >
                    Learn More
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-brand-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
              Our Development Process
            </h2>
            <p className="text-xl text-brand-dark/70 max-w-2xl mx-auto">
              We follow a proven methodology to ensure successful project delivery
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <div 
                key={index} 
                className="text-center animate-scale-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="w-16 h-16 bg-brand-dark text-brand-light rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-brand-dark mb-2">
                  {item.title}
                </h3>
                <p className="text-brand-dark/70">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-brand-dark to-brand-accent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-light mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-brand-light/90 mb-8">
            Let's discuss how we can help bring your vision to life with our expert development team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-brand-light text-brand-dark hover:bg-brand-light/90">
                Get Free Consultation
              </Button>
            </Link>
            <Link to="/products">
              <Button size="lg" variant="outline" className="border-brand-light text-brand-light hover:bg-brand-light hover:text-brand-dark">
                View Our Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
