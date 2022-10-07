import React from "react";
import CardCSS from "./card.module.css";
import { UserContext } from "../../context/user.context";
import { useContext } from "react";

const Card = ({ monster, onChange }) => {
  const { avatarId } = useContext(UserContext);
  const { name, id } = monster;
  return (
    <div
      className={`${CardCSS.cardContainer} ${
        avatarId === id ? CardCSS.selected : undefined
      }`}
      key={id}
    >
      <img
        alt={name}
        src={`https://robohash.org/${id}?set=set1&size=180x180`}
        onClick={() => onChange(id)}
      />
    </div>
  );
};

export default Card;
