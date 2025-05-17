import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/admin");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center ">
      <div className=" p-8 shadow-lg rounded-2xl">
        <h2 className="text-xl font-bold mb-4 text-center">🔐 Admin Login</h2>
        <button
          onClick={handleLogin}
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
