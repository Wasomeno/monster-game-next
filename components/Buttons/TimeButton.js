import { useEffect, useState } from "react";
import { DangerButton, StartActivityButton } from "./Buttons";

const TimeButton = ({ timeData, onClick }) => {
  const { data: time, isFetching, isLoading, isFetched } = timeData;
  const timeInHours = (time) => {
    const hour = Math.floor(Math.abs(time / 3600));
    const minutes = Math.floor(Math.abs(hour * 3600 + time) / 60);
    return hour + " Hours" + " " + minutes + " Minutes";
  };

  const timeInMinutes = (time) => {
    const minutes = Math.floor(Math.abs(time / 60));
    const seconds = Math.abs(time + minutes * 60);
    return minutes + " Minutes" + " " + seconds + " Seconds";
  };

  return time >= 0 ? (
    <StartActivityButton
      onClick={onClick}
      text="Finish"
      loading={isFetching || isLoading}
    />
  ) : (
    <DangerButton
      condition={time <= 0}
      text={time < -3600 ? timeInHours(time) : timeInMinutes(time)}
      loading={isFetching || isLoading}
    />
  );
};

export default TimeButton;
