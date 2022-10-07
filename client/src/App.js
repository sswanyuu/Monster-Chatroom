// @ts-ignore
import io from "socket.io-client";

import { Fragment, useContext } from "react";
import { UserContext } from "./context/user.context.jsx";
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

  return showChat ? (
    <Chat socket={socket} />
  ) : (
    <Fragment>
      <CardList />
      <Join socket={socket} />
    </Fragment>
  );
}

export default App;
