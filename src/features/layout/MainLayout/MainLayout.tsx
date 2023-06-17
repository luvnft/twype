import { FC, PropsWithChildren } from "react";
import { Header } from "../Header/Header";
// import { VideoPopup } from "@/features/videoPopup";
import styles from "./MainLayout.module.scss";

type MainLayoutProps = {};

export const MainLayout: FC<PropsWithChildren<MainLayoutProps>> = ({
  children,
}) => {
  return (
    <div className={styles.layout}>
      <Header />
      {children}
      {/* <VideoPopup isVisible={true} /> */}
    </div>
  );
};
