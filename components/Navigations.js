import React, { useContext, useEffect, useState } from "react";
import AppContext from "./AppContext";
import MapButton from "./MapButton";
import NotConnected from "./NotConnected";
import UserPanel from "./UserPanel";

const Navigation = () => {
  const connection = useContext(AppContext);
  const account = connection.account;
  const isConnected = Boolean(account[0]);

  return (
    <>
      {!isConnected ? (
        <NotConnected />
      ) : (
        <>
          <UserPanel /> <MapButton />
        </>
      )}
    </>
  );
};

export default Navigation;
