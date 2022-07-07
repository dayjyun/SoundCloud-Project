import { useDispatch } from "react-redux"
import deleteSong from '../../../../store/songReducer'

export default function DeleteThisSong() {
    const dispatch = useDispatch()

    const handleDelete = (songId) => {
        dispatch(deleteSong(songId))
        history.pushState("/songs")
        // alert("Song Successfully Deleted")
        // history.pushState('/me')
    }

    return (
        <div>
            <button onClick={() => handleDelete(songId)}>Delete</button>
        </div>
    )
}
