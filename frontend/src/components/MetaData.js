import React from "react";
import Helmet from "react-helmet";
const MetaData = ({ title, description, url, image }) => {
  return (
    <Helmet>
      <title>{`${title} - Dr.Salah Elgohary Official Page`}</title>
      <meta property="og:title" content={title} />
      <meta
        property="og:description"
        content={description ? description : ""}
      />
      <meta property="og:image" content={image ? image : ""} />
      <meta property="og:url" content={window.location.href} />
      <meta name="twitter:title" content={title} />
      <meta
        name="twitter:description"
        content={description ? description : ""}
      />
      <meta name="twitter:image" content={image ? image : ""} />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
};

export default MetaData;
