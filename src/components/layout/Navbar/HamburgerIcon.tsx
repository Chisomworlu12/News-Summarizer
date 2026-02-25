
interface HamburgerIconProps{
    isOpen: boolean;
    toggleMenu: () => void;
}
const HamburgerIcon:React.FC<HamburgerIconProps> = ({ isOpen, toggleMenu }) => {
    return (
        <button 
                    onClick={toggleMenu}
                    className="md:hidden text-gray-700 focus:outline-none"
                >
                    
                        {isOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg"  className="w-6 h-6 dark:text-white" viewBox="0 0 512 512"><path fill="currentColor" fillRule="evenodd" d="M420.48 121.813L390.187 91.52L256 225.92L121.813 91.52L91.52 121.813L225.92 256L91.52 390.187l30.293 30.293L256 286.08l134.187 134.4l30.293-30.293L286.08 256z"/></svg>
                           
                        ) : (
                           <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 dark:text-white" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 17h18M3 12h18M3 7h18"/></svg>
                           
                        )}
                    
                </button>
    )
}

export default HamburgerIcon
