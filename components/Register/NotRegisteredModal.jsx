import { motion } from "framer-motion";
import React from "react";

import useToggle from "../../hooks/useToggle";
import { StartActivityButton } from "../Buttons/Buttons";
import Modal from "../Modal";
import { ModalTitle, Paragraph } from "../Texts";
import RegisterModal from "./RegisterModal";

const NotRegisteredModal = () => {
  const [showRegister, toggleShowRegister] = useToggle(false);
  return (
    <>
      <motion.div
        className="absolute top-0 z-10 h-screen w-screen bg-slate-800 bg-opacity-60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "tween", duration: 0.25 }}
      />
      <motion.div
        className="z-15 absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-md bg-slate-900 p-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "tween", duration: 0.25 }}
      >
        <div className="flex h-full flex-col items-center justify-center gap-3">
          <div className="text-center">
            <ModalTitle>You are new to the game!</ModalTitle>
          </div>
          <div className="text-center">
            <Paragraph>
              You need to be registered first before playing the game.
            </Paragraph>
          </div>
          <div className="flex w-full justify-center">
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
