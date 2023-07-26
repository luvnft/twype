import { FC } from "react";
import dayjs from "dayjs";
import { MainLayout } from "@/features/layout/MainLayout/MainLayout";
import { Content } from "@/features/layout/Content/Content";
import { NftList } from "@/features/nft/NftList/NftList";
import { NftCardProps } from "@/features/nft/NftCard/NftCard";

type ProfileTicketsPageProps = {};

export const ProfileTicketsPage: FC<ProfileTicketsPageProps> = () => {
  const nftList: NftCardProps[] = [
    {
      id: "1",
      author: "Vitalik Buterin",
      title: "Call for 30 minutes",
      date: dayjs("2023-10-10T10:00:00.000Z"),
      photo: "https://www.ixbt.com/img/n1/news/2022/4/6/buterin_large.jpg",
    },
    {
      id: "2",
      author: "Nick Szabo",
      title: "Call for 15 minutes",
      date: dayjs("2023-10-13T12:45:00.000Z"),
      photo:
        "https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcQ6Xl4I8ooTk6AWLldm7KWEQ6E5_cVwJ_vqEhtN3oBQX6JT2QwbjKRObBt-CkYplljQ",
    },
    {
      id: "3",
      author: "Andreas Antonopoulos",
      title: "Call for 30 minutes",
      date: dayjs("2023-11-10T15:30:00.000Z"),
      photo: "https://i.ytimg.com/vi/JJlvxCsBlZc/maxresdefault.jpg",
    },
    {
      id: "4",
      author: "Jack Dorsey",
      title: "Call for 5 minutes",
      date: dayjs("2023-11-23:14:40.000Z"),
      photo:
        "https://variety.com/wp-content/uploads/2016/07/twitter-jack-dorsey-e1533736603829.jpg?w=1000",
    },
    {
      id: "5",
      author: "Brian Armstrong",
      title: "Call for 30 minutes",
      date: dayjs("2023-11-25:07:30.000Z"),
      photo:
        "https://image.cnbcfm.com/api/v1/image/106868259-1618418339934-gettyimages-1144022591-775341711SF057_Consensus_20.jpeg?v=1677677401",
    },
    {
      id: "6",
      author: "Roger Ver",
      title: "Call for 15 minutes",
      date: dayjs("2023-12-11T10:30:00.000Z"),
      photo:
        "https://imageio.forbes.com/specials-images/imageserve/5dfd7bac4e2917000783a37e/Executive-Chairman-of-Bitcoin-com/960x0.jpg?format=jpg&width=960",
    },
  ];

  return (
    <MainLayout>
      <Content title="Your NFT-tickets" menu={[]}>
        <NftList list={nftList} />
      </Content>
    </MainLayout>
  );
};
