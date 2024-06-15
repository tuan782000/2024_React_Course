import { useState } from "react";
import { useNavigate } from "react-router-dom"

const Create = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [author, setAuthor] = useState("john");
    const [isPending, setIsPending] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = { title, body, author };
        console.log(blog);
        setIsPending(true);
        fetch('http://localhost:8000/blogs', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(blog) // chuyển JSON sang dạng chuỗi
        }).then(() => {
            console.log("New blog created")
            setMessage("New blog added")
            setIsPending(false);
            // reset value form
            setTitle("");
            setBody("")
            setAuthor("john");
            navigate("/"); // submit xong về homepage
        });
    }

    return (
        <div className="create">
            <h2>Add a new Blog</h2>
            <form action="" onSubmit={handleSubmit}>
                <label htmlFor="">Blog title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <label htmlFor="">Blog body:</label>
                <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    required
                ></textarea>
                <label htmlFor="">Blog author:</label>
                <select value={author} onChange={(e) => setAuthor(e.target.value)}>
                    <option value="john">john</option>
                    <option value="andrew">andrew</option>
                    <option value="maria">maria</option>
                </select>
                {!isPending && <button>Add Blog</button>}
                {isPending && <button disabled>Adding Blog</button>}
                <p>{message}</p>
            </form>
        </div>
    );
}

export default Create;