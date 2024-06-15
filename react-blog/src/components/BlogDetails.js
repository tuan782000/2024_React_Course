import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../useFetch";

const BlogDetails = () => {
    const { id } = useParams(); // lấy id trên tên miền phía UI
    const { data: blog, isPending, error } = useFetch(`http://localhost:8000/blogs/${id}`); // đưa id đó vào đây dùng
    console.log(blog)
    const naviagte = useNavigate();
    const handleDelete = () => {
        fetch(`http://localhost:8000/blogs/${blog.id}`, {
            method: 'DELETE',
        }).then(() => {
            naviagte("/");
        })
    }
    return (
        <div className="blog-details">
            {/* <h2>Blog Details - {id}</h2> */}
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {blog && (
                <article>
                    <h2>{blog.title}</h2>
                    <p>Written By {blog.author}</p>
                    <div>{blog.body}</div>
                    <button onClick={handleDelete}>Delete</button>
                </article>
            )}
        </div>
    );
}

export default BlogDetails;