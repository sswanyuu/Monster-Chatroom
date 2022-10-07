// @ts-nocheck
import React, { useContext, useEffect } from "react";
import { ReactComponent as SendIcon } from "../../../src/paper-plane-regular.svg";
import ChatRoomCSS from "./chat.module.css";
import Message from "../message/message.component";
import { UserContext } from "../../context/user.context";
import { MessageContext } from "../../context/message.context";

function Chat({ socket }) {
  const { room, userName, avatarId } = useContext(UserContext);
  const { currentMessage, setCurrentMessage, setMessageList } =
    useContext(MessageContext);
  const changeMessage = (event) => {
    setCurrentMessage(event.target.value);
  };

  const sendMessage = () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: userName,
        avatarUrl:
          "https://robohash.org/" + avatarId + "?set=set1&size=180x180",
        message: currentMessage,
        id: socket.id,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      socket.emit("send_message", messageData);
      setCurrentMessage("");
      setMessageList((prevList) => [...prevList, messageData]);
    } else {
      alert("Write some messages!");
    }
  };
  const enterPress = (event) => {
    event.key === "Enter" && sendMessage();
  };
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((prevList) => [...prevList, data]);
    });
    setCurrentMessage("");
  }, [socket, setMessageList, setCurrentMessage]);

  return (
    <div className={ChatRoomCSS.chatWindow}>
      <div className={ChatRoomCSS.chatHeader}>
        <p>Live Chat : {room}</p>
      </div>
      <div className={ChatRoomCSS.chatBody}>
        <Message />
      </div>
      <div className={ChatRoomCSS.chatFooter}>
        <input
          type="text"
          placeholder="Hey!"
          value={currentMessage}
          onChange={changeMessage}
          onKeyPress={enterPress}
        />
        <button>
          <SendIcon className={ChatRoomCSS.sendIcon} onClick={sendMessage} />
        </button>
      </div>
    </div>
  );
}
export default Chat;
