import { motion } from "framer-motion";
import MoonLoader from "react-spinners/MoonLoader";
import { useToastDetails } from "../stores/stores";

const Toast = () => {
  const [show, text, condition, loading] = useToastDetails();
  if (!show) return;
  return (
    <motion.div
      id="toast-modal"
      className="bg-dark border border-2 border-light"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "tween", duration: 0.25 }}
    >
      <div className="h-100 d-flex justify-content-around align-items-center">
        <div className="col-4 d-flex justify-content-center align-items-center">
          {condition === "success" ? (
            <img
              src="/checkmark_icon.png"
              className="p-2"
              width={"50%"}
              alt="succes-icon"
            />
          ) : condition === "error" ? (
            <img
              src="/cross_icon.png"
              className="p-2"
              width={"50%"}
              alt="error-icon"
            />
          ) : (
            <MoonLoader loading={loading} color={"#eee"} size={30} />
          )}
        </div>
        <div className="col-8">
          <h5 id="text" className="text-white m-0 text-center">
            {text}
          </h5>
        </div>
      </div>
    </motion.div>
  );
};

export default Toast;
