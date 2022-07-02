import { NavLink } from "react-router-dom";
import './AllSongsBtn.css'

export default function AllSongsBtn (){
    return(
        <>
            <NavLink className={"libraryBtn"} to='/songs'>
                Library
            </NavLink>
        </>
    )
}
