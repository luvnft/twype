import { FC, useCallback, useState } from "react";
import intervalToDuration from "date-fns/intervalToDuration";
import styles from "./Timer.module.scss";

type TimerProps = {
  startedTime: number;
};

export const Timer: FC<TimerProps> = ({ startedTime }) => {
  const [min, setMinutes] = useState("");
  const [sec, setSeconds] = useState("");

  const padWithLeadingZeros = (num: number, totalLength = 2) => {
    return String(num).padStart(totalLength, "0");
  };

  const defineDuration = useCallback(() => {
    setTimeout(() => {
      const { minutes = 0, seconds = 0 } = intervalToDuration({
        start: new Date(startedTime),
        end: new Date(Date.now()),
      });
      setMinutes(padWithLeadingZeros(minutes));
      setSeconds(padWithLeadingZeros(seconds));
      defineDuration();
    }, 1000);
  }, []);

  defineDuration();

  return (
    <div className={styles.timer}>
      <span className={styles.minutes}>{min}</span>
      <span className={styles.separator}>:</span>
      <span className={styles.seconds}>{sec}</span>
    </div>
  );
};
