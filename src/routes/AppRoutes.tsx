import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import CertificatePage from "../components/CertificatePreview";
import AdminPanel from "../pages/AdminPanel";
import Login from "../pages/Login";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/certificate" element={<CertificatePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<AdminPanel />} />
    </Routes>
  );
};

export default AppRoutes;
