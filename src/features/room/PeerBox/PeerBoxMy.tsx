import { FC, useRef } from "react";
import cn from "classnames";
import { useEventListener } from "@huddle01/react";

import styles from "./PeerBox.module.scss";

type PeerBoxMyProps = {
  displayName: string;
  camStream: MediaStream;
};

export const PeerBoxMy: FC<PeerBoxMyProps> = ({ displayName, camStream }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEventListener("lobby:cam-on", () => {
    if (camStream && videoRef.current) videoRef.current.srcObject = camStream;
  });

  return (
    <div className={cn(styles.preview, styles.my)}>
      <video ref={videoRef} autoPlay muted className={styles.video} />
      <div className={styles.user}>
        <div className={styles.name}>{displayName}</div>
      </div>
    </div>
  );
};
