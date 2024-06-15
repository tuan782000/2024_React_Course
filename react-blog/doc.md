Tạo JSON Server:

Tạo thư mục data, thêm file db.json, thêm data.

Sau đó chạy lệnh

npx json-server --watch data/db.json --port 8000

EndPoints:

/blogs GET Fetch all blogs
/blogs/${id} GET Fetch a single blog
/blogs POST Add a new blog
/blogs/${id} DELETE Delete a blog

---

sử dụng "conditional rendering" (rendering có điều kiện)

Học cách loading dữ liệu

-   Khi mà useEffect chạy callbacks bên trong được gọi
-   gọi hàm fetch đến api để lấy dữ liệu
-   Sau đó có kết quả trả về, kiểm tra có lỗi không, nếu res.ok ko có lỗi return res.json (kết quả trả về dưới dạng Json). Ngược lại có res.ok là false thì vào lỗi. lặp tức ném ra lỗi, catch chủ động bắt lỗi này
-   Trong trường hợp có data tiếp tục đi cập nhật state của Blogs thông qua setBlogs, chuyển trạng thái loading từ true sang false, chuyển trạng thái setError là null
-   Nhiệm vụ "catch" là canh các bước "then" xử lý ở trên có lỗi thì bắt lỗi. Nếu bắt được lỗi, lặp tức kích hoạt setError để đặt ra trạng thái lỗi. và tắt cập nhật lại loading tắt nó đi

Cách hiển thị trên UI "conditional rendering" (rendering có điều kiện) ở đây dùng toán tử && phải thỏa mãn cả 2 vế hiển thị ra, còn không thì không hiện gì cả.

```js
import { useEffect, useState } from "react";
import BlogList from "./BlogList";

const Home = () => {
    const [blogs, setBlogs] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    // tạo custom hooks

    useEffect(() => {
        fetch("http://localhost:8000/blogs")
            .then((res) => {
                console.log(res);
                if (!res.ok) {
                    throw new Error("Could not fetch data for that resource");
                }
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setBlogs(data);
                setIsPending(false);
                setError(null);
            })
            .catch((err) => {
                // console.log(err.message)
                setError(err.message);
                setIsPending(false);
            });
    }, []);

    return (
        <div className="home">
            {error && <div>{error}</div>}
            {isPending === true && <div>Loading...</div>}
            {blogs && <BlogList blogs={blogs} heading={"All Blogs"} />}
        </div>
    );
};

export default Home;
```

---

Tự tạo customHook

Tạo ra 1 customHook là useFetch, nhiệm vụ chính là lấy dữ liệu từ API cho nhiều component khác nhau.

data này được ví có thể đại diện cho nhiều loại dữ liệu khác nhau được lấy từ API

```js
// Đây là 1 customHook
import { useEffect, useState } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    // tạo custom hooks

    useEffect(() => {
        fetch(url)
            .then((res) => {
                console.log(res);
                if (!res.ok) {
                    throw new Error("Could not fetch data for that resource");
                }
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setData(data);
                setIsPending(false);
                setError(null);
            })
            .catch((err) => {
                // console.log(err.message)
                setError(err.message);
                setIsPending(false);
            });
    }, [url]); // theo dõi url nếu có thay đổi useEffect sẽ chạy
    return {
        data,
        isPending,
        error,
    };
};

export default useFetch;
```

Sử dụng Custom Hook đó

```js
import BlogList from "./BlogList";
import useFetch from "../useFetch";

const Home = () => {
    const {
        data: blogs,
        isPending,
        error,
    } = useFetch("http://localhost:8000/blogs");

    return (
        <div className="home">
            {error && <div>{error}</div>}
            {isPending === true && <div>Loading...</div>}
            {blogs && <BlogList blogs={blogs} heading={"All Blogs"} />}
        </div>
    );
};

export default Home;
```

đoạn const { data: blogs, isPending, error } = useFetch("http://localhost:8000/blogs");

là đang thực hiện destructuring và gán các dữ liệu tương ứng vào các tên biến

thực chất data: data và có thể viết gọn thành data tương tự như isPending, error. Nhưng vì thích là blogs nên đổi thành data: blogs

1 cách giải thích khác:

data sẽ được gán cho biến blogs sau khi thực hiện destructuring, giữ nguyên giá trị của biến data từ hook useFetch. Bây giờ, bạn có thể sử dụng biến blogs thay vì data trong phần còn lại của component.

React router cung cấp Router bọc trong các Routes và bọc các Route trong mỗi route chứa mỗi trang

Di chuyển giữa các trang sẽ dung "Link to"

Route parameters

/blogs/123

/blogs/455

/blogs/{dynamic value}

Giải thích cơ chế điền form trong React

```js
const [title, setTitle] = useState("");

<input
    type="text"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    required
/>;
```

### Inputs trong React

Đầu tiên cơ chế useState có cơ chế title = "" đặt cho value của nó "".

Sau đó sẽ có 1 vấn đề là người dùng sẽ gõ vào và không được.

Cho nên sẽ bổ sung thêm onChange, thằng này lắng nghe người dùng gõ, giúp cập nhật lại cây DOM

mình sẽ để trong onChange 1 callbacks để khi mà có sự kiện gõ diễn ra onChange bắt được và gọi tới (anonymus function) callBack

trong callback đầu vào truyền cho nó e (e này là 1 event object), trong e này chứa rất nhiều thứ. Thứ quan tâm là target, mục tiêu focus, và lấy ra value của mục tiêu đó.

Việc cuối cùng là mình đặt nó vào trong setName hay set gì đó... để lấy tính năng useState cập nhật lại name đó hoặc ... rồi gửi xuống lại cho value để value hiển thị giá trị đó ra.

### Submit events trong React

```js
const handleSubmit = (e) => {
    e.preventDefault();
};

<form action="" onSubmit={handleSubmit}>
    ...
</form>;
```

Khi mà gửi form lên handleSubmit sẽ nhận vào event object. Trường hợp lúc này form sẽ bị reload lại trang do cơ chế của form khi submit phải reload. Chính vì vậy e.preventDefault(); ngăn chặn cái việc đó.
