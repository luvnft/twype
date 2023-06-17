export enum RoomType {
  USUAL_ROOM = "usualRoom",
  TOKEN_GATED_ROOM = "tokenGatedRoom",
}

export enum TokenType {
  ERC721 = "ERC721",
  ERC1155 = "ERC1155",
}

export enum Chain {
  POLYGON = "POLYGON",
  ETHEREUM = "ETHEREUM",
  BINANCE_SMART_CHAIN = "BINANCE_SMART_CHAIN",
}

export type Room = {
  description: string;
  expiryTime: string;
  hostWalletAddress: string[];
  meetingLink: string;
  muteOnEntry: boolean;
  roomId: string;
  roomLocked: boolean;
  startTime: string;
  title: string;
  videoOnEntry: boolean;
};

export type RoomError = {
  message: string;
  code: string;
};
