import { csrfFetch } from "./csrf";

// type
const GET_ALL_SONGS = "songs/getAllSongs";
const GET_SONG = "songs/getSong";
const DELETE_SONG = 'songs/deleteSong';
const EDIT_SONG = 'songs/editSong'

const get = (list) => {
  return {
    type: GET_ALL_SONGS,
    list,
  };
};

const returnSong = (song) => {
  return {
    type: GET_SONG,
    song,
  };
};

const removeSong = (id) => {
  return {
    type: DELETE_SONG,
    id
  }
}

const updateSong = (song) => {
  return {
    type: EDIT_SONG,
    song
  }
}

export const getAllSongs = () => async (dispatch) => {
  const allSongs = await csrfFetch("/songs");

  if (allSongs.ok) {
    const res = await allSongs.json();
    dispatch(get(res.Songs));
  }
};

export const getSong = (songId) => async (dispatch) => {
  const song = await csrfFetch(`/songs/${songId}`);

  if (song.ok) {
    const res = await song.json();
    dispatch(returnSong(res));
  }
};

export const deleteSong = (id) => async(dispatch) => {
  const deleteSong = await csrfFetch(`/songs/${id}`, {
    method: "DELETE"
  })

  if(deleteSong.ok) {
    dispatch(removeSong(id))
  }
}

export const editSong = (data) => async(dispatch) => {
  const song = await csrfFetch(`/songs/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  if(song.ok) {
    const res = await song.json()
    dispatch(updateSong(res))
  }
}

let initialState = {};

// reducer
export default function songReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_SONGS:
      initialState = { ...state };
      action.list.forEach((song) => {
        initialState[song.id] = song;
      });
      return initialState;
    case GET_SONG:
      return {
        ...state,
        [action.song.id]: action.song
      }
    case DELETE_SONG:
      const removeSongState = { ...state }
      delete removeSongState[action.id]
      return removeSongState
    case EDIT_SONG:
      return {
        ...state,
        [action.song.id]: action.song
      }
    default:
      return state;
  }
}
