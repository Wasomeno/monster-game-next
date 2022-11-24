import React from "react";

const DurationControl = ({ monstersOnNursery, duration, setDuration }) => {
  const increment = () => {
    if (duration >= 10) return;
    setDuration((currentValue) => currentValue + 1);
  };

  const decrement = () => {
    if (duration <= 1) return;
    setDuration((currentValue) => currentValue - 1);
  };

  return (
    <div className="w-2/12 mx-2 border-2 border-white rounded-md flex flex-col justify-center">
      {monstersOnNursery > 0 ? (
        <div className="flex items-center justify-center">
          <h5 id="text" className="text-white text-center m-0 p-2">
            You're Resting
          </h5>
        </div>
      ) : (
        <>
          <h5 className="text-white text-center font-monogram text-xl">
            Duration
          </h5>
          <div className="flex justify-around items-center">
            <h5 id="modal-title" className="m-0" onClick={decrement}>
              -
            </h5>
            <h4 id="text" className="text-white m-0">
              {duration}
            </h4>
            <h5 id="modal-title" className="m-0" onClick={increment}>
              +
            </h5>
          </div>
        </>
      )}
    </div>
  );
};

export default DurationControl;
