import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { playSong } from "../../../../store/playerReducer";
import { getAllSongs } from "../../../../store/songReducer";

import "react-h5-audio-player/lib/styles.css";
import "./AllSongsLoader.css";

export default function AllSongsLoader() {
  const dispatch = useDispatch();
  const songs = Object.values(useSelector((state) => state.songs));
  const [playIcon, setPlayIcon] = useState("fas fa-play");

  useEffect(() => {
    dispatch(getAllSongs());
  }, [dispatch]);

  const songBtn = useCallback(
    (song) => {
      dispatch(playSong(song));
    },
    [dispatch]
  );

  const handlePlayIcon = () => {
    playIcon === "fas fa-play"
      ? setPlayIcon("fas fa-pause")
      : setPlayIcon("fas fa-play");
  };

  if (!songs) {
    return <h2>It's a little quiet over here</h2>;
  }

  return (
    <>
      <div className="all-songs-wrapper">
        <div className="songs-wrap">
          {songs.map((song) => (
            <li key={song?.id} className="song-card">
              <div
                className="card-img-wrapper"
                style={{ backgroundImage: "url(" + song?.previewImage + ")" }}
              >
                <div
                  className="play-action-overlay"
                  onClick={() => songBtn(song)}
                >
                  <button
                    className="play-button-allSongs"
                    onClick={() => songBtn(song)}
                  >
                    <i className={playIcon} onClick={handlePlayIcon}></i>
                  </button>
                </div>
              </div>
              <Link
                className="song-link-text"
                to={{ pathname: `/songs/${song?.id}` }}
              >
                <p className="song-title">{song?.title}</p>
              </Link>
            </li>
          ))}
        </div>
      </div>
    </>
  );
}
