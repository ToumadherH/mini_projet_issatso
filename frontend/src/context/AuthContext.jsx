import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // We'll fetch user details from /api/users/me/
        axios.get('/api/users/me/', {
          headers: { Authorization: `Bearer ${token}` }
        }).then(res => {
          setUser(res.data);
        }).catch(err => {
          console.error(err);
          logout();
        });
      } catch (err) {
        logout();
      }
    }
  }, [token]);

  const login = async (username, password) => {
    const res = await axios.post('/api/token/', { username, password });
    setToken(res.data.access);
    localStorage.setItem('token', res.data.access);
    return res.data;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
