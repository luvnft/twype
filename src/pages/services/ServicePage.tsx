import { FC } from "react";
import { useParams } from "react-router-dom";
import { MainLayout } from "@/features/layout/MainLayout/MainLayout";
import { Content } from "@/features/layout/Content/Content";
import { Service } from "@/features/services/Service/Service";

type ServicePageProps = {};

export const ServicePage: FC<ServicePageProps> = () => {
  let { serviceId } = useParams();

  const pageTitle = "Service";

  if (!serviceId) {
    return null;
  }

  return (
    <MainLayout>
      <Content>
        <Service serviceId={serviceId} />
      </Content>
    </MainLayout>
  );
};
