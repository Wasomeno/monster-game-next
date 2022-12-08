import Image from "next/image";
import React from "react";

const ProfilePictureCard = ({
  picture,
  selectedPicture,
  setSelectedPicture,
}) => {
  return (
    <div
      className={
        (picture === selectedPicture ? "bg-slate-500" : "") +
        " col-span-2 h-32 m-1 border-2 border-white flex justify-center items-end rounded cursor-pointer transition duration-300 ease-in-out hover:bg-slate-500"
      }
      onClick={() => setSelectedPicture(picture)}
    >
      <Image
        src={"/profile/profile_" + picture + ".png"}
        width={"100"}
        height={"100"}
      />
    </div>
  );
};

export default ProfilePictureCard;
