import { useContext } from "react"
import { ThemeContext, AuthContext } from "../App"

const Navbar = () => {
    // useContext(ThemeContext);
    // console.log(useContext(ThemeContext))
    // Mình biết nó là object mình sẽ tiến hành destructuring

    const { theme: newTheme } = useContext(ThemeContext); // không quan trọng thứ tự
    const { isAuthenticated, toggleAuth } = useContext(AuthContext);
    const { isLightTheme, light, dark } = newTheme
    const theme = isLightTheme ? light : dark;
    return (
        <nav style={{ backgroundColor: theme.ui, color: theme.syntax }}>
            <h1>Context App</h1>
            <div onClick={toggleAuth}>{isAuthenticated ? "Logged in" : "Logged out"}</div>
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
        </nav>
    )
}

export default Navbar