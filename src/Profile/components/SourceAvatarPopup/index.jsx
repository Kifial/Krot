import React from 'react';

if (typeof window !== 'undefined' && window.document) require('./index.scss');

const SourceAvatarPopup = (props) => {
  return (
    <div className="source-avatar-popup">
      <div className="source-avatar-popup__layout" onClick={props.close}></div>
      <div className="source-avatar-popup__body">
        <div className="source-avatar-popup__image-box">
          <img src={props.image} alt={props.title}/>
        </div>
      </div>
    </div>
  )
};

export default SourceAvatarPopup;