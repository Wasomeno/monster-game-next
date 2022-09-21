import React from "react";
import { useRouter } from "next/router";
import PageCanvas from "../components/PageCanvas";
import RegisterModal from "../components/RegisterModal";

const CityHall = () => {
  const router = useRouter();
  return (
    <>
      <RegisterModal />
      <PageCanvas path={router.pathname} />
    </>
  );
};

export default CityHall;
