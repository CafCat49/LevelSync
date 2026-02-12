import Link from "react-router-dom/Link";

export default function Navbar()
{
    return (
        <nav>
            <Link to="pages/Home">Home</Link>
            <Link to="pages/Dashboard">Dashboard</Link>
            <Link to="pages/Profile">Profile</Link>
        </nav>
    );
}