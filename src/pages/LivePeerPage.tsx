import { FC } from "react";
import {
  LivepeerConfig,
  ThemeConfig,
  createReactClient,
  studioProvider,
  useAsset,
} from "@livepeer/react";
import { MainLayout } from "@/features/layout/MainLayout/MainLayout";
import { LivePeer } from "@/features/LivePeer/LivePeer";

const client = createReactClient({
  provider: studioProvider({
    apiKey: import.meta.env.VITE_LIVEPEER_TOKEN,
    // baseUrl: import.meta.env.VITE_SITE_URL,
  }),
});

const livepeerTheme: ThemeConfig = {
  colors: {
    accent: "rgb(0, 145, 255)",
    containerBorderColor: "rgba(0, 145, 255, 0.9)",
  },
  fonts: {
    display: "Inter",
  },
};

type LivePeerPageProps = {};

export const LivePeerPage: FC<LivePeerPageProps> = () => {
  // const asset = useAsset({ assetId: "eedb6965-fb9f-473f-89a2-c265f3c93e0f" });
  // console.log("🚀 ~ asset:", asset);

  return (
    <MainLayout>
      <LivepeerConfig client={client} theme={livepeerTheme}>
        <LivePeer />
      </LivepeerConfig>
    </MainLayout>
  );
};
