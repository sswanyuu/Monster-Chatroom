import React, { useEffect, useState } from "react";
import { ReactComponent as SendIcon } from "../src/paper-plane-regular.svg";
import ScrollToBottom from "react-scroll-to-bottom";
function Chat({ socket, room, userName }) {
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
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((a, index) => {
            return (
              <div
                key={index}
                className="message"
                id={userName === a.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{a.message}</p>
                  </div>
                  <div className="message-meta">
                    <span id="time">{a.time} </span>

                    {userName === a.author ? null : (
                      <span id="author">{a.author}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="Hey!"
          value={currentMessage}
          onChange={changeMessage}
          onKeyPress={enterPress}
        />
        <button>
          <SendIcon className="send-icon" onClick={sendMessage} />
        </button>
      </div>
    </div>
  );
}
export default Chat;
