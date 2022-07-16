import "./SearchBar.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function SearchBar() {
  const songs = useSelector((state) => Object.values(state.songs));
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState("");

  const activeResults = songs.filter((song) => {
    return (
      song.Artist?.username?.toLowerCase().includes(search.toLowerCase()) ||
      song.title.toLowerCase().includes(search.toLowerCase())
    );
  });

  const listResults = activeResults.map((song) => {
    return (
      <Link
        to={`/songs/${song.id}`}
        key={song.id}
        onClick={() => setSearch("")}
        className="search-result-link"
      >
        <div className="search-result-text">
          <div className="search-result-li-title">{song.title}</div>
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
      <div className={`search-results ${searchResults}`}>{listResults}</div>
    </div>
  );
}

// export default function SearchBar() {
//   const songs = Object.values(useSelector((state) => state.songs));
//   const [searchText, setSearchText] = useState();
//   const [results, setResults] = useState();

//   const songsFilter = songs.filter((song) => {
//     return (
//       song.title.toLowerCase().includes(searchText.toLowerCase())
//     );
//   });

//   const searchResults = songsFilter.map((song) => {
//     return (
//       <Link
//         to={`/songs/:song.id`}
//         key={song.id}
//         onClick={setSearchText}
//         className="search-result-link"
//       >
//         <div className="search-results-li">
//           <div className="search-results-li-title">{song.title}</div>
//         </div>
//       </Link>
//     );
//   });

//   return (
//     <div className="search-bar-container">
//       <form className="search-bar-form">
//         <div className="search-bar">
//           <input
//             type="text"
//             placeholder="Search"
//             value={searchText}
//             onChange={(e) => setSearchText(e.target.value)}
//             onClick={(e) => setResults("results-active")}
//             onBlur={(e) => setResults("")}
//           />
//         </div>
//       </form>
//       <div className={`serach-results-${results}`}>{searchResults}</div>
//     </div>
//   );
// }

// return (
//   <>
//     <div className="searchBar">
//       <input className="inside-search-bar" type="text" placeholder="Search" />
//       {/* <div className="song-title-results">
//         {songs.map((song) => (
//           <div className="search-song-title" key={song.id}>
//             <p>{song.title}</p>
//           </div>
//         ))}
//       </div> */}
//     </div>
//   </>
// );
