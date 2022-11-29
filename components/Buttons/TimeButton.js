import { DangerButton, StartActivityButton } from "./Buttons";
import useActivityTime from "../../fetchers/useActivityTime";

const TimeButton = ({ activity, onClick }) => {
  const { data: time, isLoading, isError } = useActivityTime(activity);
  return time >= 0 ? (
    <StartActivityButton
      onClick={onClick}
      text={
        time > 0
          ? "Finish"
          : time < -60
          ? Math.floor(Math.abs(time / 60)) + " Hours"
          : Math.abs(time) + " Minutes"
      }
    />
  ) : (
    <DangerButton
      condition={time >= 0}
      text={
        time > 0
          ? "Finish"
          : time < -60
          ? Math.floor(Math.abs(time / 60)) + " Hours"
          : Math.abs(time) + " Minutes"
      }
    />
  );
};

export default TimeButton;
