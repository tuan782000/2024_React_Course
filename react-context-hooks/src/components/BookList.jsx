import { useContext } from "react"
import { ThemeContext } from "../App";
import { BookContext } from "../contexts/BookContext";

const BookList = () => {
    const { theme: newTheme } = useContext(ThemeContext);
    const { books } = useContext(BookContext);
    const { isLightTheme, light, dark } = newTheme
    const theme = isLightTheme ? light : dark;
    return (
        <div className="book-list" style={{ backgroundColor: theme.bg, color: theme.syntax }}>
            <ul>
                {books.map((book) => (
                    <li style={{ backgroundColor: theme.ui }} key={book.id}>{book.title}</li>
                ))}
            </ul>
        </div>
    )
}

export default BookList