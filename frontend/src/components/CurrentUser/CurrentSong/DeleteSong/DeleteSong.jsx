import { useDispatch } from "react-redux"
import deleteSong from '../../../../store/songReducer'

export default function DeleteThisSong() {
    const dispatch = useDispatch()

    const handleDelete = (songId) => {
        dispatch(deleteSong(songId))
        alert("Song Successfully Deleted")
        history.pushState("/songs")

    }

    return (
        <div>
            <button onClick={() => handleDelete(songId)}>Delete</button>
        </div>
    )
}
