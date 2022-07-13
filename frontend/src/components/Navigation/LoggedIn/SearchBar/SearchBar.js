import "./SearchBar.css";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function SearchBar() {
  const songs = Object.values(useSelector((state) => state.songs));
  const [searchTerm, setSearchTerm] = useState();

  return (
    <>
      <div className="searchBar">
        <input className="inside-search-bar" type="text" placeholder="Search" />
        {/* <div className="song-title-results">
          {songs.map((song) => (
            <div className="search-song-title" key={song.id}>
              <p>{song.title}</p>
            </div>
          ))}
        </div> */}
      </div>
    </>
  );
}
