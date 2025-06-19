
import { ArrowRight, CheckCircle, Star, Users, Award, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: <Zap className="h-8 w-8 text-brand-accent" />,
      title: "Fast Development",
      description: "Rapid prototyping and deployment with cutting-edge technologies"
    },
    {
      icon: <Users className="h-8 w-8 text-brand-accent" />,
      title: "Expert Team",
      description: "Experienced developers with proven track record"
    },
    {
      icon: <Award className="h-8 w-8 text-brand-accent" />,
      title: "Quality Assured",
      description: "Rigorous testing and quality control processes"
    }
  ];

  const services = [
    { name: "Web Development", description: "Modern, responsive web applications" },
    { name: "Mobile Apps", description: "Native and cross-platform mobile solutions" },
    { name: "Cloud Solutions", description: "Scalable cloud infrastructure and services" },
    { name: "UI/UX Design", description: "Beautiful, user-centered design experiences" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-light via-brand-light to-brand-accent/10 py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center animate-in fade-in-50 duration-1000">
            <h1 className="text-4xl md:text-6xl font-bold text-brand-dark mb-6">
              Building Tomorrow's
              <span className="block bg-gradient-to-r from-brand-dark to-brand-accent bg-clip-text text-transparent">
                Software Solutions
              </span>
            </h1>
            <p className="text-xl text-brand-dark/80 mb-8 max-w-3xl mx-auto">
              Selam Software Technologies transforms your ideas into powerful digital solutions. 
              We specialize in cutting-edge software development that drives business growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-brand-dark to-brand-accent hover:from-brand-dark/90 hover:to-brand-accent/90 text-lg px-8 py-3">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-2 border-brand-accent text-brand-accent hover:bg-brand-accent/10">
                View Our Work
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-in fade-in-50 duration-1000 delay-200">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
              Why Choose Selam Software?
            </h2>
            <p className="text-xl text-brand-dark/80 max-w-2xl mx-auto">
              We combine technical expertise with creative innovation to deliver exceptional results
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={feature.title} 
                className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-in fade-in-50 duration-1000 bg-white border-brand-accent/20"
                style={{ animationDelay: `${400 + index * 200}ms` }}
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-brand-dark mb-2">
                  {feature.title}
                </h3>
                <p className="text-brand-dark/70">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-brand-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
              Our Services
            </h2>
            <p className="text-xl text-brand-dark/80">
              Comprehensive software solutions tailored to your needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card 
                key={service.name} 
                className="p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 bg-white border-brand-accent/20"
              >
                <h3 className="text-lg font-semibold text-brand-dark mb-2">
                  {service.name}
                </h3>
                <p className="text-brand-dark/70 text-sm">
                  {service.description}
                </p>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/services">
              <Button size="lg" variant="outline" className="text-brand-accent border-brand-accent hover:bg-brand-accent/10">
                View All Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-brand-dark to-brand-accent text-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="animate-in fade-in-50 duration-1000">
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-brand-light/80">Projects Completed</div>
            </div>
            <div className="animate-in fade-in-50 duration-1000 delay-200">
              <div className="text-4xl font-bold mb-2">25+</div>
              <div className="text-brand-light/80">Happy Clients</div>
            </div>
            <div className="animate-in fade-in-50 duration-1000 delay-400">
              <div className="text-4xl font-bold mb-2">10+</div>
              <div className="text-brand-light/80">Team Members</div>
            </div>
            <div className="animate-in fade-in-50 duration-1000 delay-600">
              <div className="text-4xl font-bold mb-2">3+</div>
              <div className="text-brand-light/80">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brand-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-brand-dark/80 mb-8">
            Let's discuss how we can help transform your ideas into reality
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-gradient-to-r from-brand-dark to-brand-accent hover:from-brand-dark/90 hover:to-brand-accent/90 text-lg px-8 py-3">
                Start a Project
              </Button>
            </Link>
            <Link to="/jobs">
              <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-2 border-brand-accent text-brand-accent hover:bg-brand-accent/10">
                Join Our Team
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
