import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "react-h5-audio-player/lib/styles.css";

import { playSong } from "../../../../store/player";
import { getAllSongs } from "../../../../store/song";
import Player from "./Player/Player";

import "./AllSongsLoader.css";

export default function AllSongsLoader() {
  const dispatch = useDispatch();
  const songs = Object.values(useSelector((state) => state.songs));
  const [currentSong, setCurrentSong] = useState(null);

  useEffect(() => {
    dispatch(getAllSongs());
  }, [dispatch]);

  const songBtn = useCallback(song => {
      dispatch(playSong(song));
    }, [dispatch]);

  if (!songs) {
    return <h2>It's a little quiet over here</h2>;
  }

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
      <footer className="player-box">
        <div>
          <Player currentSong={currentSong} />
        </div>
      </footer>
    </div>
  );
}
