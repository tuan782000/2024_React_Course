import { useContext } from "react"
import { BookContext } from "../contexts/BookContext"

const Navabar = () => {
    const { books } = useContext(BookContext)
    return (
        <div className="navbar">
            <h1>My Reading List</h1>
            <p>Current you have {books.length} books to get through...</p>
        </div>
    )
}

export default Navabar