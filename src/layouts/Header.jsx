import { NavLink } from "react-router-dom";
import Logo from "../components/Logo";

function Header() {
    return (
        <header className="bg-white">
            <div className="page-container flex min-h-20 flex-wrap items-center justify-between gap-5 py-5">
                <Logo />
                <nav className="flex items-center gap-x-8 text-sm font-semibold text-secondary sm:text-base">
                    <NavLink to="/" className={({ isActive }) => isActive ? "text-primary" : "transition hover:text-primary"}>Beranda</NavLink>
                    <NavLink to="/resep" className={({ isActive }) => isActive ? "text-primary" : "transition hover:text-primary"}>Resep</NavLink>
                    <NavLink to="/kelola" className={({ isActive }) => isActive ? "text-primary" : "transition hover:text-primary"}>Kelola</NavLink>
                </nav>
            </div>
        </header>
    )
}

export default Header
