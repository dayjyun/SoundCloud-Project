import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllAlbums } from "../../../../store/albumReducer";
import "./AlbumCard.css";

export default function AlbumCard() {
  const dispatch = useDispatch();
  const albums = Object.values(useSelector((state) => state.albums));
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getAllAlbums());
  }, [dispatch]);

  return (
    <div>
      <h1 className="your-albums-text">Your Albums</h1>
      <div className="current-albums-wrapper">
        <div className="current-albums-wrap">
          {albums
            .filter((album) => album?.userId === user?.id)
            .map((album) => (
              <li key={album.id} className="current-album-card">
                <div
                  className="ca-card-img-wrapper"
                  style={{ backgroundImage: "url(" + album.previewImage + ")" }}
                ></div>
                <Link
                  className="current-album-link-text"
                  to={{ pathname: `/albums/${album?.id}` }}
                >
                  <p className="current-album-title">{album?.title}</p>
                </Link>
              </li>
            ))}
        </div>
      </div>
    </div>
  );
}
