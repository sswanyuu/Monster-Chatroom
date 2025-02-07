import React, { useContext } from "react";
import MessageCSS from "./message.module.css";
import { UserContext } from "../../context/user.context";
import { MessageContext } from "../../context/message.context";
import ScrollToBottom from "react-scroll-to-bottom";
function Message() {
  const { userName } = useContext(UserContext);
  const { messageList } = useContext(MessageContext);
  const getMessageBackgroundColor = (classification) => {
    const colorDic = {
      POSITIVE: { HUE: 162, SATURATION: 80, BASE_LIGHTNESS: 70 },
      NEGATIVE: { HUE: 15, SATURATION: 80, BASE_LIGHTNESS: 70 },
    };

    const { HUE, SATURATION, BASE_LIGHTNESS } = colorDic[classification.label];
    const adjustedLightness =
      BASE_LIGHTNESS - Math.abs(classification.score) * 10;

    return `hsl(${HUE}, ${SATURATION}%, ${adjustedLightness}%)`;
  };
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
                <img
                  className={MessageCSS.avatar}
                  src={message.avatarUrl}
                  alt="avatar"
                />
              </div>
            )}
            <div className={MessageCSS.textBox}>
              {userName === message.author ? null : (
                <span id={MessageCSS.author}>{message.author}</span>
              )}
              <div className={MessageCSS.aboutTime}>
                <div
                  className={MessageCSS.messageContent}
                  style={
                    message.classification.score > 0.7
                      ? {
                          background: getMessageBackgroundColor(
                            message.classification
                          ),
                        }
                      : null
                  }
                >
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
