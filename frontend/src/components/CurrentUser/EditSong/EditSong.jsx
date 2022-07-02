import { useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'

export default function EditSong() {
    const { songId } = useParams()
    const sessionUser = useSelector(state => state.session.user);
    const song = useSelector(state => state.songs[songId])

    return (
        <div>
            <NavLink></NavLink>
        </div>
    )
}
