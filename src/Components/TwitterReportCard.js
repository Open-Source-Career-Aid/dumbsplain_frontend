import React, { useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { toPng } from 'html-to-image';

const TwitterReportCard = () => {
  const imageRef = useRef(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleDownload = () => {
    toPng(imageRef.current).then((dataUrl) => {
      console.log(1, dataUrl);
      const img = new Image();
      console.log(2, img);
      img.src = dataUrl;
        console.log(3, img.src);
    //   document.body.appendChild(img);
      setImageUrl(dataUrl);
    });
  };

  return (
    <div>
      <div ref={imageRef}>
        <p>Hello world!</p>
      </div>
      <button onClick={handleDownload}>Download Image</button>
      {imageUrl && (
        <>
        <Helmet>
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Your Title" />
          <meta name="twitter:description" content="Your Description" />
          <meta name="twitter:image" content={imageUrl} />
        </Helmet>
      </>
      )}
    </div>
  );
};

export default TwitterReportCard;