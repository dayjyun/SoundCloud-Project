import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as actions from "../../../store/albumReducer";
import "./EditAlbumForm.css";

export default function EditAlbumForm({ setShowAlbumEdit }) {
  const { albumId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const album = useSelector((state) => state.albums[`${albumId}`]);
  const defaultImg =
    "https://soundcloudmisc.s3.us-east-2.amazonaws.com/Uknown+Album.png";

  const [validationErrors, setValidationErrors] = useState([]);
  const [title, setTitle] = useState(album.title);
  const [description, setDescription] = useState(album.description);
  const [previewImage, setPreviewImage] = useState(album.previewImage);

  const handleAlbumFormSubmit = async (e) => {
    e.preventDefault();
    setValidationErrors([]);
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
        if (err) {
          console.log(err);
          setValidationErrors(err.errors);
        }
      });
  };

  return (
    <div className="edit-album-form-container">
      <div className="edit-album-text">
        <p>Edit Your Album</p>
      </div>
      <form onSubmit={handleAlbumFormSubmit}>
        <ul>
          {Object.values(validationErrors)?.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
        <div className="album-input">
          <div className="enter-album">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
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
          <div className="enter-album">
            <label htmlFor="previewImage">Image</label>
            <input
              type="text"
              id="previewImage"
              name="previewImage"
              placeholder="optional"
              value={previewImage}
              onChange={(e) => setPreviewImage(e.target.value)}
            />
          </div>
          <div className="save-button-edit-album">
            <button className="save-button-album" type="submit">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
