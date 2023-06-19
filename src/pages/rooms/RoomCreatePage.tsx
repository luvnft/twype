import { FC } from "react";
import { MainLayout } from "@/features/layout/MainLayout/MainLayout";
import { AuthProtector } from "@/features/auth/AuthProtector/AuthProtector";
import { Content } from "@/features/layout/Content/Content";
import { CreateRoomForm } from "@/features/room/CreateRoomForm/CreateRoomForm";

type RoomCreatePageProps = {};

export const RoomCreatePage: FC<RoomCreatePageProps> = () => {
  return (
    <MainLayout>
      <AuthProtector>
        <Content title="Create your room" size="small">
          <CreateRoomForm />
        </Content>
      </AuthProtector>
    </MainLayout>
  );
};
