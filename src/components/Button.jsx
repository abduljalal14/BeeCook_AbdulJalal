function Button({ text, className = "", type = "button" }) {
    return (
        <button
            type={type}
            className={`inline-flex items-center justify-center rounded-md bg-secondary px-7 py-3 font-inter text-sm font-semibold text-tertiary transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-primary/30 ${className}`}
        >
            {text}
        </button>
    )
}

export default Button
