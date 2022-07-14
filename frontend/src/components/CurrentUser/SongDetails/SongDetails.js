import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteSong, getSong } from "../../../store/songReducer";
import EditSongBtn from "../Edit/EditSongBtn";
import "./SongDetails.css";

function SongDetails() {
  const { songId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const songs = Object.values(useSelector((state) => state.songs));
  const user = useSelector((state) => state.session.user);
  const singleSong = songs?.find((song) => song?.id === +songId);
  const [songButton, setSongButtons] = useState(false);

  useEffect(() => {
    if (user?.id === singleSong?.userId) {
      setSongButtons(true);
    } else {
      setSongButtons(false);
    }
  }, []);

  useEffect(() => {
    dispatch(getSong(+songId));
  }, [dispatch]);

  const handleSongDelete = (e) => {
    e.preventDefault();
    dispatch(deleteSong(+songId));
    alert("Song successfully deleted");
    history.push("/me");
  };

  return (
    <>
      <div className="song-info-container">
        <div className="song-details-box">
          <div>
            <img className="song-cover-image" src={`${singleSong?.previewImage}`} />
          </div>
          <div className="song-info">
            <h1 className="song-desc-title">{singleSong?.title}</h1>
            <p className="song-desc-desc">{singleSong?.description}</p>
          </div>
        </div>
        {songButton && (
          <>
            <div className="qwer">
              <div className="edit-song-button">
                <EditSongBtn />
              </div>
              <div>
                <button
                  className="delete-song-button"
                  onClick={handleSongDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default SongDetails;
