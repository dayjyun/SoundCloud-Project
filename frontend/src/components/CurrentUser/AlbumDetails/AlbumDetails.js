import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteAlbum, getAlbum } from "../../../store/albumReducer";
import EditAlbumBtn from "./EditAlbumBtn/EditAlbumBtn";
import UploadSongBtn from "./UploadSong/UploadSongBtn";
import "./AlbumDetails.css";
import AlbumSongsLoader from "./AlbumSongsLoader/AlbumSongsLoader";

export default function AlbumDetails() {
  const { albumId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const albums = useSelector((state) => state.albums);
  const album = albums[albumId];
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getAlbum(+albumId));
  }, [dispatch, albumId]);

  const handleAlbumDelete = (e) => {
    e.preventDefault();
    dispatch(deleteAlbum(+albumId));
    alert("Album successfully deleted");
    history.push("/me");
  };

  let userInputButtons;

  if (album?.userId === user?.id) {
    userInputButtons = (
      <div className="user-album-buttons">
        <div className="edit-album-button">
          <EditAlbumBtn />
        </div>
        <div className="upload-song-button">
          <UploadSongBtn />
        </div>
        <div className="user-delete-button-album">
          <button className="delete-album-button" onClick={handleAlbumDelete}>Delete</button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="album-detail-container">
        <div className="album-info album-info-div">
          <div className="album-info-left album-info-div">
            <img
              className="album-image-detail album-info-div"
              src={album?.previewImage}
              alt={album?.title}
            />
          </div>
          <div className="album-info-right album-info-div">
            <div className="album-info-header">
              <h1>{album?.title}</h1>
              <h2>by {album?.Artist?.username}</h2>
            </div>
            <p>{album?.description}</p>
            <div className="bottom-album-container">
              <div className="album-detail-buttons">{userInputButtons}</div>
            </div>
          </div>
        </div>
        <AlbumSongsLoader />
      </div>
    </>
  );
}
