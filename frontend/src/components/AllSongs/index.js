import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllSongs } from "../../store/song"

export default function AllSongs() {
    const dispatch = useDispatch()
    const songs = Object.values(useSelector((state) => (state.songs)));

    useEffect(() => {
        dispatch(getAllSongs())
    }, [dispatch])

    if(!songs) {
        return <h2>Seems a little quiet over here</h2>;
    }

    return (
        <div>Songs</div>
    )
}
