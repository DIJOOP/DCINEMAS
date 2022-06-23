import React from "react";
import Helmet from "react-helmet";
import logo from"../../images/logo.png"

const Metadata = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <link rel="icon" type="image/png" href={logo} sizes="20x20"/>
    </Helmet>
  );
};

export default Metadata;
