import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { useRef, useEffect, useState } from "react";

const Modal = ({ selector, children }) => {
  const ref = useRef();

  const [mounted, setMounted] = useState(false);

  const animations = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  };

  return (
    <>
      <motion.div
        id="modal-screen"
        className="h-100 w-100 bg-dark bg-opacity-75"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "tween", duration: 0.25 }}
      />
      <motion.div
        id="shop-modal"
        className="container-fluid w-75 h-75"
        variants={animations}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ type: "tween", duration: 0.25 }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default Modal;
