import { useHistory } from "react-router-dom";
import "./ErrorPage.css";

export default function ErrorPage() {
  const history = useHistory()

  const handleErrorClick = (e) => {
    e.preventDefault();
    history.push('/me')
  }
  return (
    <>
      <div className="error-text">
        <div className="h1-text">
          <h1>It's a little quiet here...</h1>
        </div>
        <div className="h3-text">
          <h3>404: The page you're looking for does not exist</h3>
        </div>
      </div>
      <div className="error-button-box">
        <button className="error-button" onClick={handleErrorClick}>My Profile</button>
      </div>
    </>
  );
}
