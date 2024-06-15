/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useState } from "react"

export const BookContext = createContext()
const BookContextProvider = (props) => {
    const [books, setBooks] = useState([
        { title: 'To kill a Mockingbird', id: '1' },
        { title: 'Don Quixote', id: '2' },
        { title: 'War and Peace', id: '3' },
        { title: 'Gone with the Wind', id: '4' },
        { title: 'Gone with the Wind 2', id: '5' }
    ])
    return (
        <BookContext.Provider value={{ books }}>
            {props.children}
        </BookContext.Provider>
    )
}

export default BookContextProvider