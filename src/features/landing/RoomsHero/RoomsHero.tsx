import { FC } from "react";
import { Button } from "@/features/form/Button/Button";
import styles from "./RoomsHero.module.scss";

type RoomsHeroProps = {};

export const RoomsHero: FC<RoomsHeroProps> = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.wrapper}>
        <div className={styles.slogan}>Create your own room</div>
        <div className={styles.action}>
          <Button to="/rooms/create" color="success">
            Create room
          </Button>
        </div>
      </div>
    </div>
  );
};
