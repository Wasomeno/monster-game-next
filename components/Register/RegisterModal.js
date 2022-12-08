import { useState } from "react";
import Modal from "../Modal";
import { ModalTitle, Paragraph } from "../Texts";
import { StartActivityButton } from "../Buttons/Buttons";
import ProfilePictureCard from "./ProfilePictureCard";
import registerUser from "../../lib/mutations/registerUser";
import { useToast } from "../../stores/stores";

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
      <div className="flex justify-center items-center">
        <div className="w-8/12">
          <ModalTitle>Register</ModalTitle>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="w-full text-center">
          <Paragraph>Username</Paragraph>
          <input
            value={username}
            type="text"
            className="w-1/4 rounded p-2 text-center font-monogram text-xl"
            onChange={(e) => usernameHandler(e.target.value)}
          />
        </div>

        <div className="w-full">
          <div className="flex justify-center items-center my-2">
            <Paragraph>Choose your Profile Picture</Paragraph>
          </div>
          <div className="flex justify-center w-full">
            <div className="grid grid-cols-10 overflow-y-scroll w-5/6">
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

        <div className="flex justify-center m-4 w-full">
          <StartActivityButton text="Register" onClick={() => formHandler()} />
        </div>
      </div>
    </>
  );
};

export default RegisterModal;
