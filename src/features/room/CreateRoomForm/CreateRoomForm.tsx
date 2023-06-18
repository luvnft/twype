import { FC, useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Fieldset } from "@/features/form/Fieldset/Fieldset";
import { Input } from "@/features/form/Input/Input";
import { Select } from "@/features/form/Select/Select";
import { Button } from "@/features/form/Button/Button";
import { Chain, RoomType, TokenType } from "../types";
import { RoomUserName } from "../RoomUserName/RoomUserName";
import { useUserName } from "../hooks/useUserName";

type CreateRoomFormProps = {};

export const CreateRoomForm: FC<CreateRoomFormProps> = () => {
  const navigate = useNavigate();
  const { userName, setUserName } = useUserName();
  const [isLoading, setIsLoading] = useState(false);
  const [roomType, setRoomType] = useState(RoomType.TOKEN_GATED_ROOM);
  const [roomName, setRoomName] = useState("New room");
  const [tokenType, setTokenType] = useState<TokenType>(TokenType.ERC721);
  const [chain, setChain] = useState(Chain.POLYGON);
  const [contractAddress, setContractAddress] = useState(
    "0x4537E07cA68E303c4fb7c95427952F946952cBc4"
  );

  const canSubmit = useMemo(() => {
    return (
      !!roomName &&
      !!userName &&
      ((roomType === RoomType.TOKEN_GATED_ROOM && !!contractAddress) ||
        roomType === RoomType.USUAL_ROOM)
    );
  }, [roomName, roomType, contractAddress, userName]);

  const tokenTypeOptions = [TokenType.ERC721, TokenType.ERC1155];
  const chainOptions = [
    Chain.POLYGON,
    Chain.ETHEREUM,
    Chain.BINANCE_SMART_CHAIN,
  ];

  const createRoom = useCallback(async () => {
    setIsLoading(true);
    const requestConfig =
      !contractAddress || roomType !== RoomType.TOKEN_GATED_ROOM
        ? {}
        : {
            tokenType: tokenType,
            chain: chain,
            contractAddress: [contractAddress],
          };

    const response = await axios.post(
      "https://api.huddle01.com/api/v1/create-room",
      {
        title: roomName,
        ...requestConfig,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_HUDDLE_API_KEY,
        },
      }
    );
    setIsLoading(false);
    console.log("🚀 ~ createRoom:", response);
    const { roomId } = response?.data?.data;
    if (roomId) {
      navigate(`/rooms/${roomId}`);
    }
  }, []);

  return (
    <>
      <Fieldset label="Room type" isRequired>
        <p>
          <label>
            <input
              type="radio"
              name="roomType"
              value={RoomType.USUAL_ROOM}
              checked={roomType === RoomType.USUAL_ROOM}
              onChange={() => setRoomType(RoomType.USUAL_ROOM)}
            />{" "}
            Usual Room
          </label>
        </p>
        <p>
          <label>
            <input
              type="radio"
              name="roomType"
              value={RoomType.TOKEN_GATED_ROOM}
              checked={roomType === RoomType.TOKEN_GATED_ROOM}
              onChange={() => setRoomType(RoomType.TOKEN_GATED_ROOM)}
            />{" "}
            Token Gated Room
          </label>
        </p>
      </Fieldset>

      <Fieldset label="Room name" isRequired>
        <Input value={roomName} onChange={setRoomName} />
      </Fieldset>

      <Fieldset>
        <RoomUserName label="Your name" onChange={setUserName} />
      </Fieldset>

      {roomType === RoomType.TOKEN_GATED_ROOM && (
        <>
          <Fieldset label="Token Type" isRequired>
            <Select
              value={tokenType}
              options={tokenTypeOptions}
              disabled
              onChange={(val) => setTokenType(val as TokenType)}
            />
          </Fieldset>

          <Fieldset label="Chain" isRequired>
            <Select
              value={chain}
              options={chainOptions}
              disabled
              onChange={(val) => setChain(val as Chain)}
            />
          </Fieldset>

          <Fieldset label="NFT Contract Address" isRequired>
            <Input value={contractAddress} onChange={setContractAddress} />
          </Fieldset>
        </>
      )}

      <Fieldset>
        <Button disabled={!canSubmit || isLoading} onClick={createRoom}>
          Create new Room
        </Button>
      </Fieldset>
    </>
  );
};
