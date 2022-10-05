import io from "socket.io-client";
import { useState } from "react";
import Chat from "./chat.js";
import Photo from "./photo.js";
import "./app.css";
//connect to the backend
const socket = io.connect("http://localhost:3001");
function App() {
  const [userName, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const enterPress = (event) => {
    event.key === "Enter" && joinRoom();
  };
  const joinRoom = () => {
    if (userName !== "" && room !== "") {
      //emit an event (join_room), and pass the data (room)
      socket.emit("join_room", room);
      setShowChat(true);
    } else {
      alert("fill in the blank!");
    }
  };
  const changeName = (event) => {
    setUsername(event.target.value);
  };
  const changeRoom = (event) => {
    setRoom(event.target.value);
  };

  return (
    <div className="App">
      {!showChat ? (
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
      ) : (
        <Chat socket={socket} room={room} userName={userName} />
      )}
    </div>
  );
}

export default App;
