import { NavLink } from 'react-router-dom'
import './UploadSongs.css'

export default function Upload() {
    return (
        <NavLink className={"uploadBtn"} to='/place-holder/albums'>
            Upload
        </NavLink>
    )
}
