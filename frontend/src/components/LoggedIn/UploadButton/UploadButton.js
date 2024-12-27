import { NavLink } from 'react-router-dom'
import './UploadButton.css'

export default function UploadButton() {
    return (
        <NavLink className={"uploadBtn"} exact to='/me/songs'>
            Upload
        </NavLink>
    )
}
