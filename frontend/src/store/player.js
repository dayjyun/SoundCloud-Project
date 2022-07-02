const PLAY_SONG = 'player/playSong'

export const playSong = (song) => {
    return {
        type: PLAY_SONG,
        song
    }
}

let songState = {
    songs: null
}

export default function playerReducer (state = {}, action) {
    switch(action.type) {
        case PLAY_SONG:
            songState = { ...state, song: action.song}
            return songState;
        default:
            return state;
    }
}
