import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { playSong } from "../../../store/playerReducer";
import { getAllSongs } from "../../../store/songReducer";
import { getSong } from "../../../store/songReducer";

export default function UserSongs() {
  const { songId } = useParams()
  const dispatch = useDispatch()
  const songs = useSelector(state => state.songs[songId])
  const user = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(getSong(songId))
  }, [dispatch])

  if(songs?.userId === user?.id){
    
  }

  return (
    <div>/src/components/CurrentUser/UserSongs/index.js</div>
  )
}
