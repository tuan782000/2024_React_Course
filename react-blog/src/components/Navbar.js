import { Link } from "react-router-dom";
const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>React Blog</h1>
            <div className="links">
                <Link to="/">Home</Link>
                <Link
                    to="/create"
                    style={{
                        color: "white",
                        backgroundColor: "#087EA4",
                        borderRadius: "8px"
                    }}
                >
                    New Blog
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;