import { useContext } from "react"
import { ThemeContext } from "../App"

const ToggleTheme = () => {

    // console.log(useContext(ThemeContext))
    const { toggleTheme } = useContext(ThemeContext);
    return (
        <button onClick={toggleTheme}> Toggle Theme</ button>
    )
}

export default ToggleTheme