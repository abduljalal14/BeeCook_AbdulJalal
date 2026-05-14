import { NavLink } from "react-router-dom";
import Logo from "../components/Logo";

function Header() {
    return (
        <header>
            <div className="flex justify-between items-center h-30 w-full px-12 py-5">
                <Logo />
                <nav className="flex gap-x-10 text-secondary font-inter font-semibold text-2xl">
                    <NavLink to="/" className={({ isActive }) => isActive ? "text-primary" : ""}>Beranda</NavLink>
                    <NavLink to="/resep" className={({ isActive }) => isActive ? "text-primary" : ""}>Resep</NavLink>
                    <NavLink to="/kelola" className={({ isActive }) => isActive ? "text-primary" : ""}>Kelola</NavLink>
                </nav>
            </div>
        </header>
    )
}

export default Header