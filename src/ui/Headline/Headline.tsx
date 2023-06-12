import { FC } from "react";
import styles from "./Headline.module.scss";

export type HeadlineProps = {
  title: string;
};

export const Headline: FC<HeadlineProps> = ({ title }) => {
  return (
    <header className={styles.headline}>
      <h2 className={styles.title}>{title}</h2>
    </header>
  );
};
