import React from "react";
import useToggle from "../../hooks/useToggle";
import { StartActivityButton } from "../Buttons/Buttons";
import { ModalTitle, Paragraph } from "../Texts";
import Modal from "../Modal";
import RegisterModal from "./RegisterModal";
import { motion } from "framer-motion";

const NotRegisteredModal = () => {
  const [showRegister, toggleShowRegister] = useToggle(false);
  return (
    <>
      <motion.div
        className="h-screen w-screen bg-slate-800 bg-opacity-60 absolute z-10 top-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "tween", duration: 0.25 }}
      />
      <motion.div
        className="w-96 h-96 p-3 absolute z-15 bg-slate-900 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 rounded-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "tween", duration: 0.25 }}
      >
        <div className="flex flex-col gap-3 justify-center items-center h-full">
          <div className="text-center">
            <ModalTitle>You are new to the game!</ModalTitle>
          </div>
          <div className="text-center">
            <Paragraph>
              You need to be registered first before playing the game.
            </Paragraph>
          </div>
          <div className="w-full flex justify-center">
            <StartActivityButton
              size="medium"
              text={"Register"}
              onClick={() => toggleShowRegister()}
            />
          </div>
        </div>
      </motion.div>
      {showRegister && (
        <Modal show={showRegister} toggleShow={toggleShowRegister}>
          <RegisterModal />
        </Modal>
      )}
    </>
  );
};

export default NotRegisteredModal;
