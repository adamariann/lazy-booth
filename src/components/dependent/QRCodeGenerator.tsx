import React, { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";

interface QRCodeGeneratorProps {
  data: string;
  image: string;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ data, image }) => {
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const qrCodeInstance = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    if (qrCodeRef.current) {
      if (!qrCodeInstance.current) {
        qrCodeInstance.current = new QRCodeStyling({
          width: 300,
          height: 300,
          data: data,
          image: image,
          dotsOptions: {
            color: "#009933",
            type: "rounded",
          },
          backgroundOptions: {
            color: "#e9ebee",
          },
          imageOptions: {
            crossOrigin: "anonymous",
            margin: 4,
          },
        });
        qrCodeInstance.current.append(qrCodeRef.current);
      } else {
        qrCodeInstance.current.update({
          data: data,
          image: image,
        });
      }
    }
  }, [data, image]);

  return <div ref={qrCodeRef}></div>;
};

export default QRCodeGenerator;
