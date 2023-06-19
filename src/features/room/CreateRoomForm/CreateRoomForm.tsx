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
    import.meta.env.VITE_ORB_CONTRACT
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
      `${import.meta.env.VITE_API_URL}/rooms/create`,
      {
        title: roomName,
        ...requestConfig,
      }
    );
    setIsLoading(false);
    const { roomId } = response?.data;
    if (roomId) {
      navigate(`/rooms/${roomId}`);
    }
  }, [roomName, tokenType, chain, contractAddress]);

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
