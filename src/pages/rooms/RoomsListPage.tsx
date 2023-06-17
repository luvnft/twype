import { FC } from "react";
import { Link } from "react-router-dom";
import { MainLayout } from "@/features/layout/MainLayout/MainLayout";
import { Content } from "@/features/layout/Content/Content";

type RoomsListPageProps = {};

export const RoomsListPage: FC<RoomsListPageProps> = () => {
  return (
    <MainLayout>
      <Content title="Rooms">
        <p>
          <Link to="dlf-pkdb-mjf">DEV ROOM</Link>
        </p>
        <p>
          <Link to="uyy-ofwe-wup">TOken Gated DEV ROOM</Link>
        </p>
        <hr />
        <p>
          <Link to="create">Create new room</Link>
        </p>
      </Content>
    </MainLayout>
  );
};
