import { useState } from "react";

export default function () {
  const [monsterSelected, setMonsterSelected] = useState([]);

  const selectMonster = (monster) => {
    if (monsterSelected.length >= 6) return;
    let result = checkSelectedMonsters(monster);
    if (!result) return;
    setMonsterSelected((currentSelected) => [...currentSelected, monster]);
  };

  function checkSelectedMonsters(_monster) {
    let result = true;
    if (monsterSelected.length < 1) {
      setMonsterSelected((currentSelected) => [...currentSelected, _monster]);
    } else {
      for (let monster of monsterSelected) {
        if (_monster === monster) {
          result = false;
          toast.error("Monster #" + _monster + " already selected", {
            autoClose: 2000,
          });
        }
      }
      return result;
    }
  }

  function deselectMonster(monster) {
    setMonsterSelected((currentSelected) =>
      currentSelected.filter((selected) => selected !== monster)
    );
  }

  return [monsterSelected, selectMonster, deselectMonster];
}
