interface ButtonProps{
    children: React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
    className?: string;
  
}

const Button:React.FC<ButtonProps>=({children, onClick, disabled = false, className})=> {
    return (
        <button  onClick={onClick} disabled={disabled}  className={`bg-linear-to-r from-blue-600 to-blue-400 dark:from-blue-700 dark:to-blue-500 text-white px-4 sm:px-6 py-2 rounded hover:from-blue-700 hover:to-blue-500 transition-all whitespace-nowrap ${className || ''}`}
                    >
                    {children}
                    </button>
    )
}

export default Button
