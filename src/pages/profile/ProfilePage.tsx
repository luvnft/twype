import { FC } from "react";
import { MainLayout } from "@/features/layout/MainLayout/MainLayout";
import { Content } from "@/features/layout/Content/Content";

type ProfilePageProps = {};

export const ProfilePage: FC<ProfilePageProps> = () => {
  return (
    <MainLayout>
      <Content title="Profile" menu={[]}>
        ...Your info will be here soon...
      </Content>
    </MainLayout>
  );
};
