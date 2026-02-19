interface ButtonProps{
    children: React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
    className?: string;
  
}
// bg-brand-blue   hover:scale-110

const Button:React.FC<ButtonProps>=({children, onClick, disabled = false, className  })=> {
   
    return (
        <button  onClick={onClick} disabled={disabled}  className={`bg-linear-to-r from-brand-blue to-dark-brand-blue dark:from-dark-brand-blue dark:to-brand-blue text-white px-4 py-4 sm:px-6 sm:py-2 rounded-2xl shadow-lg shadow-brand-blue/20 hover:from-dark-brand-blue hover:to-brand-blue transition duration-500 whitespace-nowrap ${className || ''}`}
                    >
                    {children}
                    </button>
    )
}

export default Button
