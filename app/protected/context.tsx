"use client"
import { createContext, useContext, useState, ReactNode } from "react";
import { User } from "@supabase/supabase-js";  // Import the User type

type UserContextType = {
  user: User | undefined|null;
  setUser: (user: User | undefined | null) => void;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | undefined|null>(undefined);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
