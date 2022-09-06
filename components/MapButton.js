import React from "react";
import Link from "next/link";

const MapButton = () => {
  return (
    <div>
      <Link href={"/"}>
        <a
          id="back-map-button"
          className="border border-2 border-light p-2 px-3 text-white rounded-pill"
        >
          Go to Map
        </a>
      </Link>
    </div>
  );
};

export default MapButton;
