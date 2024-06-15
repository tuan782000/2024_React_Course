import { createContext, useEffect, useReducer } from "react"
import bookReducer from "../reducers/bookReducer";

export const BookContext = createContext();

const BookContextProvider = (props) => {
    // Tham số thứ 3 là 1 anonymus function, dùng để lấy dữ liệu từ trong localStorage ra
    const [books, dispatch] = useReducer(bookReducer, [], () => {
        const localData = localStorage.getItem("books"); // Lấy dữ liệu từ local ra lưu vào biến localData
        return localData ? JSON.parse(localData) : []; // Nếu có dữ liệu từ localData thì trả về kết quả, còn không có trả về mảng rỗng
    });

    // khi state books thay đổi thì useEffect sẽ chạy hoặc lần đầu render useEffect cũng chạy
    useEffect(() => {
        localStorage.setItem('books', JSON.stringify(books))
    }, [books])

    return (
        // nếu có 1 phần tử thì value = {book}, nhưng do nhiều nên phải để trong 1 object
        <BookContext.Provider value={{ books, dispatch }}>
            {props.children}
        </BookContext.Provider>
    )
}

export default BookContextProvider