import { NavLink } from "react-router-dom";

function Header() {
    return (
        <header>
            <div>
                <nav>
                    <NavLink to="/">Beranda</NavLink>
                    <NavLink to="/resep">Resep</NavLink>
                    <NavLink to="/kelola">Kelola</NavLink>
                </nav>
            </div>
        </header>
    )
}

export default Header