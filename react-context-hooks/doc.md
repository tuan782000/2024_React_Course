## Context API:

Share state within a component tree

Chia sẻ trạng thái trong một cây thành phần.

ContextAPI: mục đích nó ra đời giúp mình chia sẽ các state cho các compoenent

Ví dụ: App của mình nó cực kỳ lớn, nó có nhiều component lồng nhau. Lúc này việc dùng props pass các dữ liệu, chia sẽ các state vô cùng rườm rà và phức tạp.

Ví dụ:

```js
import { useState, createContext } from 'react' // đây là cách import vào dự án

export const ThemeContext = createContext(); // tạo createContext và gán nó vào ThemeContext


const [theme, setTheme] = useState(
    {
      isLightTheme: true,
      light: { syntax: '#555', ui: '#ddd', bg: '#eee' },
      dark: { syntax: '#ddd', ui: '#333', bg: '#555' }
    }
)

<div className="App">
    <ThemeContext.Provider value={theme}>
       <Navbar />
        <BookList />
    </ThemeContext.Provider>
</div>
```

Bây giờ muốn cho theme vào Navbar và BookList thì thay vì truyền bằng props. Ta sẽ dung Context

Lấy biến ThemeContext.Provider bọc 2 components, cái mình muốn truyền sẽ là properties => value = {giá trị được truyền vào đây, những state mà mình muốn chia sẻ}

cái theme nằm trong App component và sau khi chia sẻ thông qua Context Provider thì giờ theme đã chia sẽ cho Navbar và BookList. Chính thức Navbar và BookList có thể sử dụng được theme

Mẹo: nếu chỉ chia sẻ chỉ mỗi theme thì value={theme}. Nhưng nếu muốn chia sẻ nhiều hơn thì mình phải đặt nó trong 1 object

Ví dụ:

value={{ theme, blogs }}

Để cho Navbar và BookList sử dụng được thì phải qua các bước sau:

-   BookList

```jsx
import { useContext } from "react";
import { ThemeContext } from "../App";

const BookList = () => {
    const { isLightTheme, light, dark } = useContext(ThemeContext);
    const theme = isLightTheme ? light : dark;
    return (
        <div
            className="book-list"
            style={{ backgroundColor: theme.bg, color: theme.syntax }}
        >
            <ul>
                <li style={{ backgroundColor: theme.ui }}>
                    To kill a Mockingbird
                </li>
                <li style={{ backgroundColor: theme.ui }}>Don Quixote</li>
                <li style={{ backgroundColor: theme.ui }}>War and Peace</li>
                <li style={{ backgroundColor: theme.ui }}>
                    Gone with the Wind
                </li>
            </ul>
        </div>
    );
};

export default BookList;
```

Navbar

```jsx
import { useContext } from "react";
import { ThemeContext } from "../App";

const Navbar = () => {
    // useContext(ThemeContext); sử dụng ThemeContext thông qua useContext
    // console.log(useContext(ThemeContext))
    // Mình biết nó là object mình sẽ tiến hành destructuring

    const { isLightTheme, light, dark } = useContext(ThemeContext); // không quan trọng thứ tự, và nó là object dùng destructuring để lấy ra từng cái isLightTheme, light, dark gán lại vào biến isLightTheme, light, dark  để sử dụng
    const theme = isLightTheme ? light : dark;
    return (
        <nav style={{ backgroundColor: theme.ui, color: theme.syntax }}>
            <h1>Context App</h1>
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
        </nav>
    );
};

export default Navbar;
```

---

App.jsx

```jsx
import { useState, createContext } from "react";
import BookList from "./components/BookList";
import Navbar from "./components/Navbar";
import ToggleTheme from "./components/ToggleTheme";

export const ThemeContext = createContext();

const App = () => {
    const [theme, setTheme] = useState({
        isLightTheme: true,
        light: { syntax: "#555", ui: "#ddd", bg: "#eee" },
        dark: { syntax: "#ddd", ui: "#333", bg: "#555" },
    });

    const toggleTheme = () => {
        setTheme({ ...theme, isLightTheme: !theme.isLightTheme });
    };
    return (
        <div className="App">
            {/* <button onClick={() => toggleTheme(theme)}>Change Theme</button> */}
            <ThemeContext.Provider value={theme}>
                <Navbar />
                <BookList />
                <ToggleTheme toggleTheme={toggleTheme} />
            </ThemeContext.Provider>
        </div>
    );
};

export default App;
```

ToggleTheme.jsx

```jsx
import { useContext } from "react";
import { ThemeContext } from "../App";

const ToggleTheme = ({ toggleTheme }) => {
    // console.log(useContext(ThemeContext))
    const theme = useContext(ThemeContext);
    return <button onClick={() => toggleTheme(theme)}> Toggle Theme</button>;
};

export default ToggleTheme;
```

---

### Tổng hợp Lại

Sử dụng useState và contextAPI, sử dụng 3 component BookList, Navbar, ToggleTheme

ThemeContext là biến được gán tính năng createContext và export để có thể cho các component khác truy cập

ứng dụng useState để quản lý state: theme và setTheme và giá trị ban đầu của nó trong phần này là 1 object

Hàm toggleTheme chức năng giúp cập nhật theme thông qua setTheme. (trong này có sử dụng spreadOperator để copy nông các giá trị của theme), tham số thứ 2 là giúp cập nhật lại isLightTheme từ việc copy nông

Như đã biết sử dụng Context thì phải bọc toàn bộ các component dưới sự quản lý của nó, ở đây nó bọc Navbar, BookList, toggleTheme

Các giái trị được chia sẽ và truyền tới component thông qua value={{ theme, toggleTheme }}, cụ thể ở đây đang chia sẻ 2 cái theme và toggleTheme. Các component dưới quản lý có quyền nhận hoặc không nhận

App

```jsx
import { useState, createContext } from "react";
import BookList from "./components/BookList";
import Navbar from "./components/Navbar";
import ToggleTheme from "./components/ToggleTheme";

export const ThemeContext = createContext();

const App = () => {
    const [theme, setTheme] = useState({
        isLightTheme: true,
        light: { syntax: "#555", ui: "#ddd", bg: "#eee" },
        dark: { syntax: "#ddd", ui: "#333", bg: "#555" },
    });

    const toggleTheme = () => {
        setTheme({ ...theme, isLightTheme: !theme.isLightTheme });
    };

    return (
        <div className="App">
            {/* <button onClick={() => toggleTheme(theme)}>Change Theme</button> */}
            <ThemeContext.Provider value={{ theme, toggleTheme }}>
                <Navbar />
                <BookList />
                <ToggleTheme />
            </ThemeContext.Provider>
        </div>
    );
};

export default App;
```

ToogleTheme

Thằng này nhận cả 2 vừa theme và toggleTheme, dùng cú pháp destructuring để lấy ra từ useContext(ThemeContext)

```jsx
import { useContext } from "react";
import { ThemeContext } from "../App";

const ToggleTheme = () => {
    // console.log(useContext(ThemeContext))
    const { theme, toggleTheme } = useContext(ThemeContext);
    return <button onClick={() => toggleTheme(theme)}> Toggle Theme</button>;
};

export default ToggleTheme;
```

BookList

Chỉ nhận theme mà không nhận toggleTheme từ việc chia sẽ, cho nên ta thấy được

const { theme: newTheme } = useContext(ThemeContext);

Lý do tại sao có newTheme vì theme vô tình trùng với cái biến đang đặt ở dưới, cho nên ta dùng cú pháp này để đổi tên hoặc có thể thay tên biến khác. Sau đó dựa vào những gì đã lấy được bằng cú pháp destructuring với useContext(ThemeContext);

Thì ta đã có newTheme với đầy đủ các giá trị. ở đây tiếp tục sử dụng cú pháp destructuring const { isLightTheme, light, dark } = newTheme để lấy ra các giá trị isLightTheme, light, dark và gán thành các biến để cho dễ sử dụng

```jsx
import { useContext } from "react";
import { ThemeContext } from "../App";

const BookList = () => {
    const { theme: newTheme } = useContext(ThemeContext);
    const { isLightTheme, light, dark } = newTheme;
    const theme = isLightTheme ? light : dark;
    return (
        <div
            className="book-list"
            style={{ backgroundColor: theme.bg, color: theme.syntax }}
        >
            <ul>
                <li style={{ backgroundColor: theme.ui }}>
                    To kill a Mockingbird
                </li>
                <li style={{ backgroundColor: theme.ui }}>Don Quixote</li>
                <li style={{ backgroundColor: theme.ui }}>War and Peace</li>
                <li style={{ backgroundColor: theme.ui }}>
                    Gone with the Wind
                </li>
            </ul>
        </div>
    );
};

export default BookList;
```

Làm tương tự Navbar

## multiple contexts trong React.

Hôm nay mình sẽ làm cái đăng nhập giả dựa trên React Context

Tạo ra 1 AuthContext dựa trên createContext

```js
export const AuthContext = createContext();
```

Để mà mình dùng được thì bọc nó lại bằng Provider

```js
const [isAutheticated, setIsAutheticated] = useState(false);

const toggleAuthen = () => {
    setIsAutheticated((prevState) => !prevState);
};

<AuthContext.Provider value={{ isAuthenticated, toggleAuthen }}>
    <Navbar />
</AuthContext.Provider>;
```

Navbar

```js
import { ThemeContext, AuthContext } from "../App";

const { isAutheticated, toggleAuthen } = useContext(AuthContext);

// ...

<div onClick={toggleAuthen}>{isAutheticated ? "Login" : "Logout"}</div>;
```

Giải thích: 

Để làm tính năng giả như này sử dụng createContext từ thư viện và gán vào AuthContext lúc này sẽ là Context và phải export để cho các component khác có thể truy cập

tạo State để quản lý trạng thái Login hoặc Logout

Để mà dùng thì sẽ bọc các Component mà liên quan và cần chia sẻ dữ liệu sẽ truyền props (state) thông value={}

Bên component sẽ nhận được và bằng cách sử useContext, tận dụng lúc đó destructuring để lấy các state được chia sẻ, sau đó dùng như bình thường


## Tạo Context Component

Tôi tạo BookContext.jsx

```js
import { createContext, useState } from "react" // nhập createContext, useState

export const BookContext = createContext() // sử dụng createContext, sau đó export để các file khác có thể truy cập


const BookContextProvider = (props) => {
    const [books, setBooks] = useState([
        { title: 'To kill a Mockingbird', id: '1' },
        { title: 'Don Quixote', id: '2' },
        { title: 'War and Peace', id: '3' },
        { title: 'Gone with the Wind', id: '4' }
    ])
    return (
        <BookContext.Provider value={{ books }}> // Mục đích chia sẻ state books cho các con của nó là props.children
            {props.children}
        </BookContext.Provider>
    )
}

export default BookContextProvider

```
BookContext.Provider đang thực hiện chia sẽ dữ liệu object books và những thằng con nó có thể sử dụng

props.children được sử dụng để hiển thị các thành phần con nằm bên trong BookContext.Provider.

App.jsx
```js
...
   
   <BookContextProvider>
    <BookList /> // này là children nè.
   </BookContextProvider>
...
```



```jsx
import { useContext } from "react"
import { ThemeContext } from "../App";
import { BookContext } from "../contexts/BookContext";

const BookList = () => {
    const { theme: newTheme } = useContext(ThemeContext);
    const { books } = useContext(BookContext); //con nhận props truyền từ BookContextProvider, và đang sử dụng ở đây, destructuring ra để lấy các books ra
    const { isLightTheme, light, dark } = newTheme
    const theme = isLightTheme ? light : dark;
    return (
        <div className="book-list" style={{ backgroundColor: theme.bg, color: theme.syntax }}>
            <ul>
                {/* sau đó dùng map cho chạy qua mảng books. lặp ra các book và mỗi book sẽ lặp ra bằng các li */}
                {books.map((book) => (
                    <li style={{ backgroundColor: theme.ui }} key={book.id}>{book.title}</li>
                ))}
            </ul>
        </div>
    )
}

export default BookList
```

