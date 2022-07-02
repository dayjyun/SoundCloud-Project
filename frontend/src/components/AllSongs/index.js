import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom'
import { getAllSongs } from "../../store/song";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { playSong } from "../../store/player";
// import Player from "../Player";
import './AllSongs.css'

export default function AllSongs() {
  const dispatch = useDispatch();
  const songs = Object.values(useSelector((state) => state.songs));
  const [currentSong, setCurrentSong] = useState(null)

  useEffect(() => {
    dispatch(getAllSongs());
  }, [dispatch]);

  const songBtn = useCallback(song => {
    dispatch(playSong(song))
  }, [dispatch])

  if (!songs) {
    return <h2>Seems a little quiet over here</h2>;
  }

  return (
    <div className="all-songs-wrapper">
      <h2>All Songs</h2>
      <div className="player-box">
        {/* <Player currentSong={currentSong} /> */}
        {/* <Player/> */}
      </div>
      <div>
        {songs.map((song) => (
          <li key={song.id} className="song-card">
            <div
              className="card-img-wrapper"
              style={{ backgroundImage: "url(" + song.previewImage + ")" }}
            >
              <div className="play-action-overlay">
                {/* <button
                  className="play-button-allsongs"
                  onClick={() => SongBtn(song)}
                >
                  <i className="fas fa-play"></i>
                </button> */}
              </div>
            </div>
            <NavLink
              className="song-link-text"
              to={{ pathname: `/songs/${song.id}` }}
            >
              <p>{song.title}</p>
            </NavLink>
          </li>
        ))}
      </div>
    </div>
  );
}
