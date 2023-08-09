import { FC, PropsWithChildren } from "react";
import cn from "classnames";
import { SideMenu } from "@/features/navigation/SideMenu/SideMenu";
import styles from "./Content.module.scss";

type ContentProps = {
  title?: string;
  posterUrl?: string;
  size?: "small" | "medium" | "big" | "full";
  menu?: any;
};

export const Content: FC<PropsWithChildren<ContentProps>> = ({
  children,
  title,
  posterUrl,
  size = "full",
  menu,
}) => {
  return (
    <div className={styles.container}>
      {menu && (
        <div className={styles.menu}>
          <SideMenu />
        </div>
      )}
      <main className={cn(styles.content, styles[size])}>
        {title && <h1 className={styles.title}>{title}</h1>}
        {posterUrl && <div>{posterUrl}</div>}
        <article className={styles.article}>{children}</article>
      </main>
    </div>
  );
};
