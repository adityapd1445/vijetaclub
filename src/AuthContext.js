import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  // INITIALLY load user from localStorage
  const [user, setUser] = useState(() => {
    const val = localStorage.getItem('user');
    return val ? JSON.parse(val) : null;
  });

  // SYNC user to localStorage whenever it changes (login/logout)
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Optionally expose setUser for manual login
  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
