import React, { useRef } from "react";

interface Props {
  userName: string;
}

const CertificatePreview: React.FC<Props> = ({ userName }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const generateCertificate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const image = new Image();
    image.src = "/certificateTemplate.png"; // Add to public folder

    image.onload = () => {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      ctx.font = "30px serif";
      ctx.fillStyle = "#000";
      ctx.fillText(userName, 250, 300); // Position based on template
    };
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = "certificate.png";
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  return (
    <div className="text-center space-y-4 mt-8">
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="mx-auto border"
      ></canvas>
      <div className="space-x-4">
        <button
          onClick={generateCertificate}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Render Certificate
        </button>
        <button
          onClick={handleDownload}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default CertificatePreview;
