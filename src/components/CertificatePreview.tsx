import React, { useEffect, useRef } from "react";
import "../index.css";
import jsPDF from "jspdf";

const CertificatePage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateCertificate = async () => {
    const name = localStorage.getItem("leadName") || "Your Name";
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const image = new Image();
    image.src = "/updatedCertificate.jpg";

    image.onload = async () => {
      await (document as any).fonts.ready;

      canvas.width = image.width;
      canvas.height = image.height;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      // Font settings
      const fontSize = Math.floor(canvas.width / 20);
      ctx.font = `${fontSize}px 'Pinyon Script', cursive`;
      ctx.fillStyle = "#1e3a8a";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Position
      const x = canvas.width / 2;
      const y = canvas.height * 0.54;

      // ✅ Add white rectangle behind name
      const textWidth = ctx.measureText(name).width;
      const padding = 20;
      ctx.fillStyle = "#FFFFFF"; // White background
      ctx.fillRect(
        x - textWidth / 2 - padding / 2,
        y - fontSize / 1.5,
        textWidth + padding,
        fontSize + 10
      );

      // 🖊️ Now write the name over white box
      ctx.fillStyle = "#1e3a8a";
      ctx.fillText(name, x, y);
    };
  };

  useEffect(() => {
    generateCertificate();
  }, []);

  //   const downloadCertificate = () => {
  //     const canvas = canvasRef.current;
  //     if (!canvas) return;

  //     const link = document.createElement("a");
  //     link.download = "certificate.png";
  //     link.href = canvas.toDataURL("image/png");
  //     link.click();
  //   };

  const downloadCertificate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Convert to JPEG (smaller size than PNG)
    const imageData = canvas.toDataURL("image/jpeg", 0.7); // 70% quality

    // Optional: Scale down the PDF
    const scale = 0.5;
    const pdfWidth = canvas.width * scale;
    const pdfHeight = canvas.height * scale;

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: [pdfWidth, pdfHeight],
    });

    pdf.addImage(imageData, "JPEG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("certificate.pdf");
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
                  className="w-full max-w-full  rounded"
                />
              </div>
                 <p >সার্টিফিকেট ফন্ট জানারেট না হলে<a href=" " onClick={() => window.location.href = window.location.href} className="text-blue-500" > এখানে </a> ক্লিক করুন</p>               
              <button
                onClick={downloadCertificate}
                className="bg-green-600 hover:bg-green-700 text-white font-medium my-0 px-6 py-3 rounded-full transition duration-300 shadow-md"
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
