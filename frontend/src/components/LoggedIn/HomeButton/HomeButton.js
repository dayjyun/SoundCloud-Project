import { NavLink } from "react-router-dom";
import "./HomeButton.css";

export default function HomeButton() {
  return (
    <>
      <NavLink className={"homeBtn"} exact to="/me">
        Home
      </NavLink>
    </>
  );
}
