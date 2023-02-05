import { AnimatePresence, motion } from "framer-motion";

import { BackButton } from "./Buttons/Buttons";

const Modal = ({ show, toggleShow, children }) => {
  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            className="absolute top-0 z-10 h-screen w-screen bg-slate-800 bg-opacity-60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "tween", duration: 0.25 }}
          />
          <motion.div
            className="modal z-15 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-slate-900 p-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "tween", duration: 0.25 }}
          >
            <BackButton onClick={() => toggleShow()} />
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
