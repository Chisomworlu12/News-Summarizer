import { useState } from "react"
import { useNavigate } from "react-router-dom"
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import HamburgerIcon from "./HamburgerIcon";

export default function Navbar({user, handleLogout}) {
    const navigate = useNavigate()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const getDisplayName = (email) => {
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
        <nav className="bg-white shadow-md p-4">
            <div className="max-w-6xl mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold text-blue-600">News Summarizer</h1>
                
                <HamburgerIcon isOpen={isMenuOpen} toggleMenu={toggleMenu} />

                
                <DesktopMenu user={user} handleLogout={handleLogout} navigate={navigate} getDisplayName={getDisplayName} />
            </div>

            
            {isMenuOpen && (
                <MobileMenu user={user} handleLogout={handleLogout} closeMenu={closeMenu} navigate={navigate} getDisplayName={getDisplayName} />
            )}
        </nav>
    )
}