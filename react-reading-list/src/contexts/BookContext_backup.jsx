import { createContext, useState } from "react"
import { v4 as uuidv4 } from 'uuid';

export const BookContext = createContext();

const BookContextProvider = (props) => {
    const [books, setBooks] = useState([
        { title: "To Kill a Mockingbird", author: "Harper Lee", id: 1 },
        { title: "Don Quixote", author: "Miguel de Cervantes", id: 2 },
        { title: "War and Peace", author: "Leo Tolstoy", id: 3 },
        { title: "Gone with the Wind", author: "Margaret Mitchell", id: 4 }
    ]);

    const addBook = (title, author) => {
        setBooks([...books, { title: title, author: author, id: uuidv4() }])
    }

    // const addBook = (title, author) => {
    //     setBooks((prevBooks) => [
    //         ...prevBooks,
    //         { title, author, id: uuidv4() }
    //     ]);
    // }

    const removeBook = (id) => {
        // const deleteBoook = books.filter((book) => book.id !== id)
        // setBooks(deleteBoook)

        // Viết gọn hơn
        setBooks(books.filter(book => book.id !== id))
    }

    return (
        // nếu có 1 phần tử thì value = {book}, nhưng do nhiều nên phải để trong 1 object
        <BookContext.Provider value={{ books, addBook, removeBook }}>
            {props.children}
        </BookContext.Provider>
    )
}

export default BookContextProvider