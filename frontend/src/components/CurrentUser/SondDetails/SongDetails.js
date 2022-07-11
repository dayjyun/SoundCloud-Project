import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteSong, getSong } from "../../../store/songReducer";
import EditSongBtn from "../CurrentSong/EditSong/EditSongBtn";
import "./SongDetails.css";

function SongDetails() {
  const { songId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const songs = Object.values(useSelector((state) => state.songs));
  const user = useSelector((state) => state.session.user);
  const singleSong = songs?.find((song) => song.id === +songId);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    if (user?.id === singleSong?.userId) {
      setShowButtons(true);
    } else {
      setShowButtons(false);
    }
  }, []);

  useEffect(() => {
    dispatch(getSong(+songId));
  }, [dispatch]);

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteSong(+songId));
    alert("Song successfully deleted");
    history.push("/me");
  };

  return (
    <>
      <div className="song-info-container">
        <div className="song-album-img-box">
          <img src={`${singleSong?.previewImage}`} />
        </div>
        <div className="song-description">
          <h1 className="song-desc-title">{singleSong?.title}</h1>
          <h3 className="song-desc-desc">{singleSong?.description}</h3>
          <div>
            {showButtons && (
              <>
                <div className="edit-buttons">
                  <EditSongBtn />
                  <button className="delete-button" onClick={handleDelete}>
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SongDetails;
