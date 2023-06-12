import { FC, useCallback, useEffect, useRef } from "react";
import movie from "@/assets/video/movie.webm";
import poster from "@/assets/video/poster.png";
import styles from "./FakeVideo.module.scss";

type FakeVideoProps = {
  isCalling?: boolean;
};

export const FakeVideo: FC<FakeVideoProps> = ({ isCalling = false }) => {
  const video = useRef<any>(null);

  const handleActive = useCallback((isActive: boolean) => {
    isActive ? video.current.play() : video.current.pause();
  }, []);

  useEffect(() => {
    handleActive(isCalling);
  }, [isCalling]);

  return (
    <video
      src={movie}
      poster={poster}
      muted
      loop
      className={styles.video}
      ref={video}
    />
  );
};
