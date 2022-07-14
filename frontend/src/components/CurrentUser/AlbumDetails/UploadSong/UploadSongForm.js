import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getAllAlbums } from "../../../../store/albumReducer";
import * as actions from "../../../../store/songReducer";
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

  useEffect(() => {
    dispatch(getAllAlbums());
  }, [dispatch]);

  const handleAlbumSubmit = async (e) => {
    e.preventDefault();
    setValidationErrors([]);

    await dispatch(
      actions.uploadSong(
        {
          userId,
          title,
          description,
          imageUrl: previewImage || defaultImg,
          songUrl,
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
        if (data && data.validationErrors) {
          setValidationErrors(data.validationErrors);
        }
      });

    setTitle("");
    setDescription("");
    setSongUrl("");
    setPreviewImage("");
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

  const uploadImageFile = (e) => {
    const imageFile = e.target.files[0];
    setPreviewImage(imageFile);
  };

  return (
    <div className="upload-song-form-container">
      <div className="upload-song-text">
        <p>Add A New Track</p>
      </div>
      <form onSubmit={handleAlbumSubmit}>
        <ul>
          {Object.values(validationErrors).map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
        <div className="upload-input">
          <div className="upload-song">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
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
              placeholder="optional"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="upload-song">
            <label htmlFor="previewImage">Image</label>
            <input
              type="file"
              id="previewImage"
              name="previewImage"
              placeholder="optional"
              onChange={(e) => uploadImageFile(e)}
            />
          </div>
          <div className="upload-song">
            <label htmlFor="url">Song URL Address</label>
            <input
              type="file"
              id="url"
              name="url"
              onChange={(e) => uploadSongFile(e)}
            />
          </div>
          <div className="save-button-upload-song">
            <button className="save-button-upload" type="submit">
              Submit
            </button>
            <button
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
