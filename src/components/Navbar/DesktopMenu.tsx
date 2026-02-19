import ThemeToggle from "../ThemeToggle.js"

interface DesktopMenuProps{
    user: any;
    handleLogout: () => void;
    navigate: (path: string) => void;
    getDisplayName: (email: string|null) => string;
}

const DesktopMenu:React.FC<DesktopMenuProps>=({ user, handleLogout, navigate, getDisplayName })=> {
    return (
        <div className="hidden md:flex gap-4 items-center">
                    {user ? (
                        <>
                            <button 
                                onClick={() => navigate('/savedsummary')}
                                className="text-gray-700 hover:text-brand-blue dark:text-gray-300 font-semibold"
                            >
                                Saved Summaries
                            </button>
                            <span className="text-gray-600 font-semibold dark:text-gray-300">
                                {getDisplayName(user.email)}
                            </span>
                            <button 
                                onClick={handleLogout}
                                className="text-red-600 hover:text-red-700 font-semibold"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                        
                            <button 
                                onClick={() => navigate('/login')}
                                className="text-brand-blue dark:text-dark-brand-blue hover:text-brand-blue-light dark:hover:text-shadow-dark-brand-blue-light font-semibold hover:scale-105 transition duration-300 cursor-pointer"
                            >
                                Login
                            </button>
                            <button 
                                onClick={() => navigate('/signup')}
                                className="bg-brand-blue dark:bg-dark-brand-blue text-white px-4 py-2 rounded hover:bg-brand-blue-light dark:hover:bg-dark-brand-blue-light font-semibold transition duration-300 cursor-pointer"
                            >
                                Sign Up
                            </button>
                        </>
                    )}
                    <ThemeToggle/>
                </div>
        
    )
}

export default DesktopMenu
