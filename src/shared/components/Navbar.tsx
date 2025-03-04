import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X,PawPrint } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <nav className="w-full bg-amber-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto">
        {/* Main navbar - height reduced */}
        <div className="flex items-center justify-between h-14 px-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <PawPrint className="h-6 w-6 text-amber-200" />
            <span className="font-bold text-lg text-amber-50">PawsAndAdopt</span>
          </Link>
          
          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/" className="px-3 py-2 text-amber-100 hover:text-white text-sm font-medium">
              Home
            </Link>
            <Link to="/about" className="px-3 py-2 text-amber-100 hover:text-white text-sm font-medium">
              About
            </Link>
            <div className="relative group">
              <Link to="/adopt" className="px-3 py-2 text-amber-100 hover:text-white text-sm font-medium flex items-center">
                Adopt Pet
              </Link>
              {/* <div className="absolute left-0 mt-1 w-48 bg-amber-800 rounded-md shadow-lg hidden group-hover:block z-10">
                <Link to="/adopt/dog" className="block px-4 py-2 text-sm text-amber-100 hover:bg-amber-700">Dogs</Link>
                <Link to="/adopt/cat" className="block px-4 py-2 text-sm text-amber-100 hover:bg-amber-700">Cats</Link>
                <Link to="/adopt/other" className="block px-4 py-2 text-sm text-amber-100 hover:bg-amber-700">Other Pets</Link>
              </div> */}
            </div>
            <div className="relative group">
              <Link to="/donate" className="px-3 py-2 text-amber-100 hover:text-white text-sm font-medium flex items-center">
                Donate Pet
              </Link>
              <div className="absolute left-0 mt-1 w-48 bg-amber-800 rounded-md shadow-lg hidden group-hover:block z-10">
                <Link to="#" className="block px-4 py-2 text-sm text-amber-100 hover:bg-amber-700">Donate Pet</Link>
                <Link to="#" className="block px-4 py-2 text-sm text-amber-100 hover:bg-amber-700">View Donate Requests</Link>
              </div>
            </div>
          </div>
          
          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {/* <button className="p-1.5 rounded-full bg-amber-600 hover:bg-amber-500 text-white">
              <Search className="h-4 w-4" />
            </button> */}
            {/* <Link to="/favorites" className="p-1.5 rounded-full bg-amber-600 hover:bg-amber-500 text-white">
              <Heart className="h-4 w-4" />
            </Link> */}
            <Link to="/signin" className="px-4 py-1.5 bg-amber-100 text-amber-800 rounded-full text-sm font-medium hover:bg-white transition-colors">
              Login
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 text-amber-100" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-amber-800 text-amber-100">
          <div className="flex flex-col px-4 pt-2 pb-4 space-y-1">
            <Link to="/" className="px-3 py-2 text-amber-100 hover:bg-amber-700 rounded-md">Home</Link>
            <Link to="/about" className="px-3 py-2 text-amber-100 hover:bg-amber-700 rounded-md">About</Link>
            <Link to="/adopt" className="px-3 py-2 text-amber-100 hover:bg-amber-700 rounded-md">Adopt Pet</Link>
            <Link to="/donate" className="px-3 py-2 text-amber-100 hover:bg-amber-700 rounded-md">Donate Pet</Link>
            
            <div className="flex items-center justify-between pt-4 border-t border-amber-700 mt-2">
              <Link to="/signin" className="px-4 py-1.5 bg-amber-100 text-amber-800 rounded-md text-sm font-medium">
                Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;