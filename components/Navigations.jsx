import React, { useContext } from "react";
import BackToMapButton from "./Buttons/BackToMapButton";
import UserPanel from "./UserPanel";

const Navigation = () => {
  return (
    <>
      <UserPanel /> <BackToMapButton />
    </>
  );
};

export default Navigation;
