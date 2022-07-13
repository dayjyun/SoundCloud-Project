import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createAlbum } from "../../../store/albumReducer";

export default function CreateAlbumComponent() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [albumImage, setAlbumImage] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);

  const handleNewAlbumForm = async (e) => {
    e.preventDefault();
    setValidationErrors([]);
    await dispatch(
      createAlbum({
        title,
        description,
        imageUrl: albumImage,
      })
    )
      .then(() => {
        history.push(`/albums`);
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
    <div className="create-album-component">
      <form onSubmit={handleNewAlbumForm}>
        <div>
          <label htmlFor="title">Album Title</label>
          <input
            className="create-input"
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
            className="create-input"
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
            className="create-input"
            type="text"
            id="image"
            name="image"
            value={albumImage}
            onChange={(e) => setAlbumImage(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}
