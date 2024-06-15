import { useState, createContext } from "react"
import BookList from "./components/BookList"
import Navbar from "./components/Navbar"
import ToggleTheme from "./components/ToggleTheme";
import BookContextProvider from "./contexts/BookContext";

export const ThemeContext = createContext();
export const AuthContext = createContext();

const App = () => {
  const [theme, setTheme] = useState(
    {
      isLightTheme: true,
      light: { syntax: '#555', ui: '#ddd', bg: '#eee' },
      dark: { syntax: '#ddd', ui: '#333', bg: '#555' }
    }
  )

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const toggleTheme = () => {
    setTheme({ ...theme, isLightTheme: !theme.isLightTheme })
  }

  const toggleAuth = () => {
    setIsAuthenticated((prev) => !prev)
  }


  return (
    <div className="App">
      {/* <button onClick={() => toggleTheme(theme)}>Change Theme</button> */}
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <AuthContext.Provider value={{ isAuthenticated, toggleAuth }}>
          <Navbar />
        </AuthContext.Provider>
        <BookContextProvider>
          <BookList />
        </BookContextProvider>
        <ToggleTheme />
      </ThemeContext.Provider>
    </div>
  )
}

export default App