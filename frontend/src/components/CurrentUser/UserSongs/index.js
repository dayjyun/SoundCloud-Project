import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { playSong } from "../../../store/playerReducer";
import { getAllSongs } from "../../../store/songReducer";
import { getSong } from "../../../store/songReducer";

export default function UserSongs() {
  const { songId } = useParams();
  // const songs = Object.values(useSelector(state => state))
  // const dispatch = useDispatch();
  const song = useSelector(state => console.log("HERE" +  state.songs[songId]));

  // const user = useSelector(state => state.session.user);
  // const [currentSong, setCurrentSong] = useState(null);
  // const [isPlaying, setIsPlaying] = useState(false);

  // useEffect(() => {
  //     dispatch(getSong(songId))
  // }, [dispatch])

  // if(song?.userId === song?.id) {

  // }

  // return (
  //   <div>
  //     <ul>
  //       {tracks.map((track) => (
  //         <li key={track.id}>{track.title}</li>
  //       ))}
  //     </ul>
  //   </div>
  // );


  // useEffect(() => {
  //   dispatch(getAllSongs());
  // }, [dispatch]);

  // const songBtn = useCallback((song) => {
  //     dispatch(playSong(song));
  //   }, [dispatch]);

  // return (
  //   <div className="all-songs-wrapper">
  //     <div>
  //       {userSongs.map((song) => (
  //         <li key={song.id} className="song-card">
  //           <div
  //             className="card-img-wrapper"
  //             style={{ backgroundImage: "url(" + song.previewImage + ")" }}
  //           >
  //             <div className="play-action-overlay">
  //               <button
  //                 className="play-button-allsongs"
  //                 onClick={() => songBtn(song)}
  //               >
  //                 <i className="fas fa-play"></i>
  //               </button>
  //             </div>
  //           </div>
  //           <Link
  //             className="song-link-text"
  //             to={{ pathname: `/songs/${song.id}` }}
  //           >
  //             <p>{song.title}</p>
  //           </Link>
  //         </li>
  //       ))}
  //     </div>
  //   </div>
  // );
  // const userSongs = songs.find((song) => song.id === songId);


  return (
    <div className="all-songs-wrapper">
      <h1>Here</h1>
    </div>
  );
}
