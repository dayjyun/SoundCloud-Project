import SoundCloudLogo from "../SoundCloudLogo/SoundCloudLogo";
import LoginFormModal from "./LoginFormModal";
import SignUpFormModal from "./SignupFormModal";
import "./SplashPage.css";

export default function SplashPage() {
  return (
    <>
      <div>
        <div className="splash-top">
          <div className="background-image-one">
            <div className="splash-nav">
              <div className="splash-nav-left">
                <SoundCloudLogo />
              </div>
              <div className="splash-nav-right">
                <LoginFormModal />
                <SignUpFormModal />
              </div>
            </div>
            <div className="text-div">
              <h1 className="background-image-one-text">
                Welcome To SoundCloud
              </h1>
            </div>
          </div>
        </div>
        <div className="splash-component">
          <div className="splash-text">
            <div className="splash-text-card">
              <strong>Explore</strong>
              <p>Search through content created by other artists</p>
            </div>
            <div className="splash-text-card">
              <strong>Listen</strong>
              <p>To creations made by other artists</p>
            </div>
            <div className="splash-text-card">
              <strong>Create</strong>
              <p>Upload your own songs and albums for the world to listen</p>
            </div>
          </div>
          <div className="splash-bottom">
            <div className="background-image-two">
              <div className="text-div-two">
                <div className="background-image-two-text">
                  <h1>The World Is Listening</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="splash-text">
            <p className="splash-text-card">
              Sign up and join our community of artists
            </p>
          </div>
        </div>
        <div className="closer">
          <div className="splash-signup-button-bottom">
            <SignUpFormModal />
          </div>
          <div className="splash-login">
            <div>
              <p className="splash-login-text">Already have an account?</p>
            </div>
            <div>
              <LoginFormModal />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
