import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useSelector } from "react-redux";
import './Player.css'

export default function Player() {
    const song = useSelector((state) => state.player.song)

    return (
      <div className="media-player">
        <AudioPlayer
          src={song?.url}
          header={song?.title}
          showSkipControls={true}
          showJumpControls={false}
          showFilledVolume={true}
        />
      </div>
    );
}
