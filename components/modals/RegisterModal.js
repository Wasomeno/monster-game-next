import React, { useContext, useRef, useState } from "react";
import useToggle from "../../hooks/useToggle";
import Modal from "./Modal";
import { useMutation, useQuery } from "@tanstack/react-query";
import { registerUser } from "../../mutations/mutations";
import { registerSides } from "../../mutations/sideffects";
import AppContext from "../../contexts/AppContext";

const RegisterModal = () => {
  const nameInput = useRef();
  const [profile, setProfile] = useState();
  const user = useContext(AppContext).account[0];
  const pictures = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const register = useMutation(
    () => registerUser(nameInput.current.value, profile),
    registerSides(user)
  );

  return (
    <Modal>
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
          ref={nameInput}
          type="text"
          className="form-control text-center w-25"
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
            style={{ width: "8rem", height: "8rem" }}
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
        <button
          className="btn btn-primary col-3"
          onClick={() => register.mutate()}
        >
          Register
        </button>
      </div>
    </Modal>
  );
};

export default RegisterModal;
