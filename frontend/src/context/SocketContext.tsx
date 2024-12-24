import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import * as io from "socket.io-client";
interface SocketContextProps {
  socket: io.Socket<any, any> | null;
  onlineUsers: Array<string>;
}

const SocketContext = createContext<SocketContextProps>({
  socket: null,
  onlineUsers: [],
});

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState<io.Socket<any, any> | null>(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { userId, user } = useAuthContext();

  useEffect(() => {
    if (userId) {
      const socket = io.connect("http://localhost:3001", {
        query: {
          userId,
        },
      });
      setSocket(socket);
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });
      return () => {
        socket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [userId, user]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
