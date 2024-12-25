import SoundCloudLogo from "../../SoundCloudLogo/SoundCloudLogo";
import { LoginButton } from "../Login";
import { SignupButton } from "../Signup";
import "./Navbar.scss";

export const Navbar = () => {
  return (
    <div className="navbar-main">
      <SoundCloudLogo className={"navbar"} />
      <div className="navbar-buttons">
        <LoginButton />
        <SignupButton context="navbar" />
      </div>
    </div>
  );
};
