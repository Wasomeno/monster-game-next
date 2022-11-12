import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import AppContext from "../contexts/AppContext";
import {
  getDungeonTime,
  getMissionTime,
  getNurseryTime,
  getSmeltingTime,
} from "../fetchers/fetchers";

const TimeButton = ({ path, onClick, width }) => {
  const user = useContext(AppContext).account[0];
  const timeFunctions = new Map([
    ["mission", getMissionTime(user)],
    ["nursery", getNurseryTime(user)],
    ["dungeon", getDungeonTime(user)],
    ["smelter", getSmeltingTime(user)],
  ]);
  const time = useQuery(["time", path], () => timeFunctions.get(path));
  return (
    <button
      id="text"
      disabled={time.data >= 0 ? false : true}
      className={
        time.data >= 0
          ? "btn btn-success p-2 m-2 " + width
          : "btn btn-danger p-2 m-2 " + width
      }
      onClick={onClick}
    >
      <h5 className="m-0 p-0">
        {time.data > 0
          ? "Finish"
          : time.data < -60
          ? Math.floor(Math.abs(time.data / 60)) + " Hours"
          : Math.abs(time.data) + " Minutes"}
      </h5>
    </button>
  );
};

export default TimeButton;
