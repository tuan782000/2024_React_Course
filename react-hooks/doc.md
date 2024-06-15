# React Context & Hooks

Context API: clean and easy way to share state between components

Context API: Cách clean(tối ưu) và dễ dàng để chia sẻ (state) trạng thái giữa các thành phần

Hooks: Tap into the inner workings of React in functional components

Hooks: Tiếp cận vào bên trong của React trong các thành phần chức năng

Ví dụ:

App <-> giống nhà lầu việt nam

App có nhiều component bên trong và <-> nhà lầu có nhiều tầng

Ví dụ: Muốn bưng 1 chậu cây lên tầng 4, thì chúng ta phải đi qua tầng 1, lên tầng 2 tầng 3 và tới tầng 4

Tương tự: Muốn truyền dữ liệu tới component nằm sâu ở bên trong, phải dùng props. Pass props từ App đi từng tầng (component) đến nơi cần truyền.

Nhược điểm: của nó sẽ rất là rườm rà.

Cải thiện: đó bằng cách sử dụng Context API Nó giúp việc chia sẽ dữ liệu giữa các component với nhau dễ dàng hơn. Mà không cần phải pass cái props qua từng cái components từ đỉnh xuống đáy.

Hook giống như tính năng được thêm vào functional components

Nếu trong React có sự kết hợp Context và Hooks nó sẽ giúp quản lý state hiệu quả hơn. Nó sẽ giống như Redux và có thể thay thế Redux.

## React Hooks

-   Special functions: Các hàm đặc biệt
-   Allows us to do additional things inside functional components. (cho phép thực hiện công việc bổ sung các thành phần chức năng)
    -   Eg: Use State (sử dụng trạng thái)

Hooks:

-   useState(): useState within a functional component - useState trong một thành phần chức năng
-   useEffect(): run code when a component render (or re-render) - chạy mã khi một thành phần kết xuất (hoặc kết xuất lại)
-   useContext(): consume context in a functional component - sử dụng bối cảnh trong một thành phần chức năng

## useState:

useState: nó sẽ nhận vào chuỗi, số, object, array, Array Object. Trả về 2 cái tham số

-   Tham số thứ 1 là State
-   Tham số thứ 2 là setState

Mình sẽ dùng cú pháp destructuring để lấy 2 tham số này ra trong useState

ví dụ:

```js
const [songs, setSongs] = useState([
    { title: "Happy Birthday", id: 1 },
    { title: "7 Years ago", id: 2 },
    { title: "Natural", id: 3 },
]);
```

Cái giá trị truyền vào useState người ta gọi là giá trị ban đầu initalValue, cũng đồng thời là cái tham số thứ 1

Chúng ta không thể thay đổi trực tiếp cái state ban đầu được, mà phải phụ thuộc vào setState (cái hàm setState dùng để thay đổi state). Điểm lưu ý quan trọng của useState Hook

```js
const newSongs = [...songs, { title: "new song", id: uuidv4() }];

// Dùng này cập nhật lại state
setSongs(newSongs);

// cái này gọi là copy ra 1 mảng mới, sau đó thực hiện thêm object vào trong mảng đã được copy. Sau đó gán vào newSongs
```

## Form:

```js
// Đây là hàm có tính năng thêm bài hát (nó phải nhận vào 1 tham số)
const addSong = (title) => {
    const newSongs = [...songs, { title: title, id: uuidv4() }];
    setSongs(newSongs);
};

// Đoạn này truyền props tên là addSong và {addSong} này là hàm sẽ được truyền đi
// Lưu ý tên props và tên hàm có thể trùng nhau hoặc đặt khác vẫn được
<NewSongForm addSong={addSong} />;
```

Sau khi truyền thông qua props thì ta dùng cú pháp destructuring để lấy ra hàm addSong và gán nó vào biến addSong để sau này không cần props.addSong

Ứng dụng đầu tiên là useState dùng để quản lý input nhập title. giá trị ban đầu là title sẽ là chuỗi rỗng. Gán cho nó vào value của ô input

Việc thực hiện gõ vào ô input là mình đang thực hiện sự kiện, dùng onChange để lắng nghe, sự kiện ví nó là e. Mỗi lần nhấn mình sẽ dùng callback để mình truyền e đó đi, log ra nhìn thấy được ở e.target.value sẽ có giá trị mà mình nhập, mình sẽ dùng tính năng setTitle để cập nhật lại state là title. Đồng thời value chứa title cũng được cập nhật.

---

Thực hiện Submit form onSumbit nó sẽ đi lắng nghe form khi submit, khi có submit nó sẽ gọi hàm handleSubmit hàm này nhận vào sự kiện là e, sau đó ngăn chặn form tiến hành reload trang do mặc định. sau đó gọi hàm addSong chứa đối số truyền vào là title. Hàm này được props gửi tới. Sau đó cập nhật lại input title là chuỗi rỗng tạo ra hiệu ứng clear cho form.

```jsx
import { useState } from "react";
const NewSongForm = (props) => {
    const { addSong } = props;
    const [title, setTitle] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault(); // tránh trường hợp submit form reload trang
        addSong(title);
        setTitle("");
    };
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="songName">Song name:</label>
            <input
                type="text"
                required
                id="songName"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <button>Add Song</button>
        </form>
    );
};

export default NewSongForm;
```

## useEffect:

```js
// Loại 1:
useEffect(() => {
    // code run... (chỉ run khi component render hoặc re-render)
    // render: Xảy ra khi lần đầu tiên access "truy cập" vào component
    // re-render: Xảy ra khi 1 cái state bất kỳ thay đổi thì component nó sẽ render
    console.log("useEffect Hook ran", songs);
});

// Loại 2:
useEffect(() => {
    // code run... (chỉ run khi component render hoặc re-render)
    // render: Xảy ra khi lần đầu tiên access "truy cập" vào component
    // dependencies: [] -> chỉ chạy 1 lần duy nhất rồi thôi, không có re-render
    console.log("useEffect Hook ran", songs);
}, []);

// Loại 3:
useEffect(() => {
    // code run... (chỉ run khi component render hoặc re-render)
    // render: Xảy ra khi lần đầu tiên access "truy cập" vào component
    // re-render: Xảy ra khi cái state songs bọc trong dependencies thay đổi thì component nó sẽ re-render
    // dependencies: [songs]
    console.log("useEffect Hook ran", songs);
}, [songs]);
```

## Context API:

Share state within a component tree

Chia sẻ trạng thái trong một cây thành phần.

ContextAPI: mục đích nó ra đời giúp mình chia sẽ các state cho các compoenent

Ví dụ: App của mình nó cực kỳ lớn, nó có nhiều component lồng nhau. Lúc này việc dùng props pass các dữ liệu, chia sẽ các state vô cùng rườm rà và phức tạp.
