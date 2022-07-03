import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getSong } from "../../../store/song"

export default function UserSongs() {
    const { songId } = useParams();
    const dispatch = useDispatch();
    const tracks = Object.values(useSelector((state) => state.songs));
    const song = useSelector(state => state.songs[songId]);
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getSong(songId))
    }, [dispatch])

    if(song?.userId === song?.id) {
        
    }

    return (
      <div>
        <ul>
          {tracks.map((track) => (
            <li key={track.id}>{track.title}</li>
          ))}
        </ul>
      </div>
    );
}
