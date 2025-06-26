import { createContext, useState } from 'react';

export const AdminContext = createContext(null);

export const AdminContextProvider = (props) => {
  const [token, setToken] = useState(() => {
    return localStorage.getItem("Token") || "";
  });
  const [login, setShowLogin] = useState(false);
  
  const contextValue ={
    token,
    setToken,
    login,
    setShowLogin,
  }

  return (
    <AdminContext.Provider value={contextValue}>
      {props.children}
    </AdminContext.Provider>
  );
};

