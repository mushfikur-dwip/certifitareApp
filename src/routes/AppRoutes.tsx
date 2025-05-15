import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import CertificatePage from "../components/CertificatePreview";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/certificate" element={<CertificatePage />} />
    </Routes>
  );
};

export default AppRoutes;
