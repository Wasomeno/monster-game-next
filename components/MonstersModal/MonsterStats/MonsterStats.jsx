import React, { useEffect, useState } from "react";

import statuses from "../statusMap";
import Stat from "./Stat";

export const MonsterStats = ({ monsterDetails }) => {
  const [statusText, setStatusText] = useState();

  useEffect(() => {
    if (!monsterDetails.isLoading) {
      const { text } = statuses.get(monsterDetails.data?.status);
      setStatusText(text);
    }
  }, [monsterDetails.isLoading]);

  return (
    <div className="flex w-5/12 flex-col gap-3 rounded-md border-4 border-slate-500 bg-slate-700 bg-opacity-40 p-2">
      <div>
        <h2 className="font-monogram text-center text-2xl text-white">
          Monster Stats
        </h2>
      </div>
      <Stat
        stat={"Level"}
        value={monsterDetails.data?.level}
        maxValue={10}
        bar
      />
      <Stat
        stat={"Energy"}
        value={monsterDetails.data?.energy}
        maxValue={monsterDetails.data?.energyCap}
        bar
      />
      <Stat
        stat={"Exp"}
        maxValue={monsterDetails.data?.expCap}
        value={monsterDetails.data?.exp}
        bar
      />
      <Stat stat={"Status"} value={statusText} />
      <Stat
        stat={"Cooldown"}
        value={
          monsterDetails.data?.cooldown > Date.now() / 1000
            ? "On Cooldown"
            : "No Cooldown"
        }
      />
    </div>
  );
};
