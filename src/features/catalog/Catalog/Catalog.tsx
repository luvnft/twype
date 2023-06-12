import { FC, PropsWithChildren } from "react";
import catalogue from "@/features/catalog/catalog-mock.json";
import { Author } from "../types";
import { CatalogCard } from "../CatalogCard/CatalogCard";
import styles from "./Catalog.module.scss";

type CatalogProps = {};

export const Catalog: FC<PropsWithChildren<CatalogProps>> = ({ children }) => {
  const list = catalogue?.items as Author[];

  return (
    <div className={styles.catalogue}>
      {children}
      {list?.map((item: Author) => (
        <CatalogCard key={item.id} author={item} />
      ))}
    </div>
  );
};
