import { createContext, useState, useEffect, ReactNode } from 'react';

type User = {
  id: number;
  name: string;
  email: string;
  fitnessLevel?: string;
  trainingPreferences?: string;
  dietaryPreferences?: string;
  timeAvailability?: number;
};

type UserContextType = {
  user: User | null;
  login: (credentials: User) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const login = (credentials: User) => {
    setUser(credentials);
    localStorage.setItem('user', JSON.stringify(credentials));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
