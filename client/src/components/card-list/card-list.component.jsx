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
    console.log("Effect is triggered");
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => {
        return setMonsters(users);
      });
  }, []);
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
  }, []);
  const chooseAvatar = (id) => {
    setAvatarId(id);
  };
  return (
    <div>
      <h1 className={CardListCSS.title}>Choose an avatar and join a room</h1>
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
