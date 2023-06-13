import { FC } from "react";
import { Link } from "react-router-dom";
import { MainLayout } from "@/features/layout/MainLayout/MainLayout";

type HomePageProps = {};

export const HomePage: FC<HomePageProps> = () => {
  return (
    <MainLayout>
      <div>HomePage</div>
      <Link to="rooms/dlf-pkdb-mjf">DEV ROOM</Link>
      <Link to="catalog">Catalog</Link>
    </MainLayout>
  );
};
