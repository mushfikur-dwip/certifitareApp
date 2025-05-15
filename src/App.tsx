import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "./index.css";

const App: React.FC = () => {
  return (
    <>
        <div className="bg-[#E9F0FF]">
      <div className=" lg:w-3/12 lg:mx-auto ">
          <ToastContainer position="top-center" autoClose={2000} />
          <AppRoutes />
        </div>
      </div>
    </>
  );
};

export default App;
