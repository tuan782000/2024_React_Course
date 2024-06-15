# Tìm hiểu useReducer

Nếu bạn đã từng làm việc với react hook thì chắc hẳn bạn đã nghe các khái niệm về Reducers, trong react cũng có 1 cái gọi useReducer

useReducer là 1 Hook và nó thường kết hợp với useContext để quản lý các state chia sẻ các state.

Việc 2 này kết hợp để giúp quản lý các dự án vừa và nhỏ mà không cần sử dụng Redux

useReducer có 2 phần

Phần 1: Tính năng của Reducer:

Reducer là 1 function giúp tương tác với các state, chẳng hạn như thay đổi cái state, cập nhật state rồi trả về Provider, giúp cập nhật toàn bộ App.

Phần 2: Action {type: 'ADD_BOOK'}
Hành động: gửi đến state, gủi đến reducer. Ứng với loại hành động nào đó cái Reducer function sẽ cập nhật state

Vế đầu là action, vế sau Reducer

dispatch({type: "ADD_BOOK"}) -> Reducer Function Interacts with the state/data

Tóm lại:

Tưởng tượng bạn đang được ai đó gửi thư tới.

Thư thì phải có tên (giống như tên phân biệt các hành động), nội dung (giống như là chức năng)

gửi thư là dispatch sẽ bắn ra đi đến nhà bạn, người nhận thư đóng vai trò là Reducer phân loại thư đến đúng name - type, xong người nhận thư mở thư ra và thực hiện nhiệm vụ

Ví dụ: gưi thư đến nhà bạn

Bao thư

```js
{type: 'ADD_BOOK', book: {}}
// người nhận là type: 'ADD_BOOK'
// nội dung thư là book: {}
```

dispatch là hành động gửi

```js
dispatch({ type: "ADD_BOOK", book: {} }); // gửi thư đi
```

đến đâu, đến nhà của bạn

```js
// ví dụ nhà tên là reducer
reducer(state, action); //
// check the action.type - tương như kiểm tra tên của thằng nào
// update the state object - dựa vào hành động tiến hành cập nhật state
// return the state - Trả về cái state đó
```

Cuối cùng trả giá trị đó về Provider để cập nhật lại toàn bộ hệ thống.

Giải thích như trong bài:

```js
dispatch({ type: "ADD_BOOK", book: {} });
// phát đi hành động
// Hành động ở đây là ADD_BOOK
// books {} chứa nội dung - nó là 1 book mới (có tilte, author chẳng hạn)
reducer(state, action);
// Thêm vào trong danh sách của mình (phải thông qua kiểm tra action.type, cập nhật state obejct sau đó trả state về)
// Đưa cho provider cập nhật cho app và chia sẽ lại toàn bộ cho component khác
```

Giả sử mình có 1 AgeContext

```js
import {createContext, useState, useReducer} from 'react';

const AgeContext = createContext();

// định nghĩa ageRducer
const ageRducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ONE':
            return state + 1;
        case 'ADD_FIVE':
            return state + 5;
        case 'ADD_NUM'
            return state + action.num;
        default:
            return state;
    }
}

dispatch({type: 'ADD_ONE'});
dispatch({type: 'ADD_FIVE'});
dispatch({type: 'ADD_NUM', num: 7});

const AgeContextProvider = (props) => {
    // const [age, setAge] = useState(20);

    // Thay vì dùng useState tôi sẽ dùng useReducer
    const [age, dispatch] = useReducer(ageRducer, 20);
    // const addOneToAge = () => setAge(age + 1);
    // const addFiveToAge = () => setAge(age + 5);
    // const addNumToAge = () => setAge(age + num);

    return (
        // <AgeContext.Provider
        //     value={{
        //         age,
        //         addOneToAge,
        //         addFiveToAge,
        //         addNumToAge
        //      }}>
        //     {props.children}
        // </AgeContext.Provider>
        <AgeContext.Provider value={{ age, dispatch }}>
            {props.children}
        </AgeContext.Provider>
    )
}
```

Giải thích kỹ hơn:

```js
import {createContext, useState, useReducer} from 'react';
// 1. Tạo context: Tôi đang tạo một Context để chia sẻ giữa các component con.
const AgeContext = createContext();
// 2. Reducer Fuction: Tôi đang khai báo một hàm reducer (ageReducer) để xử lý các hành động (actions) trên trạng thái age. Hành động có thể là "ADD_ONE", "ADD_FIVE" hoặc "ADD_NUM", và reducer sẽ cập nhật trạng thái dựa trên hành động.
const ageRducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ONE':
            return state + 1;
        case 'ADD_FIVE':
            return state + 5;
        case 'ADD_NUM'
            return state + action.num;
        default:
            return state;
    }
}
// 3. Dispatch Actions: Tôi đang gọi dispatch để gửi các hành động đến reducer. Mỗi hành động có một thuộc tính type để xác định loại hành động, và trong trường hợp của "ADD_NUM", bạn cũng truyền theo giá trị num.
dispatch({type: 'ADD_ONE'});
dispatch({type: 'ADD_FIVE'});
dispatch({type: 'ADD_NUM', num: 7});


const AgeContextProvider = (props) => {
    // 4. Use useReducer Hook: Tôi sử dụng hook useReducer để tạo ra age và dispatch. age là trạng thái hiện tại và dispatch là hàm để gửi hành động đến reducer.
    const [age, dispatch] = useReducer(ageRducer, 20);


    return (
        // 5. Context Provider: Tôi bọc toàn bộ ứng dụng trong <AgeContext.Provider> để cung cấp giá trị từ useReducer cho mọi component con trong cây component.
        <AgeContext.Provider value={{ age, dispatch }}>
            {props.children}
        </AgeContext.Provider>
    )
}
```

# Hướng dẫn sử dụng useReducer hook trong project

Không phải lúc nào cũng kết hợp useReducer với useContext tùy dự án và tình huống

Có nhiều state cần phải quản lý mình có thể sử dụng cái kết hợp này hoặc Redux

# Hướng dẫn 1 chút về localstorage

Lưu mọi thứ dưới dạng string, chính vì vậy để lưu 1 object hoặc mảng mình cần phải chuyển sang dạng JSON string

1. Thêm:
   localstorage.setItem("key", "value")
2. Lấy ra:
   localstorage.getItem("key")
3. Xóa đi:
   localstorage.removeItem("key")
4. Xóa hết
   localstorage.clear()

Ví dụ:

```js
var books = [
    { title: "To Kill a Mockingbird", author: "Harper Lee", id: 1 },
    { title: "Don Quixote", author: "Miguel de Cervantes", id: 2 },
    { title: "War and Peace", author: "Leo Tolstoy", id: 3 },
    { title: "Gone with the Wind", author: "Margaret Mitchell", id: 4 },
];

localStorage.setItem("List of Books", JSON.stringify(books));

// Lấy ra xem dưới dạng string
localStorage.getItem("List of Books");

// Lấy ra xem dưới dạng object
const result = localStorage.getItem("List of Books")
console.log(JSON.parse(result));
```
