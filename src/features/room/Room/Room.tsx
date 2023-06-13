import { FC, useEffect, useMemo, useRef, useState } from "react";
import { useMediaDevices } from "react-use";
import { useEventListener, useHuddle01 } from "@huddle01/react";
import { Audio, Video } from "@huddle01/react/components";
import {
  useAudio,
  useLobby,
  useMeetingMachine,
  usePeers,
  useRoom,
  useVideo,
  useRecording,
} from "@huddle01/react/hooks";
import { useDisplayName } from "@huddle01/react/app-utils";

import styles from "./Room.module.scss";
import { Keyboard } from "@/features/videoPopup/Keyboard/Keyboard";
import { useUserMedia } from "../hooks/useUserMedia";

type RoomProps = {
  roomId: string;
};

const PROJECT_ID = import.meta.env.VITE_HUDDLE_PROJECT_ID;

export const Room: FC<RoomProps> = ({ roomId }) => {
  useUserMedia();
  const videoRef = useRef<HTMLVideoElement>(null);
  const { initialize, isInitialized } = useHuddle01();
  const { state, send } = useMeetingMachine();
  // console.log("🚀 ~ state:", state);
  const { joinLobby, error: lobbyError } = useLobby();
  // console.log("🚀 ~ lobbyError:", lobbyError);
  const [userName, setUserName] = useState("");
  const { setDisplayName, error: displayNameError } = useDisplayName();
  const {
    fetchAudioStream,
    produceAudio,
    stopAudioStream,
    stopProducingAudio,
    stream: micStream,
  } = useAudio();
  const {
    fetchVideoStream,
    produceVideo,
    stopVideoStream,
    stopProducingVideo,
    stream: camStream,
  } = useVideo();
  const { joinRoom, leaveRoom } = useRoom();
  const { peers } = usePeers();
  // console.log("🚀 ~ peers:", peers);

  // Event Listner
  useEventListener("lobby:cam-on", () => {
    if (camStream && videoRef.current) videoRef.current.srcObject = camStream;
  });

  useEffect(() => {
    initialize(PROJECT_ID);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      joinLobby(roomId);
    }
  }, [isInitialized]);

  const lobbyStatus = useMemo(() => {
    // @ts-ignore
    return state?.value?.Initialized;
  }, [state?.value]);

  useEffect(() => {
    if (lobbyStatus?.JoinedLobby && !userName) {
      setDisplayName("techmeat");
      setUserName("techmeat");
      fetchVideoStream();
      fetchAudioStream();
    }
  }, [lobbyStatus]);

  useEffect(() => {
    return send("LEAVE_LOBBY");
  }, []);

  const handleToggleCam = () => {
    if (!produceVideo.isCallable) {
      stopProducingVideo();
    } else {
      produceVideo(camStream);
    }
  };

  const handleToggleMic = () => {
    if (!produceAudio.isCallable) {
      stopProducingAudio();
    } else {
      produceAudio(micStream);
    }
  };

  const handleJoinRoom = () => {
    joinRoom();
  };

  if (lobbyStatus === "JoiningLobby") {
    return <div>...connecting</div>;
  }

  if (!lobbyStatus || lobbyStatus === "JoinLobbyFailed") {
    return <div>JoinLobbyFailed</div>;
  }

  return (
    <div className={styles.room}>
      <div className={styles.preview}>
        <video ref={videoRef} autoPlay muted className={styles.video} />
        <Keyboard
          isVisible={true}
          isCalling={!state.matches("Initialized.JoinedLobby")}
          isMicOn={!produceAudio.isCallable}
          isCameraOn={!produceVideo.isCallable}
          callButtonText={
            !!state.matches("Initialized.JoinedLobby")
              ? "Join for 1$"
              : "Leave the room"
          }
          onCall={handleJoinRoom}
          onCancel={leaveRoom}
          onToggleMic={handleToggleMic}
          onToggleCamera={handleToggleCam}
        />
      </div>

      <div>
        {Object.values(peers)
          .filter((peer) => peer.cam)
          .map((peer) => (
            <div key={peer.peerId}>
              role: {peer.role}
              <Video
                peerId={peer.peerId}
                track={peer.cam}
                debug
                className={styles.video}
              />
            </div>
          ))}
        {Object.values(peers)
          .filter((peer) => peer.mic)
          .map((peer) => (
            <Audio key={peer.peerId} peerId={peer.peerId} track={peer.mic} />
          ))}
      </div>

      <h2 className="text-2xl">Room State</h2>
      <pre className="break-words">{JSON.stringify(state.value, null, 2)}</pre>
      <h2 className="text-2xl">peerId</h2>
      <div className="break-words">{JSON.stringify(state.context.peerId)}</div>
      <h2 className="text-2xl">DisplayName</h2>
      <div className="break-words">
        {JSON.stringify(state.context.displayName)}b
      </div>
    </div>
  );
};
