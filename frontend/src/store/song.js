import { csrfFetch } from "./csrf";

// type
const GET_ALL_SONGS = "songs/getAllSongs";

const get = (allSongs) => {
  return {
    type: GET_ALL_SONGS,
    allSongs,
  };
};

export const getAllSongs = () => async (dispatch) => {
  const allSongs = await csrfFetch("/songs");

  if (allSongs.ok) {
    const res = await allSongs.json();
    dispatch(get(res.Songs));
  }
};

// reducer
export default function songReducer(state = {}, action) {
  switch (action.type) {
    case GET_ALL_SONGS:
      const allSongsState = { ...state };
      action.allSongs.forEach((song) => {
        allSongsState[song.id] = song;
      });
      return allSongsState;
    default:
      return state;
  }
}
