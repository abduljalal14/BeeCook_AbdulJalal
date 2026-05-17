import { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../components/Logo";

function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const navLinkClass = ({ isActive }) => 
        isActive ? "text-primary" : "transition hover:text-primary";

    const navItems = [
        { to: "/", label: "Beranda" },
        { to: "/list", label: "Resep" },
        { to: "/kelola", label: "Kelola" },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 bg-white z-50">
            <div className="page-container flex min-h-20 items-center justify-between gap-5 py-5">
                <Logo />
                
                <nav className="hidden md:flex items-center gap-x-8 text-sm font-semibold text-secondary sm:text-base">
                    {navItems.map((item) => (
                        <NavLink key={item.to} to={item.to} className={navLinkClass}>
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <button
                    onClick={toggleMenu}
                    className="md:hidden flex flex-col gap-1.5 p-2"
                    aria-label="Toggle menu"
                >
                    <span className={`block w-6 h-0.5 bg-secondary transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-secondary transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-secondary transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </button>

                {/* Mobile Dropdown Menu */}
                {isOpen && (
                    <nav className="absolute top-20 left-0 right-0 md:hidden bg-white shadow-md border-t border-gray-200 py-4 px-6 z-50">
                        <div className="flex flex-col gap-4 text-sm font-semibold text-secondary">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    className={navLinkClass}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.label}
                                </NavLink>
                            ))}
                        </div>
                    </nav>
                )}
            </div>
        </header>
    );
}

export default Header
