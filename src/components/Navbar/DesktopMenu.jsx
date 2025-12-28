function DesktopMenu({ user, handleLogout, navigate, getDisplayName }) {
    return (
        <div className="hidden md:flex gap-4 items-center">
                    {user ? (
                        <>
                            <button 
                                onClick={() => navigate('/savedsummary')}
                                className="text-gray-700 hover:text-blue-600 font-semibold"
                            >
                                Saved Summaries
                            </button>
                            <span className="text-gray-600 font-semibold">
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
                                className="text-blue-600 hover:text-blue-700 font-semibold"
                            >
                                Login
                            </button>
                            <button 
                                onClick={() => navigate('/signup')}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-semibold"
                            >
                                Sign Up
                            </button>
                        </>
                    )}
                </div>
        
    )
}

export default DesktopMenu
