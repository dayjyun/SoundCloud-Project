import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { deleteSong, getSong } from "../../../store/songReducer";
import EditSongBtn from "../Edit/EditSongBtn";
import "./SongDetails.css";

import "react-h5-audio-player/lib/styles.css";
import { playSong } from "../../../store/playerReducer";

function SongDetails() {
  const { songId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);
  const songs = useSelector((state) => state.songs);
  const song = songs[songId];
  const albums = Object.values(useSelector((state) => state.albums));
  const album = albums.filter((album) => album.id === song.albumId);

  useEffect(() => {
    dispatch(getSong(+songId));
  }, [dispatch, songId]);

  const songBtn = useCallback(song => {
    dispatch(playSong(song))
  }, [dispatch])

  const handleSongDelete = (e) => {
    e.preventDefault();
    dispatch(deleteSong(+songId));
    alert("Song successfully deleted");
    history.push("/me");
  };

  let userInputButtons;

  if (song?.userId === user?.id) {
    userInputButtons = (
      <div className="user-song-buttons">
        <div className="edit-song-button">
          <EditSongBtn />
        </div>
        <div className="user-delete-button">
          <button className="delete-song-button" onClick={handleSongDelete}>
            Delete
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="song-detail-container">
        <div className="song-info song-info-div">
          <div className="song-details-left song-details-div">
            <div></div>
            <img
              className="song-image-detail song-info-div"
              src={song?.previewImage}
              alt={song?.title}
            />
            <div
              className="sd-play-action-overlay"
              onClick={() => songBtn(song)}
            >
              <button
                className="play-button-currentSong"
                onClick={() => songBtn(song)}
              >
                <i className={"fas fa-play"}></i>
              </button>
            </div>
          </div>
          <div className="song-info-right song-info-div">
            <div className="song-info-header">
              <h1>{song?.title}</h1>
              <h2>by {song?.Artist?.username}</h2>
              {song?.albumId && (
                <h2 className="song-details-album-title">
                  on{" "}
                  <Link to={`/albums/${album[0]?.id}`}>{album[0]?.title}</Link>
                </h2>
              )}
            </div>
            <p>{song?.description}</p>
            <div className="bottom-song-container">
              <div className="song-detail-buttons">{userInputButtons}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SongDetails;
