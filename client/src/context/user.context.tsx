// @ts-nocheck
import { createContext, useState } from "react";
interface UserContextType {
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  room: number;
  setRoom: React.Dispatch<React.SetStateAction<number>>;
  avatarId: number;
  setAvatarId: React.Dispatch<React.SetStateAction<number>>;
  showChat: boolean;
  setShowChat: React.Dispatch<React.SetStateAction<boolean>>;
}
export const UserContext = createContext<UserContextType>({
  userName: null,
  setUserName: (_userName: string) => {},
  room: null,
  setRoom: (_room: number) => {},
  avatarId: null,
  setAvatarId: (_id: number) => {},
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
