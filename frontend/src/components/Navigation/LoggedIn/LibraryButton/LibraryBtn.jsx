import { NavLink } from "react-router-dom";
import "./LibraryBtn.css";

export default function AllSongsLibraryBtn() {
  return (
    <>
      <NavLink className={"libraryBtn"} exact to="/songs">
        Library
      </NavLink>
    </>
  );
}
