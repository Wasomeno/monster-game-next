import React, { useContext, useRef, useState } from "react";
import Modal from "../Modal";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../mutations/mutations";
import { registerSides } from "../../mutations/sideffects";
import AppContext from "../../contexts/AppContext";
import { ModalTitle, Paragraph } from "../Texts";
import { StartActivityButton } from "../Buttons/Buttons";
import ProfilePictureCard from "./ProfilePictureCard";

const RegisterModal = ({ status }) => {
  const nameInput = useRef();
  const [selectedPicture, setSelectedPicture] = useState();
  const user = useContext(AppContext).account[0];
  const pictures = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const register = useMutation(
    () => registerUser(nameInput.current.value, selectedPicture),
    registerSides(user)
  );

  return (
    <Modal show={!status}>
      <div className="flex justify-center items-center">
        <div className="w-8/12">
          <ModalTitle>Register</ModalTitle>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <Paragraph>Name</Paragraph>
        <input
          ref={nameInput}
          type="text"
          className="w-1/4 rounded p-2 text-center"
        />
      </div>
      <div className="flex justify-center items-center my-2">
        <Paragraph>Choose your Profile Picture</Paragraph>
      </div>
      <div className="flex flex-wrap justify-center items-center overflow-y-scroll">
        {pictures.map((picture, index) => (
          <ProfilePictureCard
            key={index}
            picture={picture}
            setSelectedPicture={setSelectedPicture}
            selectedPicture={selectedPicture}
          />
        ))}
      </div>
      <div className="flex justify-center m-4">
        <StartActivityButton
          text="Register"
          onClick={() => register.mutate()}
        />
      </div>
    </Modal>
  );
};

export default RegisterModal;
