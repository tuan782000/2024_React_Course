import { useState} from "react"
const NewSongForm = (props) => {
    const { addSong } = props;
    const [title, setTitle] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault(); // tránh trường hợp submit form reload trang
        console.log(title);
        addSong(title);
        setTitle('');
    }
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="songName">Song name:</label>
            <input
                type="text"
                required id="songName"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <button>Add Song</button>
        </form>
    )
}

export default NewSongForm