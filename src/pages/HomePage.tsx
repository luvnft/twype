import { FC } from "react";
import { MainLayout } from "@/features/layout/MainLayout/MainLayout";
import { HomeHero } from "@/features/landing/HomeHero/HomeHero";
import { Content } from "@/features/layout/Content/Content";
import { RoomBanner } from "@/features/room/RoomBanner/RoomBanner";
import roomPosterUrl from "@/assets/room.jpg";
import roomNftPosterUrl from "@/assets/nft.jpg";

type HomePageProps = {};

export const HomePage: FC<HomePageProps> = () => {
  return (
    <MainLayout>
      <HomeHero />
      <br />
      <Content title="Popular Rooms" size="small">
        <RoomBanner
          to="/rooms/dlf-pkdb-mjf"
          title="Dev Room"
          posterUrl={roomPosterUrl}
        />
        <br />
        <RoomBanner
          to="/rooms/uyy-ofwe-wup"
          title="Token Gated Dev Room"
          posterUrl={roomNftPosterUrl}
        />
      </Content>
    </MainLayout>
  );
};
