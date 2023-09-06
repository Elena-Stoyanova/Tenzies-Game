import React from "react";
import "./popup.css"

const Popup = props => {
  return (
    <div className="popup-box">
      <div className="box">
        {props.content}
      </div>
    </div>
  );
};

export default Popup;
