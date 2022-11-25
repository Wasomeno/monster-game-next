import { motion } from "framer-motion";

const ModalButton = ({ text, y, x, onClick }) => {
  return (
    <motion.div
      id="modal-button"
      className="col-4"
      initial={{ top: y }}
      animate={{ top: `calc(${y} + 10px)` }}
      transition={{
        repeat: "Infinity",
        repeatType: "reverse",
        duration: 1,
      }}
      style={{ top: y, left: x }}
    >
      <button onClick={onClick}>
        <div id="npc-button">
          <span id="npc-button-text">{text}</span>
        </div>
      </button>
    </motion.div>
  );
};

export default ModalButton;
