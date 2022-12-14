// @ts-nocheck
import { createContext, useState } from "react";

export const UserContext = createContext({
  userName: null,
  setUserName: (_userName) => {},
  room: null,
  setRoom: (_room) => {},
  avatarId: null,
  setAvatarId: (_id) => {},
  showChat: null,
  setShowChat: () => {},
});
export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [avatarId, setAvatarId] = useState("");
  const [showChat, setShowChat] = useState(false);

  const value = {
    userName,
    setUserName,
    room,
    setRoom,
    avatarId,
    setAvatarId,
    showChat,
    setShowChat,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
