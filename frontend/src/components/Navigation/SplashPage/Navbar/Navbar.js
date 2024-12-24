import SoundCloudLogo from "../../SoundCloudLogo/SoundCloudLogo"
import LoginFormModal from "../LoginFormModal"
import SignUpFormModal from "../SignupFormModal"
import "./Navbar.scss"

export const Navbar = () => {
    return (
        <div className="navbar-main">
            <SoundCloudLogo className={"navbar"}/>
            <div>
                <LoginFormModal />
                <SignUpFormModal />
            </div>
        </div>
    )
}
