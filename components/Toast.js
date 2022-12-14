import { motion } from "framer-motion";
import Image from "next/image";
import MoonLoader from "react-spinners/MoonLoader";
import { useToastDetails } from "../stores/stores";

const Toast = () => {
  const [show, text, condition, loading] = useToastDetails();
  if (!show) return;
  return (
    <motion.div
      className="bg-slate-800 border-2 border-slate-400 absolute z-30 bottom-3 w-4/12 h-20 p-2 rounded-md -translate-x-1/2 left-1/2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "tween", duration: 0.25 }}
    >
      <div className="flex justify-center gap-4 items-center h-full">
        <div className="w-2/12 flex justify-center items-center">
          {condition === "success" ? (
            <Image
              src="/icons/checkmark_icon.png"
              className="p-2"
              width={"50"}
              height={"50"}
              alt="success-icon"
            />
          ) : condition === "error" ? (
            <Image
              src="/icons/cross_icon.png"
              className="p-2"
              width={"50"}
              height={"50"}
              alt="error-icon"
            />
          ) : (
            <MoonLoader loading={loading} color={"#fff"} size={30} />
          )}
        </div>
        <div className="w-8/12">
          <h5 className="text-white m-0 text-center font-monogram text-2xl">
            {text}
          </h5>
        </div>
      </div>
    </motion.div>
  );
};

export default Toast;
