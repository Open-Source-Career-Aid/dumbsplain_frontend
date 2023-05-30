import { Helmet } from 'react-helmet';

const TwitterReportCard = () => {

  return (
    <div>
      <Helmet>
        <meta name="twitter:site" content="@nytimes" />
        <meta name="twitter:creator" content="@SarahMaslinNir" />
        <meta name="twitter:title" content="Parade of Fans for Houstons Funeral" />
        <meta name="twitter:description" content="NEWARK" />
        <meta name="twitter:image" content="http://graphics8.nytimes.com/images/2012/02/19/us/19whitney-span/19whitney-span-articleLarge.jpg" />
      </Helmet>
    </div>
  );
};

export default TwitterReportCard;