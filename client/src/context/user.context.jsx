// @ts-nocheck
import { createContext, useState } from "react";

export const UserContext = createContext({
  userName: null,
  setUserName: (_userName) => {},
  room: null,
  setRoom: (_room) => {},
  avatarId: null,
  setAvatarId: (_id) => {},
});
export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [avatarId, setAvatarId] = useState("");
  const value = { userName, setUserName, room, setRoom, avatarId, setAvatarId };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
