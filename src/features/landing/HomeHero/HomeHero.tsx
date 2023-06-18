import { FC } from "react";
import { Button } from "@/features/form/Button/Button";
import styles from "./HomeHero.module.scss";

type HomeHeroProps = {};

export const HomeHero: FC<HomeHeroProps> = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.wrapper}>
        <div className={styles.slogan}>Speak Freely</div>
        <div className={styles.action}>
          <Button to="/rooms" color="success">
            Start conversation
          </Button>
        </div>
      </div>
    </div>
  );
};
