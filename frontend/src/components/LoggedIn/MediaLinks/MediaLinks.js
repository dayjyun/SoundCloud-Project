import { NavLink } from "react-router-dom";
import "./MediaLinks.css";

function MediaLinks() {
  return (
    <div className="media-navLinks">
      <div>
        <NavLink className="media song-navLink" to="/songs">
          Songs
        </NavLink>
      </div>
      <div>
        <NavLink className="media album-navLink" to="/albums">
          Albums
        </NavLink>
      </div>
    </div>
  );
}

export default MediaLinks;
