import { FC, ReactElement } from "react";
import { LocalVideoTrack } from "livekit-client";
import { VideoRenderer } from "@livekit/react-core";
import cn from "classnames";
// import { Avatar } from "@/ui/Avatar/Avatar";
// import photoUrl from "@/assets/photos/user-photo.jpg";
import styles from "./ClientVideoPopup.module.scss";

type ClientVideoPopupProps = {
  videoTrack?: LocalVideoTrack;
  isCompact: boolean;
  isCameraOn: boolean;
  onClick: () => void;
};

export const ClientVideoPopup: FC<ClientVideoPopupProps> = ({
  videoTrack,
  isCompact,
  isCameraOn = true,
  onClick,
}) => {
  let videoElement: ReactElement;
  if (videoTrack) {
    videoElement = <VideoRenderer track={videoTrack} isLocal={true} />;
  } else {
    videoElement = <div className="placeholder" />;
  }

  return (
    <div
      className={cn(styles.client, { [styles.compact]: isCompact })}
      onClick={onClick}
    >
      {isCameraOn ? (
        <div className={styles.video}>{videoElement}</div>
      ) : (
        <div className={styles.avatar}>
          {/* <Avatar photoUrl={photoUrl} /> */}
        </div>
      )}
    </div>
  );
};
