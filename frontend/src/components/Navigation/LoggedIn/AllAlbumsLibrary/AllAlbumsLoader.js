import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getAllAlbums } from "../../../../store/albumReducer";
import "./AllAlbumsLoader.css";

export default function AllAlbumsLoader() {
  const history = useHistory()
  const dispatch = useDispatch();
  const albums = Object.values(useSelector((state) => state.albums));

  useEffect(() => {
    dispatch(getAllAlbums());
  }, [dispatch]);

  return (
    <>
      <div className="all-albums-wrapper">
        <div className="albums-wrap">
          {albums.map((album) => (
            <li key={album.id} className="album-card">
              <div
                onClick={() => {
                  history.push(`/albums/${album.id}`);
                 }}
                className="album-img-wrapper"
                style={{ backgroundImage: "url(" + album.previewImage + ")"
              }}
              >
              </div>
              <Link
                className="album-link-text"
                exact
                to={{ pathname: `/albums/${album.id}` }}
              >
                <p className="album-title">{album.title}</p>
              </Link>
            </li>
          ))}
        </div>
      </div>
    </>
  );
}
