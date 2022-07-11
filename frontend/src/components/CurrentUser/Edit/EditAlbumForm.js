import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import * as actions from "../../../store/albumReducer";

export default function EditAlbumForm({ setShowAlbumEdit }) {
  const { albumId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.session.user);
  const userId = user.id;
  const album = useSelector((state) => state.albums[`${albumId}`]);

  const [validationErrors, setValidationErrors] = useState([]);
  const [title, setTitle] = useState(album.title);
  const [description, setDescription] = useState(album.description);
  const [previewImage, setPreviewImage] = useState(album.previewImage);
  const [url, setUrl] = useState(album.url);

  const handleAlbumFormSubmit = async (e) => {
    e.preventDefault();
    setValidationErrors([]);
    await dispatch(
      actions.editAlbum({
        id: albumId,
        title,
        description,
        previewImage,
        url,
        userId,
      })
    )
      .then(() => {
        setShowAlbumEdit(false);
        history.push(`/albums/${albumId}`);
      })
      .catch(async (res) => {
        const err = await res.json();
        if (err) {
          setValidationErrors(err.validationErrors);
        }
      });
  };

  return (
    <div className="edit-album-form">
      <h1>Edit Your Album</h1>
      <form onSubmit={handleAlbumFormSubmit}>
        <ul>
          {Object.values(validationErrors).map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
        <div className="input-wrapper">
          <label htmlFor="title">Title</label>
          <input
            className="edit-imput"
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="input-wrapper">
            <label htmlFor="previewImage">Preview Image</label>
            <input
              className="edit-input"
              type='text'
              id='previewImage'
              value={previewImage}
              onChange={e => setPreviewImage(e.target.value)}
            />
            <div className="input-wrapper">
              <label htmlFor="url">ALbum Url</label>
              <input
                className="edit-input"
                type="text"
                id='url'
                name='url'
                value={url}
                onChange={e => setUrl(e.target.value)}
              />
            </div>
            <div>
              <button className="edit-button" type="submt">
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
