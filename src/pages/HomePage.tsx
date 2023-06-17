import { FC } from "react";
import { Link } from "react-router-dom";
import { MainLayout } from "@/features/layout/MainLayout/MainLayout";
import { Content } from "@/features/layout/Content/Content";

type HomePageProps = {};

export const HomePage: FC<HomePageProps> = () => {
  return (
    <MainLayout>
      <Content title="Home Page">
        <p>...landing content...</p>
        {/* <p>
          <Link to="huddle">Huddle</Link>
        </p> */}
        {/* <Link to="catalog">Catalog</Link> */}
      </Content>
    </MainLayout>
  );
};
