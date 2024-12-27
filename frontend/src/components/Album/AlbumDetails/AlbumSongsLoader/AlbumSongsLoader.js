import { useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import "./AlbumSongsLoader.css";

export default function AlbumSongsLoader() {
  const { albumId } = useParams();
  const history = useHistory();
  const songs = Object.values(useSelector((state) => state.songs));
  const albumSong = songs.filter((song) => song.albumId === +albumId);

  return (
    <>
        <h1>Album Songs</h1>
        <div className="album-songs-container">
          {albumSong.map((song) => (
            <button
              onClick={(e) => history.push(`/songs/${song.id}`)}
              key={song.id}
              className="album-songs-list"
            >
              <Link to={`/songs/${song.id}`}>
                <div className="album-songs-title">{song.title}</div>
              </Link>
            </button>
          ))}
        </div>
    </>
  );
}
