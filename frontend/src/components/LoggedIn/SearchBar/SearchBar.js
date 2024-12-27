import "./SearchBar.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function SearchBar() {
  const songs = useSelector((state) => Object.values(state.songs));
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState("");

  const songResults = songs.filter((song) => {
    return (
      song.Artist?.username?.toLowerCase().includes(search.toLowerCase()) ||
      song.title.toLowerCase().includes(search.toLowerCase())
    );
  });

  const returnResults = songResults.map((song) => {
    return (
      <Link
        to={`/songs/${song.id}`}
        key={song.id}
        onClick={() => setSearch("")}
        className="search-result-link"
      >
        <div className="search-result-text">
          <div>{song.title}</div>
        </div>
      </Link>
    );
  });

  return (
    <div className="search-bar-container">
      <form>
        <div className="search-bar">
          <input
            className="search-bar-input"
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClick={() => setSearchResults("results-active")}
            onBlur={() => setSearchResults("")}
          />
        </div>
      </form>
      <div className={`search-results-box ${searchResults}`}>
        {returnResults}
      </div>
    </div>
  );
}
