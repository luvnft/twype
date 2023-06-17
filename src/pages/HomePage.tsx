import { FC } from "react";
import { Link } from "react-router-dom";
import { MainLayout } from "@/features/layout/MainLayout/MainLayout";

type HomePageProps = {};

export const HomePage: FC<HomePageProps> = () => {
  return (
    <MainLayout>
      <div>HomePage</div>
      <p>
        <Link to="rooms/dlf-pkdb-mjf">DEV ROOM</Link>
      </p>
      <p>
        <Link to="rooms/uyy-ofwe-wup">TOken Gated DEV ROOM</Link>
      </p>
      {/* <p>
        <Link to="huddle">Huddle</Link>
      </p> */}
      {/* <Link to="catalog">Catalog</Link> */}
    </MainLayout>
  );
};
