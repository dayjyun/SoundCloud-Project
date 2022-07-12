import './SplashPage.css'

export default function SplashPage() {
  return (
    <>
    <div className='splash-component'>
      <div className="splash-text">
        <p className="splash-text-card">
          <strong>Explore</strong>
          <p>Search through content created by other artists</p>
        </p>
        <p className="splash-text-card">
          <strong>Listen</strong>
          <p>To creations made by other artists</p>
        </p>
        <p className="splash-text-card">
          <strong>Create</strong>
          <p>Upload your own songs and albums for the world to listen</p>
        </p>
      </div>
      <div className="splash-bottom">
        <div className="background-image-two"></div>
      </div>
      <div className="splash-text">
        <p className="splash-text-card">
          Sign Up and join our community of artists
        </p>
      </div>
    </div>
    </>
  );
}
