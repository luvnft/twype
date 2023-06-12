import { FC } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { HomePage } from "@/pages/HomePage";
import { CatalogPage } from "@/pages/CatalogPage";
import { RoomPage } from "@/pages/RoomPage";
import { LivePeerPage } from "@/pages/LivePeerPage";
import { HuddlePage } from "@/pages/HuddlePage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<HomePage />} />
      <Route path="catalog" element={<CatalogPage />} />
      <Route path="room" element={<RoomPage />} />
      <Route path="peer" element={<LivePeerPage />} />
      <Route path="huddle" element={<HuddlePage />} />
    </Route>
  )
);

export const Router: FC = () => {
  return <RouterProvider router={router} />;
};
