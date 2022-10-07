// @ts-nocheck
import { createContext, useState } from "react";

export const MonsterContext = createContext({
  monsters: [],
  setMonsters: () => {},
  randomNameList: [],
  setRandomNameList: () => {},
});
export const MonsterProvider = ({ children }) => {
  const [monsters, setMonsters] = useState([]);
  const [randomNameList, setRandomNameList] = useState([]);
  const value = {
    monsters,
    setMonsters,
    randomNameList,
    setRandomNameList,
  };
  return (
    <MonsterContext.Provider value={value}>{children}</MonsterContext.Provider>
  );
};
