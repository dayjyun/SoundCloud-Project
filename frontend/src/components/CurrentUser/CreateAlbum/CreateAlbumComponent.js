import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createAlbum } from "../../../store/albumReducer";
import "./CreateAlbumComponent.css";

export default function CreateAlbumComponent() {
  const dispatch = useDispatch();
  const defaultAlbumImg =
    "https://soundcloudmisc.s3.us-east-2.amazonaws.com/Uknown+Album.png";
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [albumImage, setAlbumImage] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);

  console.log(useState())

  const handleNewAlbumForm = async (e) => {
    e.preventDefault();
    setValidationErrors([]);

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
        if (data && data.validationErrors) {
          setValidationErrors(data.validationErrors);
        }
      });

    setTitle("");
    setDescription("");
    setAlbumImage("");
  };

  return (
    <>
      <div className="create-album-component">
        <div>
          <h1>Create A New Album</h1>
        </div>
        <form onSubmit={handleNewAlbumForm}>
          <div className="create-album-details">
            <div>
              <label htmlFor="title">Album Title*</label>
              <input
                className="create-album-input"
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
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
            <div>
              <label htmlFor="image">Album Image</label>
              <input
                className="create-album-input"
                type="text"
                id="image"
                name="image"
                placeholder="optional"
                value={albumImage}
                onChange={(e) => setAlbumImage(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </>
  );
}
