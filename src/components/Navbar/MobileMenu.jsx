import ThemeToggle from "../ThemeToggle"

function MobileMenu({ user, handleLogout, closeMenu, navigate, getDisplayName }) {
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
                        <div className="flex flex-col gap-3">
                            <button 
                                onClick={() => {
                                    navigate('/login')
                                    closeMenu()
                                }}
                                className="text-left text-blue-600 hover:bg-blue-50 px-4 py-2 rounded font-semibold"
                            >
                                Login
                            </button>
                            <button 
                                onClick={() => {
                                    navigate('/signup')
                                    closeMenu()
                                }}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-semibold"
                            >
                                Sign Up
                            </button>
                        </div>
                    )}
                    <div className="mt-4 px-4">
                        <ThemeToggle/>
                    </div>
                    
                </div>
    )
}

export default MobileMenu
