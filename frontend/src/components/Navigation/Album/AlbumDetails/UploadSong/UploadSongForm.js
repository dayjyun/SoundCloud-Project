import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getAllAlbums } from "../../../../../store/albumReducer";
import * as actions from "../../../../../store/songReducer";
import "./UploadSongForm.css";

export default function UploadSongForm({ setShowUploadBtn }) {
  const { albumId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const albums = Object.values(useSelector((state) => state.albums));
  const defaultImg = albums?.find(
    (album) => album.id === +albumId
  ).previewImage;
  const userId = user.id;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [songUrl, setSongUrl] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const [disableButton, setDisableButton] = useState(false);

  useEffect(() => {
    dispatch(getAllAlbums());
  }, [dispatch]);

  const handleAlbumSubmit = async (e) => {
    e.preventDefault();
    setDisableButton(true)
    setValidationErrors([]);

    await dispatch(
      actions.uploadSong(
        {
          userId,
          title,
          description,
          imageUrl: previewImage || defaultImg,
          url: songUrl,
        },
        albumId
      )
    )
      .then(() => {
        setShowUploadBtn(false);
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
    setSongUrl("");
    setPreviewImage("");
    setDisableButton(false)
  };

  const handleCancelBtn = (e) => {
    e.preventDefault();
    setShowUploadBtn(false);
    history.push(`/albums/${albumId}`);
  };

  const uploadSongFile = (e) => {
    e.preventDefault();
    const songFile = e.target.files[0];
    setSongUrl(songFile);
  };

  return (
    <div className="upload-song-form-container">
      <div className="upload-song-text">
        <p>Add A New Track</p>
      </div>
      <div>
        <h5>* fields are required</h5>
      </div>
      <form onSubmit={handleAlbumSubmit}>
        <ul>
          {Object.values(validationErrors).map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
        <div className="upload-input">
          <div className="upload-song">
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
          <div className="upload-song">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="upload-song">
            <label htmlFor="url">Audio*</label>
            <input
              type="file"
              id="url"
              name="url"
              required
              onChange={(e) => uploadSongFile(e)}
            />
          </div>
          <div className="save-button-upload-song">
            <button
              disabled={disableButton}
              className="save-button-upload"
              type="submit"
            >
              Submit
            </button>
            <button
              disabled={disableButton}
              className="upload-song-cancel-button"
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
