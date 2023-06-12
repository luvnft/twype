import { FC, useEffect, useMemo, useState } from "react";
import { createLocalVideoTrack } from "livekit-client";
import catalog from "@/features/catalog/catalog-mock.json";
import { useVideoCallStore } from "./store";
import { useMediaStore } from "./mediaStore";
import { Popup } from "./Popup/Popup";
import { AuthorVideoPopup } from "./AuthorVideoPopup/AuthorVideoPopup";
import { ClientVideoPopup } from "./ClientVideoPopup/ClientVideoPopup";
import { Keyboard } from "./Keyboard/Keyboard";
import { Timer } from "./Timer/Timer";
import { CameraSelector } from "./CameraSelector/CameraSelector";
import { useSearchParams } from "react-router-dom";
import { Author, AuthorConnection } from "../catalog/types";

export type VideoPopupProps = {
  isVisible: boolean;
};

export const VideoPopup: FC<VideoPopupProps> = ({ isVisible }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const callSlug = searchParams.get("call");
  const list = catalog?.items as Author[];
  const author = list.find((item) => item.slug === callSlug);

  const isVideoEnabled = useVideoCallStore((state) => state.isVideoEnabled);
  const setIsVideoEnabled = useVideoCallStore(
    (state) => state.setIsVideoEnabled
  );
  const videoTrack = useMediaStore((state) => state.videoTrack);
  const setVideoTrack = useMediaStore((state) => state.setVideoTrack);
  const videoDevice = useVideoCallStore((state) => state.videoDevice);
  const setVideoDevice = useVideoCallStore((state) => state.setVideoDevice);

  const [isKeyboardVisible, setIsKeyboardVisible] = useState(true);
  const [isCalling, setIsCalling] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [startedTime, setStartedTime] = useState<number | null>(null);

  useEffect(() => {
    if (isVideoEnabled !== false && callSlug) {
      createLocalVideoTrack({
        deviceId: videoDevice?.deviceId,
      }).then((track) => {
        setIsVideoEnabled(isVideoEnabled ?? true);
        setVideoTrack(track);
      });
    }
  }, [callSlug, videoDevice]);

  const callButtonText = useMemo(() => {
    if (!author) return;
    if (author.connection === AuthorConnection.stream) {
      return isCalling
        ? "Leave the stream"
        : `Join the stream for $${author.price.stream}/min`;
    }
    return isCalling ? "Finish the call" : `Call for $${author.price.call}/min`;
  }, [author, isCalling]);

  const handleAuthorClick = () => {
    setIsKeyboardVisible(!isKeyboardVisible);
  };

  const handleClientClick = () => {
    if (!isCalling) return;
    setIsKeyboardVisible(!isKeyboardVisible);
  };

  const handleCall = () => {
    setIsCalling(true);
    setIsKeyboardVisible(false);
    setStartedTime(Date.now());
  };

  const toggleVideo = async () => {
    if (videoTrack) {
      videoTrack.stop();
      setIsVideoEnabled(false);
      setVideoTrack(undefined);
    } else {
      const track = await createLocalVideoTrack({
        deviceId: videoDevice?.deviceId,
      });
      setIsVideoEnabled(true);
      setVideoTrack(track);
    }
  };

  const handleCancelCall = () => {
    setIsCalling(false);
    setIsKeyboardVisible(true);
    setStartedTime(null);
    videoTrack?.stop();
    setVideoTrack(undefined);
    searchParams.delete("call");
    setSearchParams(searchParams);
  };

  const selectVideoDevice = (device: MediaDeviceInfo) => {
    setVideoDevice(device);
    if (videoTrack) {
      if (
        videoTrack.mediaStreamTrack.getSettings().deviceId === device.deviceId
      ) {
        return;
      }
      videoTrack.stop();
    }
  };

  if (!isVisible || !callSlug) return null;

  return (
    <Popup>
      {author && (
        <AuthorVideoPopup
          author={author}
          isCalling={isCalling}
          onClick={handleAuthorClick}
        />
      )}
      {(!isCalling || (isCalling && isVideoEnabled)) && (
        <ClientVideoPopup
          videoTrack={videoTrack}
          isCompact={isCalling}
          isCameraOn={isVideoEnabled}
          onClick={handleClientClick}
        />
      )}
      {startedTime && <Timer startedTime={startedTime} />}
      <Keyboard
        isVisible={isKeyboardVisible}
        isCalling={isCalling}
        isMicOn={isMicOn}
        isCameraOn={isVideoEnabled}
        callButtonText={callButtonText}
        onCall={handleCall}
        onCancel={handleCancelCall}
        onToggleMic={(state) => setIsMicOn(state)}
        onToggleCamera={toggleVideo}
      />
      {false && (
        <CameraSelector
          videoTrack={videoTrack}
          onToggleVideo={toggleVideo}
          onSelectVideoDevice={selectVideoDevice}
        />
      )}
    </Popup>
  );
};
