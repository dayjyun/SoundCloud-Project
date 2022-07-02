import { NavLink } from "react-router-dom";
import "./SoundCloudText.css";

export default function SoundCloudText() {
  return (
  <>
    <NavLink exact to='/' className="soundCloudText">
        SOUNDCLOUD
    </NavLink>
  </>
  )
}

// import './SoundCloudText.css'

// export default function SoundCloudText() {
//     return <h2 className='soundCloudText'>SOUNDCLOUD</h2>
// }
