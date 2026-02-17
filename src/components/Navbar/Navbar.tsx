import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import DesktopMenu from "./DesktopMenu.js";
import MobileMenu from "./MobileMenu.js";
import HamburgerIcon from "./HamburgerIcon.js";
import Search from "../Search.js";
import { useLenis } from "lenis/react";

const Navbar: React.FC<{ user: any; handleLogout: () => void }> = ({ user, handleLogout }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const getDisplayName = (email:any) => {
        if (!email) return 'User';
        const username = email.split('@')[0];
        
        if (username.length <= 3) {
            return username + '**';
        }
        
        return username.substring(0, 3) + '**';
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const closeMenu = () => {
        setIsMenuOpen(false)
    }
   
    // smooth scroll
    const lenis = useLenis(); 
const handleScroll = (e: React.MouseEvent, id: string) => {
  e.preventDefault();
  isMenuOpen && closeMenu();
  
  const navbar = document.querySelector('nav'); // or use a ref
  const navbarHeight = navbar?.offsetHeight || 64;
  
  if (lenis) {
    lenis.scrollTo(`#${id}`, {
      offset: -(navbarHeight + 24), // navbar height + 24px padding
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  }
};
  

  

    return(
        <nav className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md p-4">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold text-blue-600 dark:text-gray-300 hidden md:block">News Summarizer</h1>
                <h1 className="text-2xl font-bold text-blue-600 dark:text-white md:hidden">NS</h1>
                {location.pathname === '/newsfeed' && <Search />}
                <HamburgerIcon isOpen={isMenuOpen} toggleMenu={toggleMenu} />
                {location.pathname === '/' &&<ul className="hidden md:flex gap-6">
                         <li><a href="#how-it-works" onClick={(e) => handleScroll(e, 'how-it-works')} className="text-blue-600 dark:text-gray-300 hover:text-blue-800 dark:hover:text-gray-100 transition-colors">How it works</a></li>
                     <li>
                        <a href="#features" onClick={(e) => handleScroll(e, 'features')} className="text-blue-600 dark:text-gray-300 hover:text-blue-800 dark:hover:text-gray-100 transition-colors">Features</a></li>
                </ul>}
                
                <DesktopMenu user={user} handleLogout={handleLogout} navigate={navigate} getDisplayName={getDisplayName} />
            </div>

            
            {isMenuOpen && (
                <MobileMenu user={user} handleLogout={handleLogout} closeMenu={closeMenu} navigate={navigate} getDisplayName={getDisplayName} handleScroll={handleScroll}  />
            )}
        </nav>
    )
}

export default Navbar