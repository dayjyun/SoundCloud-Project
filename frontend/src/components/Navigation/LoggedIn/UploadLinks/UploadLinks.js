import { NavLink } from "react-router-dom";
import './UploadLinks.css'

export default function UploadLinks() {
  return (
    <div className="upload-media-navLinks">
      <div>
        <NavLink className="upload-navLink" to="/me/songs">
          Upload Song
        </NavLink>
      </div>
      <div>
        <NavLink className="upload-navLink" to="/me/albums">
          Upload Album
        </NavLink>
      </div>
    </div>
  );
}
