import Image from "next/image";
import React from "react";

const BackButton = ({ onClick }) => {
  return (
    <button className="p-3" onClick={onClick}>
      <Image
        src="/icons/back_icon.png"
        width={"40px"}
        height={"30px"}
        alt="back-img"
      />
    </button>
  );
};

export default BackButton;
