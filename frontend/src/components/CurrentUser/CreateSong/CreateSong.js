import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { newSong } from "../../../store/songReducer";
import "./CreateSong.css";

export default function CreateSongComponent() {
  const dispatch = useDispatch();
  const history = useHistory();
  const defaultSongImage =
    "https://soundcloudmisc.s3.us-east-2.amazonaws.com/Uknown+Album.png";
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [songUrl, setSongUrl] = useState("");
  const [songImage, setSongImage] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const [disableButton, setDisableButton] = useState(false);

  const handleCreateSongButton = async (e) => {
    e.preventDefault();
    setValidationErrors([]);
    setDisableButton(true);

    await dispatch(
      newSong({
        title,
        description,
        url: songUrl,
        imageUrl: songImage || defaultSongImage,
      })
    )
      .then(() => {
        history.push("/me");
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setValidationErrors(data.errors);
        }
      });

    setTitle("");
    setDescription("");
    setSongImage("");
    setValidationErrors([]);
    setDisableButton(false);
  };

  const uploadAudioFile = e => {
    e.preventDefault()
    const songFile = e.target.files[0]
    setSongUrl(songFile);
  }

  const uploadImageFile = (e) => {
    e.preventDefault();
    const imageFile = e.target.files[0];
    setSongImage(imageFile);
  };

  const handleCancelBtn = (e) => {
    e.preventDefault();
    history.push("/songs");
  };

  return (
    <div className="create-song-component">
      <div>
        <h1>Create A New Song</h1>
      </div>
      <form onSubmit={handleCreateSongButton}>
        <ul>
          {Object.values(validationErrors).map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
        <div className="create-song-details">
          <div>
            <label htmlFor="title">Song Title*</label>
            <input
              className="create-song-input"
              type="text"
              id="title"
              name="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input
              className="create-song-input"
              type="text"
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="audio">Audio File*</label>
            <input
              className="create-song-input"
              type="file"
              id="audio"
              name="audio"
              required
              onChange={(e) => uploadAudioFile(e)}
            />
          </div>
          <div>
            <label htmlFor="Audio Image">Audio Image*</label>
            <input
              className="create-song-input"
              type="file"
              id="image"
              name="image"
              required
              onChange={(e) => uploadImageFile(e)}
            />
          </div>
        </div>
        <div>
          <button
            disabled={disableButton}
            className="create-song-button"
            type="submit"
          >
            Save
          </button>
          <button
            disabled={disableButton}
            className="create-song-cancel-button"
            onClick={handleCancelBtn}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
