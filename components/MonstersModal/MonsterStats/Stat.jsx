import React from "react";

import { Paragraph } from "../../Texts";
import StatsBar from "./StatsBar";

const Stat = ({ stat, bar, value, maxValue }) => {
  return (
    <div className="flex flex-col items-center justify-evenly">
      <Paragraph>{stat}</Paragraph>
      {bar && <StatsBar value={value} maxValue={maxValue} />}
      {!bar && (
        <div className="rounded-md bg-slate-700 p-1 px-3">
          <Paragraph>{value}</Paragraph>
        </div>
      )}
    </div>
  );
};

export default Stat;
