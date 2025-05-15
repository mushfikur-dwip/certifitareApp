import React, { useEffect, useRef } from "react";
import '../index.css';

const CertificatePage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateCertificate = async () => {
    const name = localStorage.getItem("leadName") || "Your Name";
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const image = new Image();
    image.src = "/CertificateAIBAITCLUB.png"; // Public folder

    image.onload = async () => {
      // Load fonts first
      await (document as any).fonts.ready;

      // Resize canvas to image
      canvas.width = image.width;
      canvas.height = image.height;

      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      // Font setup
      const fontSize = Math.floor(canvas.width / 20);
      ctx.font = `${fontSize}px 'Pinyon Script', cursive`;
      ctx.fillStyle = "#1e3a8a";
      ctx.textAlign = "center";

      const x = canvas.width / 2;
      const y = canvas.height * 0.52;
      ctx.fillText(name, x, y);
    };
  };

  useEffect(() => {
    generateCertificate();
  }, []);

  const downloadCertificate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = "certificate.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

    return (
        <>
            <div className="bg-[#E9F0FF]">
            <div className=" lg:w-12/12 lg:mx-auto ">
        <div className="min-h-screen  flex items-center justify-center px-4 py-10">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-5xl text-center space-y-6">
            <div className="w-full relative rounded-lg overflow-hidden shadow-sm">
              <canvas
                ref={canvasRef}
                className="w-full h-full object-contain"
              />
            </div>

            <button
              onClick={downloadCertificate}
              className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-full transition duration-300 shadow-md"
            >
              Download Certificate
            </button>

            <div>
              <p className="text-center text-xs text-gray-400 mt-6">
                Build By:{" "}
                <a target="_blank" href="http://fb.me/mushfikur.a.k">
                  Mushfikur Rahman
                </a>
              </p>
            </div>
          </div>
                    </div>
                </div>
            </div>

      </>
    );
};

export default CertificatePage;

