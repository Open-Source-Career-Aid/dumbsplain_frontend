import React, { useRef } from 'react';
import { toBlob } from 'html-to-image';

const ReportCard = () => {
  const sectionRef = useRef(null);

  const handleShareClick = () => {
    toBlob(sectionRef.current)
      .then((blob) => {
        const item = new ClipboardItem({ 'image/png': blob });
        navigator.clipboard.write([item])
          .then(() => {
            console.log('Image copied to clipboard!');
          })
          .catch((error) => {
            console.error('Error copying image to clipboard:', error);
          });
      })
      .catch((error) => {
        console.error('Error converting HTML to image:', error);
      });
  };

  return (
    <div>
      <section ref={sectionRef}>
        {/* Your HTML section goes here */}
        <h1>Hello, World!</h1>
        <p>This is the content to share as an image.</p>
      </section>
      <button onClick={handleShareClick}>Copy Image to Clipboard</button>
    </div>
  );
};

export default ReportCard;
