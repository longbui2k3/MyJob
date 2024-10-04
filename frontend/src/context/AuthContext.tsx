import React, { createContext, useContext, useEffect, useState } from "react";
import { getCookie } from "../utils";
import { User } from "../interfaces";
import { GetUser } from "../apis";

interface AuthContextProps {
  userId: string | null;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
  user: User | null | string;
  setUser: React.Dispatch<React.SetStateAction<User | null | string>>;
}

export const AuthContext = createContext<AuthContextProps>({
  userId: null,
  setUserId: () => null,
  user: "",
  setUser: () => "",
});

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}): React.ReactNode => {
  const [userId, setUserId] = useState<string | null>(getCookie("user"));

  const [user, setUser] = useState<User | null | string>("");

  useEffect(() => {
    setUserId(getCookie("user"));
  }, []);
  useEffect(() => {
    (async () => {
      const data = await GetUser();
      console.log("Data", data);
      if (data.status === 200) {
        setUser(data.metadata.user);
      } else setUser(null);
    })();
  }, [userId]);
  return (
    <AuthContext.Provider value={{ userId, setUserId, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
