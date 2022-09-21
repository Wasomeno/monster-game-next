import React from "react";
import { useRouter } from "next/router";
import PageCanvas from "../components/PageCanvas";

const Dungeon = () => {
  const router = useRouter();

  return <PageCanvas path={router.pathname} />;
};

export default Dungeon;
