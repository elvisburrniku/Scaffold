import { HardHat } from "lucide-react";
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin 
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <HardHat className="text-primary h-6 w-6 mr-2" />
              <span className="font-bold text-stone-800 text-lg">ScaffoldPro</span>
            </div>
            <p className="text-primary text-sm mb-4">
              The professional scaffolding calculator for construction experts.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary hover:text-primary">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-primary hover:text-primary">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-primary hover:text-primary">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-primary hover:text-primary">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-stone-800 font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="text-stone-800 hover:text-primary">Features</a></li>
              <li><a href="#calculator" className="text-stone-800 hover:text-primary">Calculator</a></li>
              <li><a href="#types" className="text-stone-800 hover:text-primary">Scaffolding Types</a></li>
              <li><a href="#waitlist" className="text-stone-800 hover:text-primary">Join Waitlist</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-stone-800 font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-stone-800 hover:text-primary">Documentation</a></li>
              <li><a href="#" className="text-stone-800 hover:text-primary">FAQs</a></li>
              <li><a href="#" className="text-stone-800 hover:text-primary">Scaffolding Safety</a></li>
              <li><a href="#" className="text-stone-800 hover:text-primary">Industry Standards</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-stone-800 font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Mail className="text-primary h-5 w-5 mt-0.5 mr-3" />
                <span className="text-stone-800">info@scaffoldpro.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="text-primary h-5 w-5 mt-0.5 mr-3" />
                <span className="text-stone-800">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start">
                <MapPin className="text-primary h-5 w-5 mt-0.5 mr-3" />
                <span className="text-stone-800">123 Construction Way<br />Building City, BC 10001</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t text-stone-800 border-gray-700 mt-8 pt-8 text-sm text-gray-400 flex flex-col md:flex-row justify-between">
          <p>&copy; {new Date().getFullYear()} ScaffoldPro. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="text-stone-800 hover:text-primary">Privacy Policy</a>
            <a href="#" className="text-stone-800 hover:text-primary">Terms of Service</a>
            <a href="#" className="text-stone-800 hover:text-primary">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
