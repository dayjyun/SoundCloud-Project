import { csrfFetch } from "./csrf";

// type
const GET_SONGS = "songs/getSongs";

const load = (list) => {
  return {
    type: GET_SONGS,
    list,
  };
};

export const getSongs = () => async (dispatch) => {
  const allSongs = await csrfFetch("/songs");

  if (allSongs.ok) {
    const res = await allSongs.json();
    dispatch(load(res.Songs));
  }
};

export default function songReducer(state = {}, action) {
  switch (action.type) {
    case GET_SONGS:
      const allSongsState = { ...state };
      action.list.forEach((song) => {
        allSongsState[song.id] = song;
      });
      return allSongsState;
    default:
      return state;
  }
}
