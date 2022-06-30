import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSongs } from "../../store/song"

export default function AllSongs() {
    const dispatch = useDispatch()
    const songs = useSelector((state) => Object.values(state.songs));

    useEffect(() => {
        dispatch(getSongs())
    }, [dispatch])

    if(!songs) {
        return <h2>Seems a little quiet over here</h2>;
    }

    return (
        <div>Songs</div>
    )
}
