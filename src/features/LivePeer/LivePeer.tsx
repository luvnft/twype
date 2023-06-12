import { FC } from "react";
import { Player } from "@livepeer/react";
import poster from "@/assets/video/poster.png";
// import styles from "./LivePeer.module.scss";

type LivePeerProps = {};

const playbackId = "f5eese9wwl88k4g8";

export const LivePeer: FC<LivePeerProps> = () => {
  return (
    <Player
      title="Waterfalls"
      playbackId={playbackId}
      poster={<img src={poster} />}
    />
  );
};
