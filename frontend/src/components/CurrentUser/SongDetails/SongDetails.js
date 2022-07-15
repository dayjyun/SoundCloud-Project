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
  const songs = useSelector((state) => state.songs);
  const song = songs[songId];
  const user = useSelector((state) => state.session.user);
  // const [songButton, setSongButtons] = useState(false);

  // const singleSong = songs?.find((song) => song?.id === +songId);
  // useEffect(() => {
  //   if (user?.id === singleSong?.userId) {
  //     setSongButtons(true);
  //   } else {
  //     setSongButtons(false);
  //   }
  // }, []);

  useEffect(() => {
    dispatch(getSong(+songId));
  }, [dispatch]);

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
          <div className="song-info-left song-info-div">
            <img
              className="song-image-detail song-info-div"
              src={song?.previewImage}
              alt={song?.title}
            />
          </div>
          <div className="song-info-right song-info-div">
            <div className="song-info-header">
              <h1>{song?.title}</h1>
              <h2>by {song?.Artist?.username}</h2>
            </div>
            <p>{song?.description}</p>

            <div className="footer-container">
              <div className="song-detail-footer">{userInputButtons}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  // return (
  //   <>
  //     <div className="song-info-container">
  //       <div className="song-details-box">
  //         <div>
  //           <img className="song-cover-image" src={`${singleSong?.previewImage}`} />
  //         </div>
  //         <div className="song-info">
  //           <h1 className="song-desc-title">{singleSong?.title}</h1>
  //           <p className="song-desc-desc">{singleSong?.description}</p>
  //         </div>
  //       </div>
  //       {songButton && (
  //         <>
  //           <div className="qwer">
  //             <div className="edit-song-button">
  //               <EditSongBtn />
  //             </div>
  //             <div>
  //               <button className="delete-song-button" onClick={handleSongDelete}
  //               >
  //                 Delete
  //               </button>
  //             </div>
  //           </div>
  //         </>
  //       )}
  //     </div>
  //   </>
  // );
}

export default SongDetails;
