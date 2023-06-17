import { FC } from "react";
import { MainLayout } from "@/features/layout/MainLayout/MainLayout";
import { Content } from "@/features/layout/Content/Content";
import { CreateRoomForm } from "@/features/room/CreateRoomForm/CreateRoomForm";

type RoomCreatePageProps = {};

export const RoomCreatePage: FC<RoomCreatePageProps> = () => {
  return (
    <MainLayout>
      <Content title="Create your room">
        <CreateRoomForm />
      </Content>
    </MainLayout>
  );
};
