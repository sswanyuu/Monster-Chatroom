import React, { useEffect, useState } from "react";
import CardList from "../card-list/card-list.component";
import AvatarCSS from "./avatar.module.css";

function Avatar() {
  const [monsters, setMonsters] = useState([]);
  useEffect(() => {
    console.log("Effect is triggered");
    fetch("https://jsonplaceholder.typicode.com/users")
      //tranlate the data into json type
      .then((response) => response.json())
      .then((users) => setMonsters(users));
  }, []);

  return (
    <div>
      <h1 className={AvatarCSS.title}>Choose an avatar and join a room</h1>

      <CardList monsters={monsters} />
    </div>
  );
}

export default Avatar;
