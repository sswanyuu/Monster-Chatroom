import React, { useContext } from "react";
import CardCSS from "./card.module.css";
import { UserContext } from "../../context/user.context";

interface CardProps {
  monster: {
    id: number;
    name: string;
  };
  onChange: (id: number) => void;
}

const Card: React.FC<CardProps> = ({ monster, onChange }) => {
  const { avatarId } = useContext(UserContext);
  const { name, id } = monster;

  return (
    <div
      className={`${CardCSS.cardContainer} ${
        avatarId === id ? CardCSS.selected : ""
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
