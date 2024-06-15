// const Home = () => {
//     const handleClick = () => {
//         console.log("Hello John")
//     }
//     const handleClickName = (name) => {
//         console.log(`Hello ${name}`)
//     }
//     const handleClickNameWithEvent = (name, e) => {
//         console.log(`Hello ${name}`, e)
//     }
//     return (<div className="home">
//         <h2>Home Page</h2>
//         <button onClick={handleClick}>Click me</button>
//         <button onClick={() => { handleClickName("Tuan") }}>Hello</button>
//         <button onClick={(e) => { handleClickNameWithEvent("Tuan", e) }}>Button with event</button>
//     </div>);
// }



// export default Home;

/*
Giải thích
<button onClick={handleClick}>Click me</button> Sẽ là OK!!!
<button onClick={handleClick()}>Click me</button> Không OK!!! Vì nó sẽ gọi hàm này luôn và onClick sẽ không nhấn được

handleClick() là gọi hàm.

nhưng mình muốn khi nào mình nhấn nút thì nó mới được gọi thì bắt buộc phải bỏ dấu ngoặc tròn () để không gọi hàm.

còn việc không có dấu () React sẽ tự động gọi nó khi sự kiện xảy ra.

Để có thể gọi hàm và truyền tham số bắt buộc phải dùng callback (anonymous function) 1 hàm nằm bên trong 1 hàm khác gọi là callbacks


<button onClick={(e) => { handleClickNameWithEvent("Tuan", e) }}>Button with event</button>

gửi kèm event

*/
import { useEffect, useState } from "react";
import BlogList from "./BlogList";

const HomeOld = () => {
    const [blogs, setBlogs] = useState([
        {
            title: "How to become a good developer",
            body: "Lorem ipsum, dolor sit amet, consectetur adipisicing elit. Libero dolorum amet quam tenetur doloribus itaque quas praesentium. Voluptas, quas dolores.",
            author: "john",
            id: 1,
        },
        {
            title: "10 tips to build React components",
            body: "Lorem ipsum, dolor sit amet, consectetur adipisicing elit. Libero dolorum amet quam tenetur doloribus itaque quas praesentium. Voluptas, quas dolores.",
            author: "andrew",
            id: 2,
        },
        {
            title: "React JS tutorial",
            body: "Lorem ipsum, dolor sit amet, consectetur adipisicing elit. Libero dolorum amet quam tenetur doloribus itaque quas praesentium. Voluptas, quas dolores.",
            author: "maria",
            id: 3,
        },
        {
            title: "React JS tutorial Part 2",
            body: "Lorem ipsum, dolor sit amet, consectetur adipisicing elit. Libero dolorum amet quam tenetur doloribus itaque quas praesentium. Voluptas, quas dolores.",
            author: "maria",
            id: 4,
        },
        {
            title: "React JS tutorial Part 3",
            body: "Lorem ipsum, dolor sit amet, consectetur adipisicing elit. Libero dolorum amet quam tenetur doloribus itaque quas praesentium. Voluptas, quas dolores.",
            author: "maria",
            id: 5,
        },
    ]);

    const handleDelete = (id) => {
        // filter trả về 1 mảng mới
        const newBlogs = blogs.filter(blog => blog.id !== id); // lọc ra từng blog chỉ có và trả về các blog mà không có id trùng với id mình truyền vào từ đầu. Bởi vì id truyền vào sẽ là thăng mình cần xóa. Làm vậy mình đã cô lặp được nó.
        setBlogs(newBlogs);
    }

    useEffect(() => {
        console.log("Use Effect ran")
        console.log(blogs)
    });

    return (
        <div className="home">
            <BlogList blogs={blogs} heading={"All Blogs"} handleDelete={handleDelete} />
            {/* Hiển thị các Blog của maria thôi */}
            <BlogList blogs={blogs.filter(blog => blog.author === "maria")} heading={"Blog's Maria"} handleDelete={handleDelete} />
            {/* blogs.filter(blog => blog.author === "maria") trong mảng blogs sử dụng hàm filter */}
            {/* Mỗi con là blog tham chiếu đến author mà thỏa điều kiện thì return về lại mảng không thì bỏ qua. */}
            <BlogList blogs={blogs.filter(blog => blog.author === "andrew")} heading={"Blog's Andrew"} handleDelete={handleDelete} />
        </div>
    );
}

export default HomeOld;

/*
Loại 1: useEffect(() => {}) không có dependency:

Chính xác, useEffect này sẽ chạy sau mỗi lần render. Nó không có dependency để theo dõi, do đó, nó sẽ chạy mỗi khi component được render lại.

Loại 2: useEffect(() => {}, []) có dependency nhưng rỗng:

Đúng, useEffect này sẽ chạy một lần duy nhất sau lần render đầu tiên. Dependency rỗng nghĩa là nó không theo dõi bất kỳ state hoặc prop nào, do đó, nó chỉ chạy một lần khi component được mount.

Loại 3: useEffect(() => {}, [value]) có dependency và có giá trị để theo dõi:

Đúng, useEffect này sẽ chạy khi component được mount lần đầu tiên và sau mỗi lần state hoặc prop value thay đổi.
*/