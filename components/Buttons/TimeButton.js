import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import AppContext from "../contexts/AppContext";
import {
  getDungeonTime,
  getMissionTime,
  getNurseryTime,
  getSmeltingTime,
} from "../fetchers/fetchers";
import { DangerButton, StartActivityButton } from "../Buttons/Buttons";

const TimeButton = ({ path, onClick }) => {
  const user = useContext(AppContext).account[0];
  const timeFunctions = new Map([
    ["mission", getMissionTime(user)],
    ["nursery", getNurseryTime(user)],
    ["dungeon", getDungeonTime(user)],
    ["smelter", getSmeltingTime(user)],
  ]);
  const time = useQuery(["time", path], () => timeFunctions.get(path));
  return time.data >= 0 ? (
    <StartActivityButton
      onClick={onClick}
      text={
        time.data > 0
          ? "Finish"
          : time.data < -60
          ? Math.floor(Math.abs(time.data / 60)) + " Hours"
          : Math.abs(time.data) + " Minutes"
      }
    />
  ) : (
    <DangerButton
      condition={time.data >= 0}
      text={
        time.data > 0
          ? "Finish"
          : time.data < -60
          ? Math.floor(Math.abs(time.data / 60)) + " Hours"
          : Math.abs(time.data) + " Minutes"
      }
    />
  );
};

export default TimeButton;
