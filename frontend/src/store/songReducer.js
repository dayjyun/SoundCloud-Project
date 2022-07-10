import { csrfFetch } from "./csrf";

// type
const GET_ALL_SONGS = "songs/getAllSongs";
const GET_USER_SONGS = 'songs/getUserSongs'
const GET_SONG = "songs/getSong";
const EDIT_SONG = 'songs/editSong'
const DELETE_SONG = 'songs/deleteSong';

// get all songs
const getAll = (list) => {
  return {
    type: GET_ALL_SONGS,
    list,
  };
};

export const getAllSongs = () => async (dispatch) => {
  const allSongs = await csrfFetch("/songs");

  if (allSongs.ok) {
    const res = await allSongs.json();
    dispatch(getAll(res.Songs));
  }
};


// get current song
const returnSong = (song) => {
  return {
    type: GET_SONG,
    song,
  };
};

export const getSong = (songId) => async (dispatch) => {
  const song = await csrfFetch(`/songs/${songId}`);

  if (song.ok) {
    const res = await song.json();
    dispatch(returnSong(res));
  }
};

// update song
const updateSong = (song) => {
  return {
    type: EDIT_SONG,
    song
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


// delete song
const removeSong = (id) => {
  return {
    type: DELETE_SONG,
    id
  }
}

export const deleteSong = (songId) => async (dispatch) => {
  const song = await csrfFetch(`/songs/${songId}`, {
    method: "DELETE",
  });

  if (song.ok) {
    dispatch(removeSong(songId));
  }
};

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
        [action.song.id]: action.song,
      };

    case EDIT_SONG:
      return {
        ...state,
        [action.song.id]: action.song,
      };

    case DELETE_SONG:
      const removeSongState = { ...state };
      delete removeSongState[action.id];
      return removeSongState;

    default:
      return state;
  }
}
