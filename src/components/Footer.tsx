
import { Code, Mail, Phone, MapPin, Github, Twitter, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-brand-dark text-brand-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-gradient-to-r from-brand-accent to-brand-light rounded-lg">
                <Code className="h-6 w-6 text-brand-dark" />
              </div>
              <span className="text-xl font-bold">Selam Software Technologies</span>
            </div>
            <p className="text-brand-light/80 mb-4 max-w-md">
              We are a leading software development company specializing in cutting-edge 
              solutions that transform businesses and drive innovation.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-brand-light/60 hover:text-brand-accent transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-brand-light/60 hover:text-brand-accent transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-brand-light/60 hover:text-brand-accent transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-brand-light/80 hover:text-brand-light transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-brand-light/80 hover:text-brand-light transition-colors">About</Link></li>
              <li><Link to="/services" className="text-brand-light/80 hover:text-brand-light transition-colors">Services</Link></li>
              <li><Link to="/products" className="text-brand-light/80 hover:text-brand-light transition-colors">Products</Link></li>
              <li><Link to="/jobs" className="text-brand-light/80 hover:text-brand-light transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-brand-light/80">
                <Mail className="h-4 w-4" />
                <span>info@selamsoftware.com</span>
              </div>
              <div className="flex items-center space-x-2 text-brand-light/80">
                <Phone className="h-4 w-4" />
                <span>+251 911 123 456</span>
              </div>
              <div className="flex items-center space-x-2 text-brand-light/80">
                <MapPin className="h-4 w-4" />
                <span>Addis Ababa, Ethiopia</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-brand-accent/30 mt-8 pt-8 text-center text-brand-light/60">
          <p>&copy; 2024 Selam Software Technologies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
