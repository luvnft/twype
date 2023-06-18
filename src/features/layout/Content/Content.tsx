import { FC, PropsWithChildren } from "react";
import cn from "classnames";
import styles from "./Content.module.scss";

type ContentProps = {
  title?: string;
  posterUrl?: string;
  size?: "small" | "medium" | "big" | "full";
};

export const Content: FC<PropsWithChildren<ContentProps>> = ({
  children,
  title,
  posterUrl,
  size = "full",
}) => {
  return (
    <main className={cn(styles.content, styles[size])}>
      <h1 className={styles.title}>{title}</h1>
      {posterUrl && <div>{posterUrl}</div>}
      <article className={styles.article}>{children}</article>
    </main>
  );
};
