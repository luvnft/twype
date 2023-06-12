export enum AuthorPreview {
  photo = "photo",
  video = "video",
  portal = "portal",
  stream = "stream",
}

export enum AuthorConnection {
  call = "call",
  stream = "stream",
}

export type AuthorPrice = {
  call: number;
  stream: number;
};

export type Author = {
  id: string;
  slug: string;
  posterUrl: string;
  videoPosterUrl?: string;
  preview: AuthorPreview;
  name: string;
  description?: string;
  about?: string;
  connection: AuthorConnection;
  price: AuthorPrice;
  rating: number;
};
