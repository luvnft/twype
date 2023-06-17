import { FC } from "react";
import { useParams } from "react-router-dom";
import { MainLayout } from "@/features/layout/MainLayout/MainLayout";
import { AuthProtector } from "@/features/auth/AuthProtector/AuthProtector";
import { Room } from "@/features/room/Room/Room";

type RoomPageProps = {};

export const RoomPageJoin: FC<RoomPageProps> = () => {
  const { roomId } = useParams();

  if (!roomId) return null;

  return (
    <MainLayout>
      <AuthProtector>
        <Room roomId={roomId} />
      </AuthProtector>
    </MainLayout>
  );
};
