import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import deleteSong from '../../../../store/songReducer'

export default function DeleteThisSong() {
    const dispatch = useDispatch()
    const history = useHistory()

    // const handleDelete = (songId) => {
    //     dispatch(deleteSong(songId))
    //     alert("Song Successfully Deleted")
    //     history.pushState("/songs")

    // }

    return (
        <div>
            <button onClick={() => handleDelete(songId)}>Delete</button>
        </div>
    )
}
