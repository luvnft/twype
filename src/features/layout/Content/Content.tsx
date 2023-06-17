import { FC, PropsWithChildren } from "react";
import styles from "./Content.module.scss";

type ContentProps = {
  title?: string;
  posterUrl?: string;
};

export const Content: FC<PropsWithChildren<ContentProps>> = ({
  children,
  title,
  posterUrl,
}) => {
  return (
    <main className={styles.content}>
      <h1 className={styles.title}>{title}</h1>
      {posterUrl && <div>{posterUrl}</div>}
      <article className={styles.article}>{children}</article>
    </main>
  );
};
