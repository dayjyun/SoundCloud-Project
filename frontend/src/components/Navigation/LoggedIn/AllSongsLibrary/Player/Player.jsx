import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useSelector } from "react-redux";

export default function Player() {
    const song = useSelector((state) => state.player.song)

    return (
      <div>
        <AudioPlayer
          src={song?.url}
          header={song?.title}
          showSkipControls={true}
        />
      </div>
    );
}
