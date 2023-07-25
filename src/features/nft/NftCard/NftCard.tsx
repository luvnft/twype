import { FC } from "react";
import { Dayjs } from "dayjs";
import styles from "./NftCard.module.scss";

type NftCardProps = {
  author: string;
  title?: string;
  date?: Dayjs;
  photo?: string;
};

export const NftCard: FC<NftCardProps> = ({ author, title, date, photo }) => {
  const outputDate = date?.format("DD MMMM, YYYY");
  const outputTime = date?.format("HH:mm (UTC Z)");

  return (
    <div className={styles.card}>
      {photo && <img src={photo} className={styles.photo} />}
      <div className={styles.content}>
        <div className={styles.ticket}>NFT-ticket</div>
        <div className={styles.brand}>by Twype</div>
        <div className={styles.name}>{author}</div>
        <div className={styles.title}>{title}</div>
        {outputDate && (
          <div className={styles.time}>
            {outputDate}
            <br />
            {outputTime}
          </div>
        )}
      </div>
    </div>
  );
};
