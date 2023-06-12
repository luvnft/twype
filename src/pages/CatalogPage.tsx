import { FC } from "react";
import { MainLayout } from "@/features/layout/MainLayout/MainLayout";
import { Interests } from "@/features/catalog/Interests/Interests";
import { Catalog } from "@/features/catalog/Catalog/Catalog";
import { Headline } from "@/ui/Headline/Headline";

type CatalogPageProps = {};

export const CatalogPage: FC<CatalogPageProps> = () => {
  return (
    <MainLayout>
      <Interests />
      <Headline title="Hot authors" />
      <Catalog />
    </MainLayout>
  );
};
