import { useState } from "react"
import { useNavigate } from "react-router-dom"
import DesktopMenu from "./DesktopMenu.js";
import MobileMenu from "./MobileMenu.js";
import HamburgerIcon from "./HamburgerIcon.js";
import Search from "../Search.js";

const Navbar: React.FC<{ user: any; handleLogout: () => void }> = ({ user, handleLogout }) => {
    const navigate = useNavigate()
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

    return(
        <nav className="bg-white dark:bg-gray-800 shadow-md p-4">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold text-blue-600 dark:text-gray-300 hidden md:block">News Summarizer</h1>
                <h1 className="text-2xl font-bold text-blue-600 dark:text-white md:hidden">NS</h1>
                <Search/>
                <HamburgerIcon isOpen={isMenuOpen} toggleMenu={toggleMenu} />

                
                <DesktopMenu user={user} handleLogout={handleLogout} navigate={navigate} getDisplayName={getDisplayName} />
            </div>

            
            {isMenuOpen && (
                <MobileMenu user={user} handleLogout={handleLogout} closeMenu={closeMenu} navigate={navigate} getDisplayName={getDisplayName} />
            )}
        </nav>
    )
}

export default Navbar