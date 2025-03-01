import { Button } from "@/components/ui/button";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full border-b bg-amber-100">
      <div className="w-full px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Search */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center">
              <img src="/api/placeholder/50/50" alt="Paws&Adopt Logo" className="h-10" />
            </Link>            
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <div className="text-right">
              {/* <p className="text-amber-800">contact@pawsandadopt.com</p> */}
              <Button className="px-4 py-2 bg-amber-800 text-white rounded-lg hover:bg-amber-700">
                <Link to="/signin">Login</Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Navigation Links using Menubar - Centered */}
        <div className="flex items-center justify-center mt-4">
          <Menubar className="border-none bg-transparent flex-1 flex justify-center">
            {/* Home */}
            <MenubarMenu>
              <MenubarTrigger className="text-amber-800 hover:text-amber-500 text-lg px-6">Home</MenubarTrigger>
            </MenubarMenu>
            
            {/* About */}
            <MenubarMenu>
              <MenubarTrigger className="text-amber-800 hover:text-amber-500 text-lg px-6">About</MenubarTrigger>
            </MenubarMenu>
            
            {/* Donate Pet */}
            <MenubarMenu>
              <MenubarTrigger className="text-amber-800 hover:text-amber-500 text-lg px-6">Donate Pet</MenubarTrigger>
              <MenubarContent className="bg-amber-50 border-amber-200">
                <MenubarItem className="hover:bg-amber-100">
                  <Link to="/donate/dog" className="flex w-full text-amber-800">View DonatePet Request</Link>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            
            {/* Adopt Pet */}
            <MenubarMenu>
              <MenubarTrigger className="text-amber-800 hover:text-amber-500 text-lg px-6">Adopt Pet</MenubarTrigger>
              <MenubarContent className="bg-amber-50 border-amber-200">
                <MenubarItem className="hover:bg-amber-100">
                  <Link to="/adopt/cat" className="flex w-full text-amber-800">View AdoptPet Request</Link>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>       
      </div>
    </nav>
  );
};

export default Navbar;