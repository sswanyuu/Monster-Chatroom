import React from "react";
import CardListCSS from "./card-list.module.css";
import Card from "../card/card.component";
const CardList = ({ monsters }) => {
  console.log({ monsters });
  return (
    <div className={CardListCSS.cardListContainer}>
      <div className={CardListCSS.cardList}>
        {monsters.map((monster) => {
          //don't forget the "return"
          return <Card monster={monster} />;
        })}
      </div>
    </div>
  );
};

//allow other file to import
export default CardList;
