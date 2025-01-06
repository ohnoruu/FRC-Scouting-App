import React from 'react';
import './CheckRecord.css';

export default function Checkbox({ checkboxTitle, stateValue, changeState }) {
  return (
    <div className="checkbox-container">
      <input
        type="checkbox"
        checked={stateValue}
        onChange={(e) => changeState(e.target.checked)}
        className="checkbox"
      />
      <span className="subText">{checkboxTitle}</span>
    </div>
  );
}