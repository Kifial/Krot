import React from 'react';

if (typeof window !== 'undefined' && window.document) require('./index.scss');

const Loader = (props) => {
  return (
    <div className="loader">
      <div className="loader__body">
        <img src="/assets/loading.gif" alt="loading"/>
      </div>
    </div>
  )
};

export default Loader;