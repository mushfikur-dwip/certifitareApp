import React from "react";
import LeadForm from "../components/LeadForm";
import "../index.css";
const Home: React.FC = () => {
  return (
    <div className="min-h-screen lg:w-4/12 lg:mx-auto  flex flex-col items-center justify-center w-full px-4 py-10">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-5xl text-center space-y-6">
        <LeadForm />
        <div className="text-sm text-gray-500">
          <div>
            <p className="text-center text-xs text-gray-400 ">
              Build By:{" "}
              <a target="_blank" href="http://fb.me/mushfikur.a.k">
                Mushfikur Rahman
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
