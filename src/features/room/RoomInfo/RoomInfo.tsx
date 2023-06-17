import { FC } from "react";
import QRCode from "react-qr-code";
import { Room } from "../types";
import { Button } from "@/features/form/Button/Button";
import nftPosterUrl from "@/assets/nft.jpg";
import styles from "./RoomInfo.module.scss";

type RoomInfoProps = {
  data: Room;
};

export const RoomInfo: FC<RoomInfoProps> = ({ data }) => {
  const sharedLink = `${import.meta.env.VITE_SHARED_URL}/rooms/${data.roomId}`;

  return (
    <div>
      {!data.roomLocked ? (
        <>
          <div className={styles.poster}>
            <img src={nftPosterUrl} alt="" className={styles.photo} />
          </div>

          <div className={styles.action}>
            <Button to="join">Join to the Room</Button>
          </div>

          <div className={styles.qr}>
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={sharedLink}
              viewBox={`0 0 256 256`}
              bgColor="transparent"
            />
          </div>

          <div className={styles.share}>
            Shared link: <span className={styles.url}>{sharedLink}</span>
          </div>
        </>
      ) : (
        <div>Room is locked :(</div>
      )}
    </div>
  );
};
