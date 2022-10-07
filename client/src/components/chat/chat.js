import React, { useEffect, useState } from "react";
import { ReactComponent as SendIcon } from "../../../src/paper-plane-regular.svg";
import ScrollToBottom from "react-scroll-to-bottom";
import ChatRoomCSS from "./chat.module.css";
import { UserContext } from "../../context/user.context";
import { useContext } from "react";

function Chat({ socket }) {
  const { room, userName } = useContext(UserContext);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const changeMessage = (event) => {
    setCurrentMessage(event.target.value);
  };

  const sendMessage = () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: userName,
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
  }, [socket]);

  return (
    <div className={ChatRoomCSS.chatWindow}>
      <div className={ChatRoomCSS.chatHeader}>
        <p>Live Chat</p>
      </div>
      <div className={ChatRoomCSS.chatBody}>
        <ScrollToBottom className={ChatRoomCSS.messageContainer}>
          {messageList.map((a, index) => {
            return (
              <div
                key={index}
                className={ChatRoomCSS.message}
                id={ChatRoomCSS[userName === a.author ? "you" : "other"]}
              >
                <div>
                  <div className={ChatRoomCSS.messageContent}>
                    <p>{a.message}</p>
                  </div>
                  <div className={ChatRoomCSS.messageMeta}>
                    <span id={ChatRoomCSS.time}>{a.time} </span>

                    {userName === a.author ? null : (
                      <span id={ChatRoomCSS.author}>{a.author}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
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
