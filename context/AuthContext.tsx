import React, { createContext, useContext, useEffect, useState } from 'react';

type User = { id: string; name: string; email: string } | null;

type AuthContextType = {
  user: User;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  ready: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const t = localStorage.getItem('token');
      const u = localStorage.getItem('user');
      if (t) setToken(t);
      if (u) setUser(JSON.parse(u));
    } finally {
      setReady(true);
    }
  }, []);

  const login = (tok: string, u: User) => {
    setToken(tok);
    setUser(u);
    localStorage.setItem('token', tok);
    if (u) localStorage.setItem('user', JSON.stringify(u));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, ready }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
