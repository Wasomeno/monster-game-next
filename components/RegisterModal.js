import React, { useContext, useEffect, useState } from "react";
import { usersDataContract } from "../hooks/useContract";
import { motion } from "framer-motion";
import { ethers } from "ethers";
import AppContext from "./AppContext";
import useToggle from "../hooks/useToggle";
import { useUserStatus } from "../hooks/useAccount";

const RegisterModal = () => {
  const [isRegistered, setIsRegistered] = useState(true);
  const [name, setName] = useState("");
  const [profile, setProfile] = useState("");
  const [showRegister, toggleShowRegister] = useToggle(true);
  const pictures = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const connection = useContext(AppContext);
  const user = connection.account[0];
  const isConnected = Boolean(user);

  const isBrowser = () => {
    return typeof window !== undefined;
  };

  const register = async () => {
    const userDataHandler = usersDataContract();
    const nameToBytes = ethers.utils.formatBytes32String(name);
    const profileToBytes = ethers.utils.formatBytes32String(profile.toString());
    await userDataHandler.register(nameToBytes, profileToBytes);
  };

  useEffect(() => {
    if (isBrowser && isConnected) {
      setIsRegistered(useUserStatus(user));
    }
  }, [isConnected]);

  if (isRegistered || !showRegister) return;
  return (
    <>
      <motion.div
        id="modal-screen"
        className="h-100 w-100 bg-dark bg-opacity-75"
        onClick={toggleShowRegister}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "tween", duration: 0.25 }}
      />
      <motion.div
        id="register-modal"
        className="container w-75"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "tween", duration: 0.25 }}
      >
        <div className="row justify-content-center align-items-center">
          <div className="col-2"></div>
          <div className="col-8">
            <h2 id="modal-title" className="m-0 p-3 text-center">
              Register
            </h2>
          </div>
          <div className="col-2"></div>
        </div>
        <div className="row flex-column justify-content-center align-items-center">
          <h3 id="text" className="m-2 text-center text-white">
            Name
          </h3>
          <input
            type="text"
            className="form-control text-center w-25"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="row justify-content-center align-items-center my-2">
          <h3 id="text" className="m-2 text-center text-white">
            Choose your Profile
          </h3>
        </div>
        <div
          className="row justify-content-center align-items-center"
          style={{ overflow: "scroll" }}
        >
          {pictures.map((picture, index) => (
            <div
              id={
                picture === profile
                  ? "profile-select-card-active"
                  : "profile-select-card"
              }
              key={index}
              className="m-1 border border-2 border-light d-flex justify-content-center align-items-end"
              style={{ width: "10rem", height: "10rem" }}
              onClick={() => setProfile(picture)}
            >
              <img
                src={"/profile/profile_" + picture + ".png"}
                width={"100%"}
                height={"95%"}
              />
            </div>
          ))}
        </div>
        <div className="row justify-content-center m-4">
          <button className="btn btn-primary col-3" onClick={register}>
            Register
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default RegisterModal;
