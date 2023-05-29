import React, { useRef } from 'react';
import { toPng } from 'html-to-image';

const ReportCard = () => {
  const imageRef = useRef(null);

  const handleDownload = () => {
    toPng(imageRef.current).then((dataUrl) => {
      const img = new Image();
      img.src = dataUrl;
      document.body.appendChild(img);
    });
  };

  return (
    <div>
      <div ref={imageRef}>
        {/* Your HTML content here */}
        <p>Hello world!</p>
      </div>
      <button onClick={handleDownload}>Download Image</button>
    </div>
  );
};

export default ReportCard;