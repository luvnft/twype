import { FC } from "react";
import { useParams } from "react-router-dom";
import { MainLayout } from "@/features/layout/MainLayout/MainLayout";
import { Room } from "@/features/room/Room/Room";

type RoomPageProps = {};

export const RoomPage: FC<RoomPageProps> = () => {
  const { roomId } = useParams();

  if (!roomId) return null;

  return (
    <MainLayout>
      <Room roomId={roomId} />
    </MainLayout>
  );
};
