import React, { useEffect, useState } from "react";

const SorryPage = () => {
  const [width, setWidth] = useState(1200);

  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, [width]);

  return (
    <div className="h-screen w-screen bg-slate-100 flex flex-col gap-3 justify-center items-center">
      <h1 className="font-monogram text-2xl tracking-wider">
        Responsiveness is On The Way
      </h1>
      <p className="font-monogram text-lg tracking-wide">
        {" "}
        Still trying to find the solution for canvas responsiveness
      </p>
      <p className="font-monogram text-xl tracking-wider">Sorry :(</p>
    </div>
  );
};

export default SorryPage;
