// @ts-nocheck
import { createContext, useState } from "react";
interface MessageContextType {
  currentMessage: string;
  setCurrentMessage: React.Dispatch<React.SetStateAction<string>>;
  messageList: any[];
  setMessageList: React.Dispatch<React.SetStateAction<any[]>>;
}
export const MessageContext = createContext<MessageContextType>({
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
