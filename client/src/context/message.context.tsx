// @ts-nocheck
import { createContext, useState } from "react";

export const MessageContext = createContext({
  currentMessage: null,
  setCurrentMessage: () => {},
  messageList: [],
  setMessageList: () => {},
});
export const MessageProvider = ({ children }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const value = {
    currentMessage,
    setCurrentMessage,
    messageList,
    setMessageList,
  };
  return (
    <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
  );
};
