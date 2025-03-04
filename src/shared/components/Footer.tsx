import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-amber-700 text-amber-100 py-6 mt-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
        {/* Logo & Navigation */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full border-b border-amber-700 pb-4">
          <Link to="/" className="text-2xl font-bold text-amber-50">
            PawsAndAdopt
          </Link>
          <nav className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/" className="hover:text-amber-300">Home</Link>
            <Link to="/about" className="hover:text-amber-300">About</Link>
            <Link to="/adopt" className="hover:text-amber-300">Adopt Pet</Link>
            <Link to="/donate" className="hover:text-amber-300">Donate Pet</Link>
            <Link to="/contact" className="hover:text-amber-300">Contact</Link>
          </nav>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-4 my-4">
          <Link to="#" className="hover:text-amber-300">
            <Facebook className="h-5 w-5" />
          </Link>
          <Link to="#" className="hover:text-amber-300">
            <Twitter className="h-5 w-5" />
          </Link>
          <Link to="#" className="hover:text-amber-300">
            <Instagram className="h-5 w-5" />
          </Link>
        </div>

        {/* Copyright Section */}
        <p className="text-sm text-amber-200">© 2025 PawsAndAdopt. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
