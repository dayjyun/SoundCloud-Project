import { csrfFetch } from "./csrf";

// type
const GET_ALL_ALBUMS = "albums/getAllAlbums";
const GET_ALBUM = "albums/getAlbum";
const CREATE_ALBUM = 'albums/createAlbum';
const EDIT_ALBUM = "albums/editAlbum";
const DELETE_ALBUM = "albums/deleteAlbum";

// get all albums
const getAll = (list) => {
  return {
    type: GET_ALL_ALBUMS,
    list,
  };
};

export const getAllAlbums = () => async (dispatch) => {
  const allAlbums = await csrfFetch("/albums");

  if (allAlbums.ok) {
    const res = await allAlbums.json();
    dispatch(getAll(res.Albums));
  }
};

// get current album
const returnAlbum = (album) => {
  return {
    type: GET_ALBUM,
    album,
  };
};

export const getAlbum = (albumId) => async (dispatch) => {
  const album = await csrfFetch(`/albums/${albumId}`);

  if (album.ok) {
    const res = await album.json();
    dispatch(returnAlbum(res));
  }
};

// create album
const addAlbum = (album) => {
  return {
    type: CREATE_ALBUM,
    album,
  }
}

export const createAlbum = (albumData) => async(dispatch) => {
  const newAlbum = await csrfFetch('/albums', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(albumData)
  })

  if(newAlbum.ok) {
    const res = await newAlbum.json();
    dispatch(addAlbum(res))
    return res;
  }
}

// update album
const updateAlbum = (album) => {
  return {
    type: EDIT_ALBUM,
    album,
  };
};

export const editAlbum = (data) => async (dispatch) => {
  const album = await csrfFetch(`/albums/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (album.ok) {
    const res = await album.json();
    dispatch(updateAlbum(res));
  }
};

// delete album
const removeAlbum = (id) => {
  return {
    type: DELETE_ALBUM,
    id,
  };
};

export const deleteAlbum = (albumId) => async (dispatch) => {
  const album = await csrfFetch(`/albums/${albumId}`, {
    method: "DELETE",
  });

  if (album.ok) {
    dispatch(removeAlbum(albumId));
  }
};

let initialState = {};

// reducer
export default function albumReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_ALBUMS:
      initialState = { ...state };
      action.list.forEach((album) => {
        initialState[album.id] = album;
      });
      return initialState;

    case GET_ALBUM:
      return { ...state, [action.album.id]: action.album };

    case EDIT_ALBUM:
      return { ...state, [action.album.id]: action.album };

    case DELETE_ALBUM:
      const removeAlbumState = { ...state };
      delete removeAlbumState[action.id];
      return removeAlbumState;

    default:
      return state;
  }
}
