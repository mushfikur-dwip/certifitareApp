import React, { useState } from "react";

interface Props {
  onGenerate: (name: string, phone: string) => void;
}

const LeadForm: React.FC<Props> = ({ onGenerate }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !phone) {
      alert("Please fill out both fields.");
      return;
    }

    onGenerate(name, phone);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-white rounded shadow space-y-4"
    >
      <div>
        <label className="block font-semibold">Your Name:</label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block font-semibold">Phone Number:</label>
        <input
          type="tel"
          className="w-full border px-3 py-2 rounded"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Generate Certificate
      </button>
    </form>
  );
};

export default LeadForm;
