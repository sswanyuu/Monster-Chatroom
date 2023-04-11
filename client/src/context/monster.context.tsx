// @ts-nocheck
import { createContext, useState } from "react";

interface MonsterContextType {
  monsters: any[];
  setMonsters: React.Dispatch<React.SetStateAction<any[]>>;
  randomNameList: string[];
  setRandomNameList: React.Dispatch<React.SetStateAction<string[]>>;
}

export const MonsterContext = createContext<MonsterContextType>({
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
