import { useEffect, useState } from "react";
import { monsterContract } from "../hooks/useContract";

export const useMonstersInactive = (user) => {
  const [monsters, setMonsters] = useState([]);
  const [loading, setLoading] = useState(true);
  const monsterHandler = monsterContract();
  function intoString(value) {
    return value.toString();
  }
  async function getMonsters() {
    const monstersDetails = await monsterHandler.getMonstersDetails(user);
    const filteredMonsters = monstersDetails.filter(
      (monster) => intoString(monster.status) === "0"
    );
    setMonsters(filteredMonsters);
    setLoading(false);
  }

  useEffect(() => {
    getMonsters();
  }, []);

  return { monsters, loading };
};

export const useMonstersAll = (user) => {
  const [monsters, setMonsters] = useState([]);
  const [loading, setLoading] = useState(true);
  const monsterHandler = monsterContract();
  async function getMonsters() {
    await monsterHandler.getMonstersDetails(user).then((monsters) => {
      setMonsters(monsters);
    });
    setLoading(false);
  }

  useEffect(() => {
    getMonsters();
  }, []);

  return { monsters, loading };
};
