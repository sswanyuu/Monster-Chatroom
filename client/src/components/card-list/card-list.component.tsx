//import format
import React, { useContext, useEffect } from "react";
import CardListCSS from "./card-list.module.css";
import Card from "../card/card.component";
import { UserContext } from "../../context/user.context";
import { MonsterContext } from "../../context/monster.context";
const CardList = () => {
  const { setAvatarId } = useContext(UserContext);
  const { monsters, setMonsters, setRandomNameList } =
    useContext(MonsterContext);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => {
        return setMonsters(users);
      });
  }, [setMonsters]);
  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then((response) => response.json())
      .then((ricks) => {
        const ricksData = ricks.results.map((rick) => {
          return rick.name;
        });
        // @ts-ignore
        setRandomNameList(ricksData);
      });
  }, [setRandomNameList]);
  const chooseAvatar = (id: number) => {
    setAvatarId(id);
  };
  return (
    <div>
      <div className={CardListCSS.background} style={{ backgroundImage: `url("/background.jpg")`}}>
      </div>
      <h1 className={CardListCSS.title}>Monster Chat</h1>
      <div className={CardListCSS.cardListContainer}>
        <div className={CardListCSS.cardList}>
          {monsters.map((monster) => {
            return (
              <Card
                key={monster.id}
                monster={monster}
                onChange={chooseAvatar}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CardList;
