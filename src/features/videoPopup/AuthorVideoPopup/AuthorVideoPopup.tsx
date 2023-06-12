import { FC, useEffect, useRef } from "react";
import { Author } from "@/features/catalog/types";
import styles from "./AuthorVideoPopup.module.scss";

type AuthorVideoPopupProps = {
  author: Author;
  isCalling: boolean;
  onClick: () => void;
};

export const AuthorVideoPopup: FC<AuthorVideoPopupProps> = ({
  author,
  isCalling,
  onClick,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef && isCalling) {
      // @ts-ignore
      videoRef.current.play();
    }
  }, [isCalling, videoRef]);

  return (
    <div className={styles.AuthorVideoPopup} onClick={onClick}>
      {author && (
        <video
          ref={videoRef}
          src={author.videoPosterUrl}
          poster={author.posterUrl}
          muted={!isCalling}
          loop
          className={styles.video}
        />
      )}
    </div>
  );
};
