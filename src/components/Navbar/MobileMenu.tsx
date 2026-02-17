import ThemeToggle from "../ThemeToggle.js"

interface MobileMenuProps{
    user: any;
    handleLogout: () => void;
    closeMenu: () => void;
    navigate: (path: string) => void;
    getDisplayName: (email: string|null) => string;
    handleScroll: (e: React.MouseEvent, feature: string) => void;
}

const MobileMenu:React.FC<MobileMenuProps> = ({ user, handleLogout, closeMenu, navigate, getDisplayName, handleScroll }) => {
    return (
       <div className="md:hidden mt-4 pb-4 border-t pt-4">
                    {user ? (
                        <div className="flex flex-col gap-3">
                            <div className="text-gray-600 font-semibold px-4 py-2 bg-gray-50 rounded">
                                Welcome, {getDisplayName(user.email)}
                            </div>
                            <button 
                                onClick={() => {
                                    navigate('/savedsummary')
                                    closeMenu()
                                }}
                                className="text-left text-gray-700 hover:bg-blue-50 px-4 py-2 rounded dark:text-gray-300 font-semibold"
                            >
                                Saved Summaries
                            </button>
                            <button 
                                onClick={() => {
                                    handleLogout()
                                    closeMenu()
                                }}
                                className="text-left text-red-600 hover:bg-red-50 px-4 py-2 rounded font-semibold"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <ul className="flex flex-col gap-3">
                            
                            <li><a href="#how-it-works" onClick={(e) => handleScroll(e, 'how-it-works')} className="text-blue-600 dark:text-gray-300 hover:text-blue-800 dark:hover:text-gray-100 transition-colors">How it works</a></li>
                            <li><a href="#features" onClick={(e) => handleScroll(e, 'features')} className="text-blue-600 dark:text-gray-300 hover:text-blue-800 dark:hover:text-gray-100 transition-colors">Features</a></li>
                        
                            <button 
                                onClick={() => {
                                    navigate('/login')
                                    closeMenu()
                                }}
                                className="text-left text-brand-blue dark:text-dark-brand-blue px-4 py-2 rounded font-semibold"
                            >
                                Login
                            </button>
                            <button 
                                onClick={() => {
                                    navigate('/signup')
                                    closeMenu()
                                }}
                                className="bg-brand-blue dark:bg-dark-brand-blue text-white px-4 py-2 rounded font-semibold"
                            >
                                Sign Up
                            </button>
                        </ul>
                    )}
                    <div className="mt-4 px-4">
                        <ThemeToggle/>
                    </div>
                    
                </div>
    )
}

export default MobileMenu
