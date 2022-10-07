import React, { useContext } from "react";
import MessageCSS from "./message.module.css";
import { UserContext } from "../../context/user.context";
import { MessageContext } from "../../context/message.context";
import ScrollToBottom from "react-scroll-to-bottom";
function Message({}) {
  const { userName } = useContext(UserContext);
  const { messageList } = useContext(MessageContext);
  return (
    <ScrollToBottom className={MessageCSS.messageContainer}>
      {messageList.map((message, index) => {
        return (
          <div
            key={index}
            className={MessageCSS.message}
            id={MessageCSS[userName === message.author ? "you" : "other"]}
          >
            {userName === message.author ? null : (
              <div className={MessageCSS.avatarCircle}>
                <img className={MessageCSS.avatar} src={message.avatarUrl} />
              </div>
            )}
            <div className={MessageCSS.textBox}>
              {userName === message.author ? null : (
                <span id={MessageCSS.author}>{message.author}</span>
              )}
              <div className={MessageCSS.aboutTime}>
                <div className={MessageCSS.messageContent}>
                  <p>{message.message}</p>
                </div>
                <div className={MessageCSS.messageMeta}>
                  <span id={MessageCSS.time}>{message.time} </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </ScrollToBottom>
  );
}
export default Message;
