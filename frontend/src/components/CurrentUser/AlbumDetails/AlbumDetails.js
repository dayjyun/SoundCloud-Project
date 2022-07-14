import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteAlbum, getAlbum } from "../../../store/albumReducer";
import EditAlbumBtn from "../Edit/EditAlbumBtn";
import UploadSongBtn from "./UploadSong/UploadSongBtn";
import "./AlbumDetails.css";

export default function AlbumDetails() {
  const { albumId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const albums = Object.values(useSelector((state) => state.albums));
  const user = useSelector((state) => state.session.user);
  const singleAlbum = albums?.find((album) => album?.id === +albumId);
  const [albumButton, setAlbumButton] = useState(false);

  useEffect(() => {
    if (user?.id === singleAlbum?.userId) {
      setAlbumButton(true);
    } else {
      setAlbumButton(false);
    }
  }, []);

  useEffect(() => {
    dispatch(getAlbum(+albumId));
  }, [dispatch]);

  const handleAlbumDelete = (e) => {
    e.preventDefault();
    dispatch(deleteAlbum(+albumId));
    alert("Album successfully deleted");
    history.push("/me");
  };

  return (
    <>
      <div className="album-info-container">
        <div className="album-details-box">
          <div>
            <img className="album-cover-image" src={`${singleAlbum?.previewImage}`} />
          </div>
          <div className="album-info">
            <h1 className="album-desc-title">{singleAlbum?.title}</h1>
            <p className="album-desc-description">{singleAlbum?.description}</p>
          </div>
        </div>
        {albumButton && (
          <div className="asdf">
            <div className="edit-album-buttons">
              <EditAlbumBtn />
              <UploadSongBtn />
            </div>
            <div>
              <button
                className="delete-album-button"
                onClick={handleAlbumDelete}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
