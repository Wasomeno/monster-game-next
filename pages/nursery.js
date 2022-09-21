import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PageCanvas from "../components/PageCanvas";
import { usersDataContract } from "../hooks/useContract";
import RegisterModal from "../components/RegisterModal";

const Nursery = () => {
  const router = useRouter();

  return (
    <>
      <RegisterModal />
      <PageCanvas path={router.pathname} />
    </>
  );
};

export default Nursery;
