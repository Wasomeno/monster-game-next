import { motion } from "framer-motion";
import Image from "next/image";
import MoonLoader from "react-spinners/MoonLoader";

import { useToastDetails } from "../stores/stores";

const Toast = () => {
  const [show, text, condition, loading] = useToastDetails();
  if (!show) return;
  return (
    <motion.div
      className="absolute bottom-3 left-1/2 z-30 h-20 w-4/12 -translate-x-1/2 rounded-md border-2 border-slate-400 bg-slate-800 p-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "tween", duration: 0.25 }}
    >
      <div className="flex h-full items-center justify-center gap-4">
        <div className="flex w-2/12 items-center justify-center">
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
          <h5 className="font-monogram m-0 text-center text-2xl text-white">
            {text}
          </h5>
        </div>
      </div>
    </motion.div>
  );
};

export default Toast;
