import React from "react";
import CardCSS from "./card.module.css";

const Card = ({ monster }) => {
  const { name, id } = monster;
  return (
    <div className={CardCSS.cardContainer} key={id}>
      <img
        alt={name}
        src={`https://robohash.org/${id}?set=set1&size=180x180`}
      />
    </div>
  );
};

export default Card;
