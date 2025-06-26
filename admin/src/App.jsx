import React, { useContext, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import { ToastContainer } from "react-toastify";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import { Navigate } from "react-router-dom";
import { AdminContextProvider } from "./Context/AdminContext";

function App() {
  const url = "https://snackk-backend.onrender.com";

  return (
    <>
      <AdminContextProvider>
        <ToastContainer />
        <Navbar />
        <LoginPopup url={url} />
        <hr />
        <div className="app-content">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Navigate to="/add" />} />
            <Route path="/add" element={<Add url={url} />} />
            <Route path="/list" element={<List url={url} />} />
            <Route path="/orders" element={<Orders url={url} />} />
          </Routes>
        </div>
      </AdminContextProvider>
    </>
  );
}

export default App;
