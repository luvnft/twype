import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { LocalVideoTrack } from "livekit-client";

type MediaState = {
  videoTrack: LocalVideoTrack | undefined;
  setVideoTrack: (track: LocalVideoTrack | undefined) => void;
};

export const useMediaStore = create<MediaState>()(
  devtools((set) => ({
    videoTrack: undefined,
    setVideoTrack: (track) => set(() => ({ videoTrack: track })),
  }))
);
