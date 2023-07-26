import { FC, PropsWithChildren } from "react";
import { NftCard, NftCardProps } from "../NftCard/NftCard";
import styles from "./NftList.module.scss";

type NftListProps = {
  list: NftCardProps[];
};

export const NftList: FC<PropsWithChildren<NftListProps>> = ({ list }) => {
  return (
    <div className={styles.list}>
      {list.map((item) => (
        <NftCard {...item} key={item.id} />
      ))}
    </div>
  );
};
