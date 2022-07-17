import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as actions from "../../../../store/albumReducer";
import "./EditAlbumForm.css";

export default function EditAlbumForm({ setShowAlbumEdit }) {
  const { albumId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const album = useSelector((state) => state.albums[`${albumId}`]);
  const defaultImg = "https://soundcloudmisc.s3.us-east-2.amazonaws.com/Uknown+Album.png";
  const [validationErrors, setValidationErrors] = useState([]);
  const [title, setTitle] = useState(album.title);
  const [description, setDescription] = useState(album.description);
  const [previewImage, setPreviewImage] = useState(album.previewImage);
  const [disableButton, setDisableButton] = useState(false);

  const handleAlbumFormSubmit = async (e) => {
    e.preventDefault();
    setValidationErrors([]);
    setDisableButton(true)

    await dispatch(
      actions.editAlbum({
        id: albumId,
        title,
        description,
        imageUrl: previewImage || defaultImg,
      })
    )
      .then(() => {
        setShowAlbumEdit(false);
        history.push(`/albums/${albumId}`);
      })
      .catch(async (res) => {
        const err = await res.json();
        console.log(err.errors)
        if (err) {
          setValidationErrors(err.errors);
        }
      });

      setDisableButton(false)
  };

  const uploadImageFile = e => {
    e.preventDefault()
    const imageFile = e.target.files[0]
    setPreviewImage(imageFile)
  }

  const handleCancelBtn = (e) => {
    e.preventDefault();
    setShowAlbumEdit(false);
    history.push(`/albums/${albumId}`);
  };

  return (
    <div className="edit-album-form-container">
      <div className="edit-album-text">
        <p>Edit Your Album</p>
      </div>
      <div>
        <h5>* fields are required</h5>
      </div>
      <form onSubmit={handleAlbumFormSubmit}>
        <ul>
          {Object.values(validationErrors)?.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
        <div className="album-input">
          <div className="enter-album">
            <label htmlFor="title">Title*</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="enter-album">
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
          <div className="save-button-edit-album">
            <button
              disabled={disableButton}
              className="save-button-album"
              type="submit"
            >
              Save
            </button>
            <button
              disabled={disableButton}
              className="edit-album-cancel-button"
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
