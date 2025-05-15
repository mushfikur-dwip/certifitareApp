import React, { useState } from "react";
import LeadForm from "./components/LeadForm";
import CertificatePreview from "./components/CertificatePreview";

const App: React.FC = () => {
  const [submittedName, setSubmittedName] = useState<string | null>(null);

  const handleGenerate = (name: string, phone: string) => {
    console.log("Lead collected:", { name, phone });
    setSubmittedName(name);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        🎓 Certificate Generator
      </h1>
      {!submittedName ? (
        <LeadForm onGenerate={handleGenerate} />
      ) : (
        <CertificatePreview userName={submittedName} />
      )}
    </div>
  );
};

export default App;
