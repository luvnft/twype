import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type VideoCallState = {
  isVideoEnabled: boolean;
  videoDevice: MediaDeviceInfo | undefined;
  setIsVideoEnabled: (st: boolean) => void;
  setVideoDevice: (device: MediaDeviceInfo | undefined) => void;
};

export const useVideoCallStore = create<VideoCallState>()(
  devtools(
    persist(
      (set) => ({
        isVideoEnabled: false,
        videoDevice: undefined,
        setIsVideoEnabled: (st) => set(() => ({ isVideoEnabled: st })),
        setVideoDevice: (device) => set(() => ({ videoDevice: device })),
      }),
      { name: "videoCall", version: 1 }
    )
  )
);
