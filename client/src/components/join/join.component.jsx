// @ts-nocheck
import { UserContext } from "../../context/user.context";
import { useContext } from "react";

function Join({ socket }) {
  const { avatarId, userName, setUserName, room, setRoom } =
    useContext(UserContext);
  const enterPress = (event) => {
    event.key === "Enter" && joinRoom();
  };

  const joinRoom = () => {
    if (avatarId !== "" && userName !== "" && room !== "") {
      //emit an event (join_room), and pass the data (room)
      socket.emit("join_room", room);
    } else {
      alert("fill in the blank!");
    }
  };
  const changeName = (event) => {
    console.log(event);
    setUserName(event.target.value);
  };
  const changeRoom = (event) => {
    setRoom(event.target.value);
  };
  return (
    <div className="join-chat-container">
      <h1>Join A Chat</h1>
      <input
        type="text"
        placeholder="Anna..."
        onChange={changeName}
        onKeyPress={enterPress}
      ></input>
      <input
        type="text"
        placeholder="Room ID..."
        onChange={changeRoom}
        onKeyPress={enterPress}
      ></input>
      <button onClick={joinRoom}>Join now</button>
    </div>
  );
}
export default Join;
