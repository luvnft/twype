import { FC, PropsWithChildren } from "react";
import styles from "./Content.module.scss";

type ContentProps = {
  title?: string;
};

export const Content: FC<PropsWithChildren<ContentProps>> = ({
  children,
  title,
}) => {
  return (
    <main className={styles.content}>
      <h1 className={styles.title}>{title}</h1>
      <article className={styles.article}>{children}</article>
    </main>
  );
};
