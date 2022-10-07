import io from "socket.io-client";
import { useState } from "react";
import Chat from "./components/chat/chat.js";
import "./app.css";
import Avatar from "./components/avatar/avatar.js";
import Join from "./components/join/join.component.jsx";
import { UserProvider } from "./context/user.context.jsx";
import { MessageProvider } from "./context/message.context.jsx";
//connect to the backend
const socket = io.connect("http://localhost:3001");
function App() {
  // const [userName, setUsername] = useState("");
  // const [room, setRoom] = useState("");
  // const enterPress = (event) => {
  //   event.key === "Enter" && joinRoom();
  // };
  // const joinRoom = () => {
  //   if (userName !== "" && room !== "") {
  //     //emit an event (join_room), and pass the data (room)
  //     socket.emit("join_room", room);
  //     setShowChat(true);
  //   } else {
  //     alert("fill in the blank!");
  //   }
  // };
  // const changeName = (event) => {
  //   setUsername(event.target.value);
  // };
  // const changeRoom = (event) => {
  //   setRoom(event.target.value);
  // };
  return (
    <UserProvider>
      <MessageProvider>
        <div>
          <Avatar />
          <Join socket={socket} /> <Chat socket={socket} />
        </div>
      </MessageProvider>
    </UserProvider>
  );
}

export default App;
// (
//   <div className="join-chat-container">
//     <h1>Join A Chat</h1>
//     <input
//       type="text"
//       placeholder="Anna..."
//       onChange={changeName}
//       onKeyPress={enterPress}
//     ></input>
//     <input
//       type="text"
//       placeholder="Room ID..."
//       onChange={changeRoom}
//       onKeyPress={enterPress}
//     ></input>
//     <button onClick={joinRoom}>Join now</button>
//   </div>
// )
