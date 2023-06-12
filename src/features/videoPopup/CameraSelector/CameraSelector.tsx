import { FC } from "react";
import { LocalVideoTrack } from "livekit-client";
import { VideoSelectButton } from "@livekit/react-components";
import styles from "./CameraSelector.module.scss";

type CameraSelectorProps = {
  videoTrack?: LocalVideoTrack;
  onToggleVideo: () => void;
  onSelectVideoDevice: (device: MediaDeviceInfo) => void;
};

export const CameraSelector: FC<CameraSelectorProps> = ({
  videoTrack,
  onToggleVideo,
  onSelectVideoDevice,
}) => {
  return (
    <div className={styles.selector}>
      <VideoSelectButton
        isEnabled={videoTrack !== undefined}
        onClick={onToggleVideo}
        onSourceSelected={onSelectVideoDevice}
      />
    </div>
  );
};
