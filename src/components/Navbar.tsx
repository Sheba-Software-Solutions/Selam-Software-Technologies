
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo_white from '@/assets/logo_brand2.svg';
 
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Products", path: "/products" },
    { name: "Jobs", path: "/jobs" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-brand-light/95 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-brand-accent/20">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
              <img src={Logo_white} alt="Description" className="w-12" />
            <span className="text-xl font-bold bg-gradient-to-r from-brand-dark to-brand-accent bg-clip-text text-transparent">
              Selam Software Technologies
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-brand-accent/10 ${
                  isActive(item.path)
                    ? "text-brand-dark bg-brand-accent/20"
                    : "text-brand-dark hover:text-brand-dark"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Button className="ml-4 bg-gradient-to-r from-brand-dark to-brand-accent hover:from-brand-dark/90 hover:to-brand-accent/90 transition-all duration-200">
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden animate-in slide-in-from-top-2 duration-200">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-brand-light border-t border-brand-accent/20">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                    isActive(item.path)
                      ? "text-brand-dark bg-brand-accent/20"
                      : "text-brand-dark hover:text-brand-dark hover:bg-brand-accent/10"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-2">
                <Button className="w-full bg-gradient-to-r from-brand-dark to-brand-accent hover:from-brand-dark/90 hover:to-brand-accent/90">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
