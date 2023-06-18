import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MainLayout } from "@/features/layout/MainLayout/MainLayout";
import { Content } from "@/features/layout/Content/Content";
import { RoomInfo } from "@/features/room/RoomInfo/RoomInfo";
import { Room, RoomError } from "@/features/room/types";
import { Button } from "@/features/form/Button/Button";

type RoomPageProps = {};

export const RoomPage: FC<RoomPageProps> = () => {
  let { roomId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [roomInfo, setRoomInfo] = useState<Room | null>(null);
  console.log("🚀 ~ roomInfo:", roomInfo);
  const [roomError, setRoomError] = useState<RoomError | null>(null);

  const getMeetingInfo = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api.huddle01.com/api/v1/meeting-details/${roomId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": import.meta.env.VITE_HUDDLE_API_KEY,
          },
        }
      );
      if (response?.data) {
        setRoomInfo(response.data as Room);
      }
    } catch (error) {
      // @ts-ignore
      setRoomError(error?.response?.data as RoomError);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (roomId) {
      getMeetingInfo();
    }
  }, [getMeetingInfo, roomId]);

  const pageTitle = useMemo(() => {
    if (isLoading) {
      return "Room is loading...";
    }
    if (roomError) {
      return "404";
    }
    return roomInfo?.title || "Unnamed Room";
  }, [isLoading, roomError, roomInfo]);

  if (!roomId) return null;

  return (
    <MainLayout>
      <Content title={pageTitle} size="small">
        {!roomError ? (
          !isLoading && (
            <>
              {roomInfo ? (
                <RoomInfo data={roomInfo} />
              ) : (
                <Button to="join">Try to join</Button>
              )}
            </>
          )
        ) : (
          <div>
            <p>{roomError.message}</p>
            <p>
              <Button to="..">Back to Rooms list</Button>
            </p>
          </div>
        )}
      </Content>
    </MainLayout>
  );
};
