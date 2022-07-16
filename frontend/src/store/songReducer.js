import { csrfFetch } from "./csrf";

// type
const GET_ALL_SONGS = "songs/getAllSongs";
const GET_SONG = "songs/getSong";
const EDIT_SONG = 'songs/editSong'
const DELETE_SONG = 'songs/deleteSong';
const UPLOAD_SONG = 'songs/uploadSong'

// get all songs
const getAll = (list) => {
  return {
    type: GET_ALL_SONGS,
    list,
  };
};

export const getAllSongs = () => async (dispatch) => {
  const allSongs = await csrfFetch("/api/songs");

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
  const song = await csrfFetch(`/api/songs/${songId}`);

  if (song.ok) {
    const res = await song.json();
    dispatch(returnSong(res));
  }
};

// edit song
const updateSong = (song) => {
  return {
    type: EDIT_SONG,
    song
  }
}

export const editSong = (songData) => async(dispatch) => {
  const song = await csrfFetch(`/api/songs/${songData.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(songData)
  })

  if(song.ok) {
    const res = await song.json()
    dispatch(updateSong(res))
  }
}

// upload song
const createSong = song => {
  return {
    type: UPLOAD_SONG,
    song
  }
}

export const uploadSong = (songDetails, albumId) => async (dispatch) => {
  const { title, description, url, imageUrl } = songDetails;
  const formData = new FormData();

  formData.append('title', title);
  formData.append('description', description);

  if(url) formData.append('url', url)
  if(imageUrl) formData.append('imageUrl', imageUrl)

  const res = await csrfFetch(`/api/albums/${albumId}`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });

  const data = await res.json();
  dispatch(createSong(data))
};

// export const uploadSong = (SongDetails, albumId) => async (dispatch) => {
//   const res = await csrfFetch(`/albums/${albumId}`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(SongDetails),
//   });

//   if (res.ok) {
//     const newSong = await res.json();
//     dispatch(createSong(newSong));
//     return newSong;
//   }
// };

// delete song
const removeSong = (id) => {
  return {
    type: DELETE_SONG,
    id
  }
}

export const deleteSong = (songId) => async (dispatch) => {
  const song = await csrfFetch(`/api/songs/${songId}`, {
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

    case UPLOAD_SONG:
      return {
        ...state,
        [action.song.id]: action.song
      }

    default:
      return state;
  }
}
