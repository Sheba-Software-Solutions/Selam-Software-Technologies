
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for your message. We'll get back to you soon.",
    });
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-blue-600" />,
      title: "Email",
      details: ["info@selamsoftware.com", "support@selamsoftware.com"],
      description: "Send us an email anytime"
    },
    {
      icon: <Phone className="h-6 w-6 text-blue-600" />,
      title: "Phone",
      details: ["+251 911 123 456", "+251 922 789 012"],
      description: "Mon-Fri from 8am to 6pm"
    },
    {
      icon: <MapPin className="h-6 w-6 text-blue-600" />,
      title: "Office",
      details: ["Bole Sub City", "Addis Ababa, Ethiopia"],
      description: "Come visit our office"
    },
    {
      icon: <Clock className="h-6 w-6 text-blue-600" />,
      title: "Business Hours",
      details: ["Mon - Fri: 8:00 AM - 6:00 PM", "Sat: 9:00 AM - 2:00 PM"],
      description: "We're here to help"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-light to-brand-accent/20 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-in fade-in-50 duration-1000">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Get In <span className="bg-gradient-to-r from-brand-dark to-brand-accent bg-clip-text text-transparent">Touch</span>
            </h1>
            <p className="text-xl text-brand-dark/80 max-w-3xl mx-auto">
              Ready to start your next project? We'd love to hear from you. 
              Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <Card 
                key={info.title} 
                className="p-6 text-center hover:shadow-lg transition-all duration-300 animate-in fade-in-50 duration-1000"
                style={{ animationDelay: `${200 + index * 150}ms` }}
              >
                <div className="flex justify-center mb-4">
                  {info.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {info.title}
                </h3>
                <div className="space-y-1 mb-2">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600 font-medium">
                      {detail}
                    </p>
                  ))}
                </div>
                <p className="text-sm text-gray-500">
                  {info.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="animate-in slide-in-from-left-8 duration-1000">
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Send us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <Input 
                        type="text" 
                        required 
                        className="w-full"
                        placeholder="Your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <Input 
                        type="text" 
                        required 
                        className="w-full"
                        placeholder="Your last name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <Input 
                      type="email" 
                      required 
                      className="w-full"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <Input 
                      type="tel" 
                      className="w-full"
                      placeholder="+251 911 123 456"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <Input 
                      type="text" 
                      required 
                      className="w-full"
                      placeholder="What's this about?"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <Textarea 
                      required 
                      rows={6}
                      className="w-full"
                      placeholder="Tell us more about your project..."
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-brand-dark to-brand-accent hover:from-brand-dark/90 hover:to-brand-accent/90"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </Button>
                </form>
              </Card>
            </div>

            {/* Map and Additional Info */}
            <div className="animate-in slide-in-from-right-8 duration-1000">
              <Card className="p-8 h-full">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Visit Our Office
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Our Location
                    </h3>
                    <p className="text-gray-600">
                      We're located in the heart of Addis Ababa, easily accessible 
                      by public transportation and with parking available.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Office Address
                    </h3>
                    <p className="text-gray-600">
                      Selam Software Technologies<br />
                      Bole Atlas Building, 5th Floor<br />
                      Bole Sub City<br />
                      Addis Ababa, Ethiopia
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      What to Expect
                    </h3>
                    <ul className="text-gray-600 space-y-2">
                      <li>• Free consultation on your project</li>
                      <li>• Meet our experienced team</li>
                      <li>• Tour our modern development facility</li>
                      <li>• Discuss your requirements in detail</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">
                      Schedule a Meeting
                    </h4>
                    <p className="text-blue-700 text-sm mb-3">
                      Prefer to meet in person? Schedule a consultation at our office.
                    </p>
                    <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                      Book Appointment
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600">
              Quick answers to common questions
            </p>
          </div>
          
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How long does a typical project take?
              </h3>
              <p className="text-gray-600">
                Project timelines vary based on complexity and requirements. Simple websites 
                take 2-4 weeks, while complex applications can take 3-6 months. We provide 
                detailed timelines during consultation.
              </p>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Do you provide ongoing support?
              </h3>
              <p className="text-gray-600">
                Yes, we offer comprehensive support and maintenance packages. This includes 
                bug fixes, updates, security patches, and feature enhancements.
              </p>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What technologies do you specialize in?
              </h3>
              <p className="text-gray-600">
                We work with modern technologies including React, Vue.js, Node.js, Python, 
                cloud platforms (AWS, Azure), and mobile development frameworks.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
