// @ts-nocheck
import { UserContext } from "../../context/user.context";
import { useContext } from "react";
import JoinCSS from "./join.module.css";
import { MonsterContext } from "../../context/monster.context";
function Join({ socket }) {
  const {
    avatarId,
    userName,
    setUserName,
    room,
    setRoom,
    showChat,
    setShowChat,
  } = useContext(UserContext);
  const { randomNameList } = useContext(MonsterContext);
  const enterPress = (event) => {
    event.key === "Enter" && joinRoom();
  };

  const joinRoom = () => {
    if (avatarId !== "" && userName !== "" && room !== "") {
      //emit an event (join_room), and pass the data (room)
      socket.emit("join_room", room);
      setShowChat(true);
      console.log(showChat);
    } else if (avatarId == "") {
      alert("choose an avatar!");
    } else {
      alert("fill in the blank!");
    }
  };
  const changeName = (event) => {
    console.log(event);
    setUserName(event.target.value);
  };
  const addRandomName = () => {
    const randomNumber = Math.ceil(randomNameList.length * Math.random()) - 1;
    setUserName(randomNameList[randomNumber]);
  };
  const changeRoom = (event) => {
    setRoom(event.target.value);
  };
  return (
    <div className={JoinCSS.joinChatContainer}>
      <h1>Join A Chat</h1>
      <input
        type="text"
        placeholder="Anna..."
        onChange={changeName}
        onKeyPress={enterPress}
        value={userName}
      ></input>
      <input
        type="text"
        placeholder="Room ID..."
        onChange={changeRoom}
        onKeyPress={enterPress}
      ></input>
      <button onClick={joinRoom}>Join now</button>
      <button onClick={addRandomName}>Create random name </button>
    </div>
  );
}
export default Join;
