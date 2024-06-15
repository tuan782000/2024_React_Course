import { v4 as uuidv4 } from 'uuid';

const bookReducer = (state, action) => {
    // chú ý state tương ứng với books, nếu này áp dụng cho cái khác chẳng students state cũng là students
    switch (action.type) {
        case "ADD_BOOK":
            return [...state, { title: action.book.title, author: action.book.author, id: uuidv4() }];
        case "REMOVE_BOOK":
            return state.filter(book => book.id !== action.id);
        default:
            return state;
    }
};

export default bookReducer