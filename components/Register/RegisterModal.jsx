import { useState } from "react";

import registerUser from "@/components/reactQuery/mutations/registerUser";

import { useToast } from "../../stores/stores";
import { StartActivityButton } from "../Buttons/Buttons";
import { ModalTitle, Paragraph } from "../Texts";
import ProfilePictureCard from "./ProfilePictureCard";

const RegisterModal = () => {
  const [, toastError] = useToast();
  const [username, setUserName] = useState("");
  const [selectedPicture, setSelectedPicture] = useState(0);
  const pictures = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const register = registerUser({
    name: username,
    profileImage: selectedPicture,
  });

  const usernameHandler = (value) => {
    if (value.length >= 10) {
      toastError("Username can't be more than 10 characters");
      return;
    }
    setUserName(value);
  };

  const formHandler = () => {
    if (!username) {
      toastError("Please input your username");
    } else if (selectedPicture === 0) {
      toastError("Please select your profile picture");
    } else {
      register();
    }
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="w-8/12">
          <ModalTitle>Register</ModalTitle>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="w-full text-center">
          <Paragraph>Username</Paragraph>
          <input
            value={username}
            type="text"
            className="font-monogram w-1/4 rounded p-2 text-center text-xl"
            onChange={(e) => usernameHandler(e.target.value)}
          />
        </div>

        <div className="w-full">
          <div className="my-2 flex items-center justify-center">
            <Paragraph>Choose your Profile Picture</Paragraph>
          </div>
          <div className="flex w-full justify-center">
            <div className="grid w-5/6 grid-cols-10 overflow-y-scroll">
              {pictures.map((picture, index) => (
                <ProfilePictureCard
                  key={index}
                  picture={picture}
                  setSelectedPicture={setSelectedPicture}
                  selectedPicture={selectedPicture}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="m-4 flex w-full justify-center">
          <StartActivityButton text="Register" onClick={() => formHandler()} />
        </div>
      </div>
    </>
  );
};

export default RegisterModal;
