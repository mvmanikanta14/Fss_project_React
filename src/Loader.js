import React from 'react';
import ReactLoading from "react-loading";

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader-logo">
        <img src="web-logo.png" alt="Logo" />
      </div>
      <div className="loader-text"> <ReactLoading className='spin' type="bubbles" color="#0000FF"
                height={100} width={50} /></div>
    </div>
  );
};

export default Loader;