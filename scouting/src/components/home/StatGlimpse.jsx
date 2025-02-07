import React, { useState, useEffect } from 'react';
import fillerImage from '../../assets/interface-icons/filler-image.png';
import './StatGlimpse.css';

export default function StatGlimpse({ name, teamNumber, drivebase, intake, isLoading }) {
  const [greyBoxWidth, setGreyBoxWidth] = useState(0);

  useEffect(() => {
    if (isLoading) {
      setGreyBoxWidth(0);
    }
  }, [isLoading]);

  return (
    <div className="statGlimpse_scoutingDataGlimpsePiece">
      <div className="statGlimpse_metadata">
        {isLoading ? (
          <div className="statGlimpse_greyBox" style={{ width: greyBoxWidth }} />
        ) : (
          <>
            <span className="statGlimpse_headerSmaller">{name} ({teamNumber})</span>
            <div className="statGlimpse_stats">
              <span className="statGlimpse_text"> Drivebase: {drivebase}</span>
            </div>
          </>
        )}
      </div>
      <img className="statGlimpse_fillerImage" alt="filler" src={fillerImage} />
    </div>
  );
}