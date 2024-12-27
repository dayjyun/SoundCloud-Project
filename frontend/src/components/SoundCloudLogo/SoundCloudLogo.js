import "./SoundCloudLogo.css";

export default function SoundCloudLogo({ className }) {
  return (
    <div className="navbar-image-container">
      <img
        className={className}
        src="https://soundcloudmisc.s3.us-east-2.amazonaws.com/soundcloud_logo_orange.png"
      />
    </div>
  );
}
