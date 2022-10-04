import React, { useContext, useEffect, useState } from "react";
import {
  dungeonTime,
  missionTime,
  nurseryTime,
  smeltingTime,
} from "../helpers/getTime";
import AppContext from "./AppContext";

const TimeButton = ({ path, onClick, width }) => {
  const user = useContext(AppContext).account[0];
  const timeFunctions = new Map([
    ["mission", missionTime(user)],
    ["nursery", nurseryTime(user)],
    ["dungeon", dungeonTime(user)],
    ["smelter", smeltingTime(user)],
  ]);
  const [time, setTime] = useState(null);

  async function getTime() {
    const timeFetched = Math.abs(await timeFunctions.get(path));
    setTime(timeFetched);
    console.log(timeFetched);
  }

  useEffect(() => {
    getTime();
    console.log(width);
  }, []);

  return (
    <button
      disabled={time <= 0 ? false : true}
      id="text"
      className={
        time <= 0
          ? "btn btn-success p-2 m-2 " + width
          : "btn btn-danger p-2 m-2 " + width
      }
      onClick={onClick}
    >
      <h5 className="m-0 p-0">
        {time <= 0
          ? "Finish"
          : time > 60
          ? Math.floor(time / 60) + " Hours"
          : time + " Minutes"}
      </h5>
    </button>
  );
};

export default TimeButton;
