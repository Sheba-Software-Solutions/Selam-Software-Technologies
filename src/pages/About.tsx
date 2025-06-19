
import { Users, Target, Heart, Award } from "lucide-react";
import { Card } from "@/components/ui/card";

const About = () => {
  const values = [
    {
      icon: <Target className="h-8 w-8 text-brand-accent" />,
      title: "Innovation",
      description: "We constantly push the boundaries of technology to deliver cutting-edge solutions."
    },
    {
      icon: <Heart className="h-8 w-8 text-brand-accent" />,
      title: "Client First",
      description: "Our clients' success is our success. We prioritize their needs above all else."
    },
    {
      icon: <Award className="h-8 w-8 text-brand-accent" />,
      title: "Excellence",
      description: "We maintain the highest standards of quality in everything we do."
    },
    {
      icon: <Users className="h-8 w-8 text-brand-accent" />,
      title: "Collaboration",
      description: "We believe in the power of teamwork and open communication."
    }
  ];

  const team = [
    {
      name: "Abraham Tadesse",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Sarah Kebede",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1494790108755-2616b1e9ba79?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Daniel Mekuria",
      role: "Lead Developer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
    },
    {
      name: "Hanan Ahmed",
      role: "UI/UX Designer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face"
    }
  ];

  return (
    <div className="min-h-screen bg-brand-light">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-light to-brand-accent/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-in fade-in-50 duration-1000">
            <h1 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">
              About <span className="bg-gradient-to-r from-brand-dark to-brand-accent bg-clip-text text-transparent">Selam Software</span>
            </h1>
            <p className="text-xl text-brand-dark/80 max-w-3xl mx-auto">
              We are passionate software developers dedicated to creating innovative solutions 
              that transform businesses and improve lives through technology.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-in slide-in-from-left-8 duration-1000">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-6">
                Our Story
              </h2>
              <p className="text-lg text-brand-dark/80 mb-6">
                Founded in 2021, Selam Software Technologies emerged from a simple belief: 
                technology should serve humanity and drive positive change. Our journey began 
                with a small team of passionate developers in Addis Ababa, Ethiopia.
              </p>
              <p className="text-lg text-brand-dark/80 mb-6">
                Today, we've grown into a dynamic software development company that serves 
                clients across various industries. We specialize in creating custom software 
                solutions, web applications, and mobile apps that solve real-world problems.
              </p>
              <p className="text-lg text-brand-dark/80">
                Our name "Selam" means "peace" in Amharic, reflecting our commitment to 
                creating harmonious solutions that bring technology and human needs together.
              </p>
            </div>
            <div className="animate-in slide-in-from-right-8 duration-1000">
              <img 
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop" 
                alt="Team working" 
                className="rounded-lg shadow-xl w-full h-96 object-cover border border-brand-accent/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-brand-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
              Our Values
            </h2>
            <p className="text-xl text-brand-dark/80">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card 
                key={value.title} 
                className="p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-in fade-in-50 duration-1000 bg-white border-brand-accent/20"
                style={{ animationDelay: `${200 + index * 150}ms` }}
              >
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-brand-dark mb-3">
                  {value.title}
                </h3>
                <p className="text-brand-dark/70">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-brand-dark/80">
              The talented individuals behind our success
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card 
                key={member.name} 
                className="p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-in fade-in-50 duration-1000 bg-white border-brand-accent/20"
                style={{ animationDelay: `${300 + index * 150}ms` }}
              >
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-brand-accent/20"
                />
                <h3 className="text-lg font-semibold text-brand-dark mb-1">
                  {member.name}
                </h3>
                <p className="text-brand-accent font-medium">
                  {member.role}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-r from-brand-dark to-brand-accent text-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="text-center lg:text-left animate-in slide-in-from-left-8 duration-1000">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-brand-light/90">
                To empower businesses and organizations with innovative software solutions 
                that drive growth, efficiency, and success. We strive to make technology 
                accessible and beneficial for everyone.
              </p>
            </div>
            <div className="text-center lg:text-left animate-in slide-in-from-right-8 duration-1000">
              <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
              <p className="text-lg text-brand-light/90">
                To be the leading software development company in Ethiopia and beyond, 
                recognized for our innovation, quality, and commitment to transforming 
                the digital landscape of Africa.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
