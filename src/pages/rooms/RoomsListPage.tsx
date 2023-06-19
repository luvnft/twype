import { FC } from "react";
import { Link } from "react-router-dom";
import { MainLayout } from "@/features/layout/MainLayout/MainLayout";
import { AuthProtector } from "@/features/auth/AuthProtector/AuthProtector";
import { RoomsHero } from "@/features/landing/RoomsHero/RoomsHero";
import { Content } from "@/features/layout/Content/Content";
import { RoomBanner } from "@/features/room/RoomBanner/RoomBanner";
import roomPosterUrl from "@/assets/room.jpg";
import roomNftPosterUrl from "@/assets/nft.jpg";

type RoomsListPageProps = {};

export const RoomsListPage: FC<RoomsListPageProps> = () => {
  return (
    <MainLayout>
      <AuthProtector>
        <RoomsHero />
        <br />
        <Content title="Available Rooms" size="small">
          <RoomBanner
            to={`/rooms/${import.meta.env.VITE_HUDDLE_DEV_ROOM}`}
            title="Dev Room"
            posterUrl={roomPosterUrl}
          />
          <br />
          <RoomBanner
            to={`/rooms/${import.meta.env.VITE_HUDDLE_DEV_ROOM_TG}`}
            title="Token Gated Dev Room"
            posterUrl={roomNftPosterUrl}
          />
        </Content>
      </AuthProtector>
    </MainLayout>
  );
};
