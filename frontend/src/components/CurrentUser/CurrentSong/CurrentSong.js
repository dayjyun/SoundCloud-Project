import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { playSong } from "../../../store/playerReducer";
import { getAllSongs } from "../../../store/songReducer";

import "react-h5-audio-player/lib/styles.css";
import "./CurrentSong.css";

export default function CurrentSong() {
  const dispatch = useDispatch();
  const songs = Object.values(useSelector((state) => state.songs));
  const user = useSelector((state) => state.session.user);
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

  return (
    <>
      <div>
        <h1 className="your-songs-text">Your Songs</h1>
        <div className="current-songs-wrapper">
          <div className="current-songs-wrap">
            {songs
              .filter((song) => song?.userId === user?.id)
              .map((song) => (
                <li key={song.id} className="current-song-card">
                  <div
                    className="cs-card-img-wrapper"
                    style={{
                      backgroundImage: "url(" + song.previewImage + ")",
                    }}
                  >
                    <div
                      className="cs-play-action-overlay"
                      onClick={() => songBtn(song)}
                    >
                      <button
                        className="play-button-currentSong"
                        onClick={() => songBtn(song)}
                      >
                        <i className={playIcon} onClick={handlePlayIcon}></i>
                      </button>
                    </div>
                  </div>
                  <Link
                    className="current-song-link-text"
                    to={{ pathname: `/songs/${song?.id}` }}
                  >
                    <p className="current-song-title">{song?.title}</p>
                  </Link>
                </li>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
