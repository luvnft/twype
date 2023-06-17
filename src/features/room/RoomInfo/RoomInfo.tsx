import { FC } from "react";
import { Link } from "react-router-dom";
import { Room } from "../types";

type RoomInfoProps = {
  data: Room;
};

export const RoomInfo: FC<RoomInfoProps> = ({ data }) => {
  return (
    <div>
      {!data.roomLocked ? (
        <Link to="join">Join to the Room</Link>
      ) : (
        <div>Room is locked :(</div>
      )}
    </div>
  );
};
