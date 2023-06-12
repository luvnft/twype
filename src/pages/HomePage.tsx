import { FC } from "react";
import { Link } from "react-router-dom";
import { MainLayout } from "@/features/layout/MainLayout/MainLayout";

type HomePageProps = {};

export const HomePage: FC<HomePageProps> = () => {
  return (
    <MainLayout>
      <div>HomePage</div>
      <Link to="catalog">Catalog</Link>
      <Link to="huddle">Huddle01</Link>
    </MainLayout>
  );
};
