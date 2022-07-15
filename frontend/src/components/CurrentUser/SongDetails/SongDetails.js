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
  // const singleSong = songs?.find((song) => song?.id === +songId);
  const [songButton, setSongButtons] = useState(false);

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

  let userManipulateButton;

  if (song?.userId === user?.id) {
    userManipulateButton = (
      <div className="user-buttons">
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
        <div className="song-detail-body song-detail-container-div">
          <div className="song-detail-body-left song-detail-container-div">
            <img
              className="song-preview-image song-detail-container-div"
              src={song?.previewImage}
              alt={song?.title}
            />
          </div>
          <div className="song-detail-body-right song-detail-container-div">
            <h1>{song?.title}</h1>
            {/* <h2>Artist: {song?.Artist?.username}</h2> */}
            <p>{song?.description}</p>

            <div className="footer-container">
              <div className="song-detail-footer">{userManipulateButton}</div>
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
