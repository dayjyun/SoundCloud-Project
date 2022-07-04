import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { playSong } from "../../../store/player";
import { getAllSongs } from "../../../store/song";

import { useParams } from "react-router-dom";
import { getSong } from "../../../store/song";

export default function UserSongs() {
  const { songId } = useParams();
  // const dispatch = useDispatch();
  // const tracks = Object.values(useSelector((state) => state.songs));
  // const song = useSelector(state => state.songs[songId]);
  // const user = useSelector(state => state.session.user);

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

  const dispatch = useDispatch();
  const songs = Object.values(useSelector((state) => state.songs));
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    dispatch(getAllSongs());
  }, [dispatch]);

  const songBtn = useCallback(
    (song) => {
      dispatch(playSong(song));
    },
    [dispatch]
  );

  return (
    <div className="all-songs-wrapper">
      <div>
        {songs.map((song) => (
          <li key={song.id} className="song-card">
            <div
              className="card-img-wrapper"
              style={{ backgroundImage: "url(" + song.previewImage + ")" }}
            >
              <div className="play-action-overlay">
                <button
                  className="play-button-allsongs"
                  onClick={() => songBtn(song)}
                >
                  <i className="fas fa-play"></i>
                </button>
              </div>
            </div>
            <Link
              className="song-link-text"
              to={{ pathname: `/songs/${song.id}` }}
            >
              <p>{song.title}</p>
            </Link>
          </li>
        ))}
      </div>
    </div>
  );
}
