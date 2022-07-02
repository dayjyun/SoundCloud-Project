import { useDispatch } from "react-redux"

export default function DeleteSong() {
    const dispatch = useDispatch()

    const handleDelete = (songId) => {
        dispatch(deleteSong(songId))
        history.pushState("/songs")
    }

    return (
        <div>
            <button onClick={() => handleDelete(songId)}>Delete</button>
        </div>
    )
}
