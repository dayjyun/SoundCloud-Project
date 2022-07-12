import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as actions from "../../../../store/songReducer";

export default function UploadSongForm({ setShowUploadBtn }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const userId = user.id;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [previewImage, setPreviewImage] = useState(
    "https://soundcloudmisc.s3.us-east-2.amazonaws.com/Uknown+Album.png"
  );
  const [validationErrors, setValidationErrors] = useState([]);

  const handleAlbumSubmit = async (e) => {
    e.preventDefault();
    setValidationErrors([]);

    await dispatch(
      actions.uploadSong({
        userId,
        title,
        description,
        previewImage,
        url,
      })
    )
      .then(() => {
        setShowUploadBtn(false);
        history.push("/songs/");
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.validationErrors) {
          setValidationErrors(data.validationErrors);
        }
      });

    setTitle("");
    setDescription("");
    setUrl("");
    setPreviewImage("");
  };

  const handleCancelBtn = (e) => {
    e.preventDefault();
    setShowUploadBtn(false);
    history.push("/songs");
  };

  return (
    <div className="upload-song-form">
      <h2>Add Your New Track</h2>
      <form onSubmit={handleAlbumSubmit}>
        <ul>
          {validationErrors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
        <div className="input-wrapper">
          <label htmlFor="title">Title</label>
          <input
            className="upload-input"
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            className="upload-input"
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="previewImage">Image URL Address</label>
          <input
            className="upload-input"
            type="text"
            name="previewImage"
            value={previewImage}
            onChange={(e) => setPreviewImage(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="url">Song URL Address</label>
          <input
            className="upload-input"
            type="text"
            name="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className="form-btn-wrapper">
          <button className="upload-song-save-button" type="submit">
            Save
          </button>
          <button
            className="upload-song-cancel-button"
            onClick={handleCancelBtn}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
