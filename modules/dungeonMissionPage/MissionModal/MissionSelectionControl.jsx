import React from "react";

const MissionSelectionControl = ({ monstersAmount, mission, setMission }) => {
  function decrement() {
    if (mission === 1) return;
    setMission((current) => current - 1);
  }

  function increment() {
    if (mission === 2) return;
    setMission((current) => current + 1);
  }

  return (
    <div className="w-3/12 h-28 flex flex-col justify-center items-center border-white border-opacity-25 border-2 rounded mx-1">
      <h5 className="m-0 text-white text-center font-monogram">
        Mission Types
      </h5>
      <div className="flex w-full justify-around items-center">
        {monstersAmount > 0 ? (
          <p id="text" className="text-white">
            You're on a mission
          </p>
        ) : (
          <>
            <button
              className="w-1/12 p-1 bg-white font-monogram rounded"
              onClick={decrement}
            >
              {"<"}
            </button>
            <div className="w-6/12">
              <h5 className="text-white m-0 mx-1 text-center font-monogram text-lg">
                {mission === 1 ? "Beginner" : "Intermediate"}
              </h5>
            </div>
            <button
              className="w-1/12 p-1 bg-white font-monogram rounded"
              onClick={increment}
            >
              {">"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MissionSelectionControl;
