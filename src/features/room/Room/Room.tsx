import { FC, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useHuddle01 } from "@huddle01/react";
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
import cn from "classnames";

import { Keyboard } from "@/features/videoPopup/Keyboard/Keyboard";
import { useUserMedia } from "../hooks/useUserMedia";
import { PeerBox } from "../PeerBox/PeerBox";
import { PeerBoxMy } from "../PeerBox/PeerBoxMy";
import styles from "./Room.module.scss";
import { useUserName } from "../hooks/useUserName";
import { useAccessToken } from "@/features/auth/hooks/useAccessToken";
import { useAuth } from "@/features/auth/hooks/useAuth";

type RoomProps = {
  roomId: string;
};

const PROJECT_ID = import.meta.env.VITE_HUDDLE_PROJECT_ID;

export const Room: FC<RoomProps> = ({ roomId }) => {
  useUserMedia();
  const { address } = useAuth();
  const { accessToken } = useAccessToken(address || "");
  const { userName } = useUserName();
  const { initialize, isInitialized } = useHuddle01();
  const [activePeer, setActivePeer] = useState<string | null>(null);
  const [wasJoined, setWasJoined] = useState(false);
  const { state, send } = useMeetingMachine();
  const { joinLobby, leaveLobby, error: lobbyError } = useLobby();
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

  const gridCounter = useMemo(() => {
    const size = Object.keys(peers).length;
    if (size > 0) {
      return size + 1;
    }
    return 1;
  }, [peers]);

  useEffect(() => {
    initialize(PROJECT_ID);
  }, []);

  useEffect(() => {
    if (isInitialized && accessToken) {
      console.log("🚀 ~ useEffect ~ accessToken:", accessToken);
      joinLobby(roomId, accessToken);
    }
  }, [isInitialized, accessToken]);

  const roomStatus = useMemo(() => {
    // @ts-ignore
    return state?.value?.Initialized;
  }, [state?.value]);

  const isJoinedToRoom = useMemo(() => {
    return state.matches("Initialized.JoinedRoom");
  }, [state?.value]);

  useEffect(() => {
    if (roomStatus?.JoinedLobby && !wasJoined) {
      setDisplayName(userName);
      fetchVideoStream();
      fetchAudioStream();
      setWasJoined(true);
    }
  }, [roomStatus]);

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

  const handleLeaveRoom = () => {
    leaveRoom();
    leaveLobby();
    send("LEAVE_LOBBY");
  };

  useEffect(() => {
    return handleLeaveRoom();
  }, []);

  const handleJoinRoom = () => {
    if (!isJoinedToRoom) {
      joinRoom();
      return;
    }
    stopProducingVideo();
    stopVideoStream();
    stopProducingAudio();
    stopAudioStream();
    handleLeaveRoom();
  };

  const handlePeerBoxClick = (id: string) => {
    setActivePeer(activePeer === id ? null : id);
  };

  if (roomStatus === "JoiningLobby") {
    return <div>...connecting</div>;
  }

  if (!roomStatus || roomStatus === "JoinLobbyFailed") {
    return <div>JoinLobbyFailed</div>;
  }

  return (
    <div className={styles.room}>
      <div
        className={cn(styles.grid, styles["grid-" + gridCounter], {
          [styles.hasActive]: activePeer,
        })}
        data-peers={gridCounter}
      >
        {Object.values(peers).map((peer) => (
          <div className={styles.cell} key={peer.peerId}>
            <PeerBox
              id={peer.peerId}
              role={peer.role}
              mic={peer.mic}
              cam={peer.cam}
              displayName={peer.displayName}
              isActive={activePeer === peer.peerId}
              onClick={handlePeerBoxClick}
            />
          </div>
        ))}

        <div className={styles.cell}>
          <PeerBoxMy
            displayName={state.context.displayName}
            camStream={camStream}
          />
        </div>
      </div>

      <Keyboard
        isVisible={true}
        isCalling={isJoinedToRoom}
        isMicOn={!produceAudio.isCallable}
        isCameraOn={!produceVideo.isCallable}
        callButtonText={!isJoinedToRoom ? "Join" : "Leave the room"}
        onCall={handleJoinRoom}
        onCancel={handleLeaveRoom}
        onToggleMic={handleToggleMic}
        onToggleCamera={handleToggleCam}
      />

      {/* <div className={styles.roomState}>
        <pre className="break-words">
          {JSON.stringify(state.value, null, 2)}
        </pre>
      </div> */}

      <Link to="/" className={styles.brand}>
        Twype
      </Link>

      {/* <div className={styles.controls}>
        <button onClick={() => joinLobby(roomId)}>joinLobby</button>
        <button onClick={() => setDisplayName("techmeat")}>
          setDisplayName
        </button>
        <button onClick={() => fetchVideoStream()}>fetchVideoStream</button>
        <button onClick={() => fetchAudioStream()}>fetchAudioStream</button>
        <button onClick={() => joinRoom()}>joinRoom</button>
        <button
          onClick={() => produceVideo(camStream)}
          disabled={!!stopProducingVideo.isCallable}
        >
          produceVideo
        </button>
        <button
          onClick={() => stopProducingVideo()}
          disabled={!stopProducingVideo.isCallable}
        >
          stopProducingVideo
        </button>
        <button
          onClick={() => produceAudio(micStream)}
          disabled={!!stopProducingAudio.isCallable}
        >
          produceAudio
        </button>
        <button
          onClick={() => stopProducingAudio()}
          disabled={!stopProducingAudio.isCallable}
        >
          stopProducingAudio
        </button>
      </div> */}
    </div>
  );
};
