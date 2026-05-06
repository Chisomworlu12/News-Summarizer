interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  className,
  type = 'button',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`relative inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-white text-sm
        bg-linear-to-r from-brand-purple via-brand-indigo to-brand-blue
        shadow-lg shadow-brand-purple/30
        hover:from-brand-purple-light hover:via-brand-indigo hover:to-brand-blue-light
        hover:-translate-y-0.5 hover:shadow-brand-purple/50 hover:shadow-xl
        active:translate-y-0 active:shadow-md
        transition-all duration-300 whitespace-nowrap
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0
        ${className ?? ''}`}
    >
      {children}
    </button>
  )
}

export default Button
