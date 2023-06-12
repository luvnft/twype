import { FC } from "react";
import cn from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhoneSlash,
  faPhone,
  faMicrophoneLinesSlash,
  faMicrophoneAlt,
  faVideoCamera,
  faVideoSlash,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Keyboard.module.scss";

type KeyboardProps = {
  isVisible: boolean;
  isCalling: boolean;
  isMicOn: boolean;
  isCameraOn: boolean;
  callButtonText?: string;
  onCall: () => void;
  onCancel: () => void;
  onToggleMic: (state: boolean) => void;
  onToggleCamera: (state: boolean) => void;
};

export const Keyboard: FC<KeyboardProps> = ({
  isVisible,
  isCalling,
  isMicOn,
  isCameraOn,
  callButtonText,
  onCall,
  onCancel,
  onToggleMic,
  onToggleCamera,
}) => {
  return (
    <div className={cn(styles.keyboard, { [styles.visible]: isVisible })}>
      <button
        className={cn(styles.button, styles.mic)}
        onClick={() => onToggleMic(!isMicOn)}
      >
        <FontAwesomeIcon
          icon={isMicOn ? faMicrophoneAlt : faMicrophoneLinesSlash}
        />
      </button>
      <button
        className={cn(styles.button, styles.camera)}
        onClick={() => onToggleCamera(!isCameraOn)}
      >
        <FontAwesomeIcon icon={isCameraOn ? faVideoCamera : faVideoSlash} />
      </button>
      {!isCalling ? (
        <button className={cn(styles.button, styles.call)} onClick={onCall}>
          <FontAwesomeIcon icon={faPhone} />{" "}
          {callButtonText && (
            <span className={styles.buttonText}>{callButtonText}</span>
          )}
        </button>
      ) : (
        <button className={cn(styles.button, styles.cancel)} onClick={onCancel}>
          <FontAwesomeIcon icon={faPhoneSlash} />
          {callButtonText && (
            <span className={styles.buttonText}>{callButtonText}</span>
          )}
        </button>
      )}
    </div>
  );
};
