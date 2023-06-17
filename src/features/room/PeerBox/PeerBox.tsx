import { FC } from "react";
import { Audio, Video } from "@huddle01/react/components";
import cn from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophoneLinesSlash } from "@fortawesome/free-solid-svg-icons";
import Avatar, { genConfig } from "react-nice-avatar";

import styles from "./PeerBox.module.scss";

type PeerBoxProps = {
  id: string;
  role: string;
  mic: MediaStreamTrack;
  cam: MediaStreamTrack;
  displayName: string;
  isActive: boolean;
  onClick: (id: string) => void;
};

const avatarConfig = genConfig({ sex: "man", hairStyle: "mohawk" });

export const PeerBox: FC<PeerBoxProps> = ({
  id,
  role,
  mic,
  cam,
  isActive,
  displayName,
  onClick,
}) => {
  return (
    <div
      className={cn(styles.preview, {
        [styles.previewMuted]: !cam?.enabled,
        [styles.active]: isActive,
      })}
      onClick={() => onClick(id)}
    >
      {cam?.enabled && (
        <Video peerId={id} track={cam} debug className={styles.video} />
      )}
      {mic && <Audio peerId={id} track={mic} className={styles.audio} />}
      <div className={styles.user}>
        {!cam?.enabled && (
          <div className={styles.userpic}>
            <Avatar className={styles.avatar} {...avatarConfig} />
          </div>
        )}
        <div className={styles.name}>
          {displayName} ({role})
        </div>
      </div>
      {!mic?.enabled && (
        <div className={styles.muted}>
          <FontAwesomeIcon icon={faMicrophoneLinesSlash} />
        </div>
      )}
    </div>
  );
};
