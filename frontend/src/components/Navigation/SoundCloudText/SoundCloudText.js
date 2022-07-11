import { NavLink } from "react-router-dom";
import "./SoundCloudText.css";

export default function SoundCloudText() {
  return (
    <>
      <NavLink exact to="/me" className="soundCloudText">
        {/* <div className="logo-img">
          <img className="sc-img"
            src="https://soundcloudmisc.s3.us-east-2.amazonaws.com/SoundCloudLogo_White.png"
            alt="logo"
          />
        </div> */}
        SOUNDCLOUD
      </NavLink>
    </>
  );
}

// import './SoundCloudText.css'

// export default function SoundCloudText() {
//     return <h2 className='soundCloudText'>SOUNDCLOUD</h2>
// }
