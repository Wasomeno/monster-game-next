import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const BackToMapButton = () => {
  const route = useRouter().pathname;
  if (route === "/") return;
  return (
    <div>
      <Link
        href={"/"}
        id="back-map-button"
        className="border-light p-2 px-3 text-white rounded-pill"
      >
        Go to Map
      </Link>
    </div>
  );
};

export default BackToMapButton;
