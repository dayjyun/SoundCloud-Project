import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createAlbum } from "../../../../store/albumReducer";
import "./CreateAlbumComponent.css";

export default function CreateAlbumComponent() {
  const dispatch = useDispatch();
  const history = useHistory();
  const defaultAlbumImg =
    "https://soundcloudmisc.s3.us-east-2.amazonaws.com/Uknown+Album.png";
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [albumImage, setAlbumImage] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const [disableButton, setDisableButton] = useState(false);

  const handleNewAlbumForm = async (e) => {
    e.preventDefault();
    setValidationErrors([]);
    setDisableButton(true)

    await dispatch(
      createAlbum({
        title,
        description,
        imageUrl: albumImage || defaultAlbumImg,
      })
    )
      .then(() => {
        history.push(`/me`);
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setValidationErrors(data.errors);
        }
      });

    setTitle("");
    setDescription("");
    setAlbumImage("");
    setValidationErrors([])
    setDisableButton(false);
  };

  const uploadImageFile = (e) => {
    e.preventDefault();
    const imageFile = e.target.files[0];
    setAlbumImage(imageFile);
  };

  const handleCancelBtn = (e) => {
    e.preventDefault();
    history.push('/albums')
  };

  return (
    <div className="create-album-component-box">
      <div className="create-album-component">
        <div>
          <h1>Create Something New</h1>
          <h4>New Album</h4>
        </div>
        <form onSubmit={handleNewAlbumForm}>
          <div className="create-album-details">
            <div className="create-album-box">
              <label htmlFor="title">Album Title*</label>
              <input
                className="create-album-input"
                type="text"
                id="title"
                name="title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="create-album-box">
              <label htmlFor="description">Description</label>
              <input
                className="create-album-input"
                type="text"
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="create-album-box">
              <label htmlFor="image">Image File*</label>
              <input
                className="create-album-input"
                type="file"
                id="image"
                name="image"
                required
                onChange={(e) => uploadImageFile(e)}
              />
            </div>
          </div>
          <div className="create-album-buttons">
            <button
              disabled={disableButton}
              className="create-album-button"
              type="submit"
            >
              Save
            </button>
            <button
              disabled={disableButton}
              className="create-album-cancel-button"
              onClick={handleCancelBtn}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
