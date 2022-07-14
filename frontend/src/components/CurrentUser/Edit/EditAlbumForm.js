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
        imageUrl: previewImage,
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
    <div className="edit-album-form">
      <div>
        <h1>Edit Your Album</h1>
      </div>
      <form onSubmit={handleAlbumFormSubmit}>
        <ul>
          {Object.values(validationErrors)?.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
        <div className="album-input">
          <label htmlFor="title">Title*</label>
          <input
            className="edit-input"
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="description">Description</label>
          <input
            className="edit-input"
            type="text"
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="previewImage">Image</label>
          <input
            className="edit-input"
            type="text"
            id="previewImage"
            name="previewImage"
            value={previewImage}
            onChange={(e) => setPreviewImage(e.target.value)}
          />
        </div>
        <div>
          <button className="edit-button" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
