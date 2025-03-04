import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, PawPrint, UserCircle, LogOut, Settings } from "lucide-react";
import useAuth from "../hooks/useAuth";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
  MenubarSeparator,
} from "@/components/ui/menubar";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, profileImage, logout } = useAuth();

  return (
    <nav className="w-full bg-amber-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-14 px-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <PawPrint className="h-6 w-6 text-amber-200" />
            <span className="font-bold text-lg text-amber-50">PawsAndAdopt</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 text-amber-100 hover:text-white text-sm font-medium">Home</Link>
            {/* <Link to="/about" className="px-3 py-2 text-amber-100 hover:text-white text-sm font-medium">About</Link> */}
            <Link to="/show_adoptions" className="px-3 py-2 text-amber-100 hover:text-white text-sm font-medium">Adopt Pet</Link>
            <Link to="/show_donations" className="px-3 py-2 text-amber-100 hover:text-white text-sm font-medium">Donate Pet</Link>
          </div>

          {/* Right Side Actions with shadcn Menubar */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <Menubar className="border-0 bg-transparent">
                <MenubarMenu>
                  <MenubarTrigger className="focus:bg-amber-600 data-[state=open]:bg-amber-600 cursor-pointer px-3 py-2">
                    <div className="flex items-center space-x-2">
                      <img 
                        src={profileImage || "https://via.placeholder.com/40"} 
                        alt="Profile" 
                        className="h-8 w-8 rounded-full border" 
                      />
                      <span className="text-sm font-medium text-amber-50">
                        {user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1).toLowerCase()}{" "}
                        {user.last_name.charAt(0).toUpperCase() + user.last_name.slice(1).toLowerCase()}
                      </span>
                    </div>
                  </MenubarTrigger>
                  <MenubarContent className="bg-amber-700 text-amber-50 rounded-md shadow-lg border border-amber-600">
                    <MenubarItem className="focus:bg-amber-600 cursor-pointer">
                      <Link to="/profile" className="flex items-center gap-2 w-full py-1">
                        <UserCircle className="h-4 w-4 text-amber-200" />
                        <span>Profile</span>
                      </Link>
                    </MenubarItem>
                    <MenubarItem className="focus:bg-amber-600 cursor-pointer">
                      <Link to="/settings" className="flex items-center gap-2 w-full py-1">
                        <Settings className="h-4 w-4 text-amber-200" />
                        <span>Settings</span>
                      </Link>
                    </MenubarItem>
                    <MenubarSeparator className="bg-amber-600" />
                    <MenubarItem 
                      className="focus:bg-amber-600 cursor-pointer text-amber-200 hover:text-white"
                      onClick={logout}
                    >
                      <div className="flex items-center gap-2 w-full py-1">
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                      </div>
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            ) : (
              <Link to="/signin" className="px-4 py-1.5 bg-amber-100 text-amber-800 rounded-full text-sm font-medium hover:bg-white transition-colors">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-amber-100" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-amber-800 text-amber-100">
          <div className="flex flex-col px-4 pt-2 pb-4 space-y-2">
            <Link to="/" className="px-3 py-2 hover:bg-amber-700 rounded-md">Home</Link>
            <Link to="/about" className="px-3 py-2 hover:bg-amber-700 rounded-md">About</Link>
            <Link to="/adopt" className="px-3 py-2 hover:bg-amber-700 rounded-md">Adopt Pet</Link>
            <Link to="/donate" className="px-3 py-2 hover:bg-amber-700 rounded-md">Donate Pet</Link>

            <div className="border-t border-amber-700 mt-2 pt-2">
              {user ? (
                <>
                  <Link to="/profile" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-amber-700">
                    <UserCircle className="h-4 w-4 text-amber-200" />
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-amber-700 text-amber-200"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <Link to="/signin" className="px-4 py-2 bg-amber-100 text-amber-800 rounded-md text-sm font-medium">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;