import React, { useContext } from "react";
import AppContext from "../contexts/AppContext";
import MapButton from "./MapButton";
import UserPanel from "./UserPanel";

const Navigation = () => {
  return (
    <>
      <UserPanel /> <MapButton />
    </>
  );
};

export default Navigation;
