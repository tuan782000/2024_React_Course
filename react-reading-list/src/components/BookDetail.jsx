import { useContext } from "react";
import { BookContext } from "../contexts/BookContext";

const BookDetail = (props) => {
    const { book } = props;
    const { dispatch } = useContext(BookContext);
    return (
        <li onClick={() => dispatch({ type: "REMOVE_BOOK", id: book.id })}>
            <div className="title">{book.title}</div>
            <div className="author">{book.author}</div>
        </li>
    )
}

export default BookDetail