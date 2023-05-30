import { Helmet } from 'react-helmet';

const TwitterReportCard = () => {

  return (
    <div>
      <Helmet>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Your Title" />
        <meta name="twitter:description" content="Your Description" />
        <meta name="twitter:image" content="https://example.com/your-image.jpg" />
      </Helmet>
    </div>
  );
};

export default TwitterReportCard;