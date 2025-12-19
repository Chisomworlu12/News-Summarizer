function Button({children, onClick}) {
    return (
        <button  onClick={onClick} className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-4 sm:px-6 py-2 rounded hover:from-blue-700 hover:to-blue-500 transition-all whitespace-nowrap"
                    >
                    {children}
                    </button>
    )
}

export default Button
