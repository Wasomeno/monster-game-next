import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PageCanvas from "../components/PageCanvas";

const Nursery = () => {
  const router = useRouter();

  return (
    <>
      <PageCanvas path={router.pathname} />
    </>
  );
};

export default Nursery;
