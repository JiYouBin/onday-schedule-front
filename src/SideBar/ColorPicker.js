import React, { useState } from "react";
import { TwitterPicker } from "react-color";
import { FaCircle } from "react-icons/fa";

function ColorPicker(props) {
  const [isChecked, setIsChecked] = useState(false);

  const handleChecked = () => {
    setIsChecked(prev => !prev);
  };

  const handleChangeComplete = (color) => {
    props.setEventColor(color.hex);
    setIsChecked(false);
  };

  return (
    <div className="colorBox">
      <label className="checkbox">
        <>
          <input type="hidden" id="eventColorInput" value={props.eventColor} />
            <FaCircle className="Circle" onClick={handleChecked} style={{ color: props.eventColor }} /> 
          {isChecked && (
            <TwitterPicker className="colorPicker"
              color={props.eventColor}
              onChangeComplete={handleChangeComplete}
              setIsChecked={setIsChecked}
            />
          )}
        </>
      </label>
    </div>
  );
}

export default ColorPicker;
