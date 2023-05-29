import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { toPng } from 'html-to-image';

const TwitterReportCard = () => {
  const imageRef = useRef(null);
  const [imageUrl, setImageUrl] = useState('');

  return (
    <div>
      <div ref={imageRef}>
        <p>Hello world!</p>
      </div>
      {imageUrl && (
        <>
        <Helmet>
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Your Title" />
          <meta name="twitter:description" content="Your Description" />
          <meta name="twitter:image" content='https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80' />
        </Helmet>
      </>
      )}
    </div>
  );
};

export default TwitterReportCard;