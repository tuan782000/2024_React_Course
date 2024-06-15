import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import NewSongForm from './NewSongForm';
const SongList = () => {
    const [songs, setSongs] = useState([
        { title: "Happy Birthday", id: 1 },
        { title: "7 Years ago", id: 2 },
        { title: "Natural", id: 3 },
    ]);

    const addSong = (title) => {
        // Về mặt js không sai, nhưng react không chấp nhận cách viết này
        // const newSongs = songs.push({ title: "New Song", id: 4 })

        // Khi mà khai báo dữ liệu trong useState, mình Không cho được phép thay đổi dữ liệu gốc. Nhưng mình sẽ được thay đổi dữ liệu này trong trường hợp mình copy dữ liệu này ra một nơi khác, và mình thay đổi trực tiếp trên dữ liệu mình copy đó

        // cách này được chấp nhận.
        // sử dụng spread operator songs 
        // Điều này tạo ra một bản sao của đối tượng cũ và giúp ta thao tác trên nó mà không cần thao tác trực tiếp lên giá trị cũ
        // const newSongs = [...songs, { title: "New Song", id: uuidv4() }]

        // Viết ngắn lại:
        const newSongs = [...songs, { title: title, id: uuidv4() }]
        setSongs(newSongs)
    }
    const deleteSong = (id) => {
        console.log(id)
        const removeSong = songs.filter(song => song.id !== id)
        setSongs(removeSong);
    }
    useEffect(() => {
        // code run... (chỉ run khi component render hoặc re-render)
        // render: Xảy ra khi lần đầu tiên access "truy cập" vào component
        // re-render: Xảy ra khi 1 cái state bất kỳ thay đổi thì component nó sẽ render
        console.log('useEffect Hook ran', songs)
    })
    return (
        <div className="song-list">
            <ul>
                {songs.map((song) => (
                    <li key={song.id}>{song.title}
                        <button onClick={() => deleteSong(song.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            {/* <button onClick={addSong}>Add a Song</button> */}

            <NewSongForm addSong={addSong} />
        </div>
    )
}

export default SongList