import { NavLink } from "react-router-dom";
import logo from "../assets/logo/logo-beecook-color.png";

function Logo() {
    return (
        <NavLink to="/" className="flex items-center gap-2">
            <img className="h-12" src={logo} alt="Logo" />
        </NavLink>
    )
}

export default Logo