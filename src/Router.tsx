import { FC } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { HomePage } from "@/pages/HomePage";
// import { CatalogPage } from "@/pages/CatalogPage";
import { HuddlePage } from "@/pages/HuddlePage";

import { RoomPage } from "@/pages/rooms/RoomPage";
import { RoomPageJoin } from "@/pages/rooms/RoomPageJoin";
import { RoomsListPage } from "@/pages/rooms/RoomsListPage";
import { RoomCreatePage } from "@/pages/rooms/RoomCreatePage";
import { ServicePage } from "@/pages/services/ServicePage";
import { ProfilePage } from "@/pages/profile/ProfilePage";
import { ProfileTicketsPage } from "./pages/profile/ProfileTicketsPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<HomePage />} />
      {/* <Route path="catalog" element={<CatalogPage />} /> */}

      <Route path="rooms">
        <Route index element={<RoomsListPage />} />
        <Route path="create" element={<RoomCreatePage />} />
        <Route path=":roomId" element={<RoomPage />} />
        <Route path=":roomId/join" element={<RoomPageJoin />} />
      </Route>

      <Route path="profile">
        <Route index element={<ProfilePage />} />
        <Route path="tickets" element={<ProfileTicketsPage />} />
      </Route>

      <Route path="services">
        <Route path=":serviceId" element={<ServicePage />} />
      </Route>

      <Route path="huddle" element={<HuddlePage />} />
    </Route>
  )
);

export const Router: FC = () => {
  return <RouterProvider router={router} />;
};
