import React, { useContext } from "react";
import CardListCSS from "./card-list.module.css";
import Card from "../card/card.component";
import { UserContext } from "../../context/user.context";

const CardList = ({ monsters }) => {
  const { setAvatarId } = useContext(UserContext);
  const chooseAvatar = (id) => {
    setAvatarId(id);
  };
  console.log({ monsters });
  return (
    <div className={CardListCSS.cardListContainer}>
      <div className={CardListCSS.cardList}>
        {monsters.map((monster) => {
          return <Card monster={monster} onChange={chooseAvatar} />;
        })}
      </div>
    </div>
  );
};

//allow other file to import
export default CardList;
