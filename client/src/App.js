// @ts-ignore
import io from "socket.io-client";
import { UserProvider } from "./context/user.context.jsx";
import { MessageProvider } from "./context/message.context.jsx";
import { MonsterProvider } from "./context/monster.context.jsx";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/user.context.jsx";
import { MonsterContext } from "./context/monster.context.jsx";
import Chat from "./components/chat/chat.js";
import "./app.css";
import CardList from "./components/card-list/card-list.component.jsx";
import Join from "./components/join/join.component.jsx";

//connect to the backend
const socket = io.connect("http://localhost:3001");
function App() {
  // @ts-ignore
  const { showChat } = useContext(UserContext);
  // @ts-ignore

  return (
    <MonsterProvider>
      <UserProvider>
        <MessageProvider>
          <CardList />
          <Join socket={socket} />
          <Chat socket={socket} />
          {/* {showChat ? (
            <Chat socket={socket} />
          ) : (
            <div>
              <Avatar />
              <Join socket={socket} />
            </div>
          )} */}
        </MessageProvider>
      </UserProvider>
    </MonsterProvider>
  );
}

export default App;
