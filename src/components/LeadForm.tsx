import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LeadForm: React.FC = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !phone) {
      toast.error("Fill all fields");
      return;
    }

    localStorage.setItem("leadName", name);
    localStorage.setItem("leadPhone", phone);

    toast.success("Lead Submitted Successfully!");
    setTimeout(() => navigate("/certificate"), 1000);
  };

  return (
    <div className="flex items-center justify-center px-4 ">
      <form onSubmit={handleSubmit} className="w-full bg-white  p-6 pb-0 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#4338CA] mb-2">
            সার্টিফিকেট জেনারেটর
          </h2>
        </div>

        <div>
          <label className="block text-sm text-left font-medium text-gray-700 mb-1">
            আপনার নাম
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Sabbir Ahmed"
            required
          />
        </div>

        <div>
          <label className="block text-left text-sm font-medium text-gray-700 mb-1">
            ফোন নাম্বার
          </label>
          <input
            type="tel"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="e.g. 01XXXXXXXXX"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full  bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition shadow-md"
        >
          Generate Certificate
        </button>
      </form>
    </div>
  );
};

export default LeadForm;
