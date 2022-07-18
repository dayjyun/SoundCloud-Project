import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as actions from "../../../store/songReducer";
import "./EditSongForm.css";

export default function EditSongForm({ setShowSongEdit }) {
  const { songId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.session.user);
  const userId = user.id;
  const song = useSelector((state) => state.songs[`${songId}`]);

  const [validationErrors, setValidationErrors] = useState([]);
  const [title, setTitle] = useState(song.title);
  const [description, setDescription] = useState(song.description);
  const [previewImage, setPreviewImage] = useState(song.previewImage);
  const [url, setUrl] = useState(song.url);
  const [disableButton, setDisableButton] = useState(false);

  const handleSongFormSubmit = async (e) => {
    e.preventDefault();
    setDisableButton(true)
    setValidationErrors([]);

    await dispatch(
      actions.editSong({
        id: songId,
        title,
        description,
        imageUrl: previewImage,
        url,
        userId,
      })
    )
      .then(() => {
        setShowSongEdit(false);
        history.push(`/songs/${songId}`);
      })
      .catch(async (res) => {
        const err = await res.json();
        if (err) {
          setValidationErrors(err.errors);
        }
      });
      setDisableButton(false);
  };

  // const uploadSongFile = e => {
  //   e.preventDefault();
  //   const songFile = e.target.files[0];
  //   setUrl(songFile);
  // }

  // const uploadImageFile = e => {
  //   e.preventDefault()
  //   const imageFile = e.target.files[0]
  //   setPreviewImage(imageFile)
  // }

  const handleCancelBtn = (e) => {
    e.preventDefault();
    setShowSongEdit(false);
    history.push(`/songs/${songId}`);
  };

  return (
    <div className="edit-song-form-container">
      <div className="edit-song-text">
        <p>Edit Your Song</p>
      </div>
      <div>
        <h5>* fields are required</h5>
      </div>
      <form onSubmit={handleSongFormSubmit}>
        <ul>
          {Object.values(validationErrors).map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
        <div className="song-input">
          <div className="enter-song">
            <label htmlFor="title">Title*</label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="enter-song">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              placeholder="optional"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {/* <div className="enter-song">
            <label htmlFor="url">Audio*</label>
            <input
              type="file"
              id="url"
              name="url"
              required
              onChange={(e) => uploadSongFile(e)}
            />
          </div>
          <div className="enter-song">
            <label htmlFor="previewImage">Image*</label>
            <input
              type="file"
              id="previewImage"
              name="previewImage"
              required
              onChange={(e) => uploadImageFile(e)}
            />
          </div> */}
          <div className="save-button-edit-song">
            <button
              disabled={disableButton}
              className="save-button-song"
              type="submit"
            >
              Save
            </button>
            <button
              disabled={disableButton}
              className="edit-song-cancel-button"
              onClick={handleCancelBtn}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
