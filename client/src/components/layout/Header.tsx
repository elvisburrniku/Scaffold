import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { HardHat, Menu, X } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <HardHat className="text-primary h-8 w-8 mr-2" />
            <span className="font-bold text-xl text-secondary">ScaffoldPro</span>
          </div>
          
          {/* Mobile menu button */}
          <button 
            type="button" 
            className="lg:hidden text-secondary focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
          
          {/* Desktop navigation */}
          <nav className="hidden lg:flex space-x-8">
            <a href="#features" className="text-secondary hover:text-primary transition-colors">Features</a>
            <a href="#calculator" className="text-secondary hover:text-primary transition-colors">Calculator</a>
            <a href="#types" className="text-secondary hover:text-primary transition-colors">Scaffolding Types</a>
            <a href="#waitlist" className="text-secondary hover:text-primary transition-colors">Join Waitlist</a>
          </nav>
          
          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Button asChild className="bg-primary hover:bg-primary/90 text-white">
              <a href="#waitlist">Get Early Access</a>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} bg-white pb-4 px-4`}>
        <div className="flex flex-col space-y-3">
          <a 
            href="#features" 
            className="text-secondary hover:text-primary transition-colors py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Features
          </a>
          <a 
            href="#calculator" 
            className="text-secondary hover:text-primary transition-colors py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Calculator
          </a>
          <a 
            href="#types" 
            className="text-secondary hover:text-primary transition-colors py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Scaffolding Types
          </a>
          <a 
            href="#waitlist" 
            className="text-secondary hover:text-primary transition-colors py-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Join Waitlist
          </a>
          <Button 
            asChild 
            className="bg-primary hover:bg-primary/90 text-white w-full mt-2"
          >
            <a 
              href="#waitlist"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get Early Access
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
