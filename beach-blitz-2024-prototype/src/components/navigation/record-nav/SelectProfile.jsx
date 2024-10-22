import React, { Suspense, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SelectProfileSkeleton from '../../record/SelectProfileSkeleton';
import DisplayProfile from '../../record/DisplayProfile';
import axios from 'axios';
import './SelectProfile.css';

export default function SelectProfile() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/navigator/record/create-profile');
  };

  const [profileData, setProfileData] = useState();

  useEffect(() => {
    axios.get('http://localhost:3000/robotList')
      .then((response) => {
        setProfileData(response.data);
      })
      .catch((error) => {
        console.error("Error making POST Request:", error);
      });
  }, []);

  return (
    <div className="container">
      <div className="topPiece" />
      <div className="middlePiece">
        <span className="header">Select Robot to Scout</span>
        <div className="viewSelection">
          <Suspense fallback={<SelectProfileSkeleton />}>
            {profileData?.map((robot) => (
              <div className = "profileSelection" key={'recording:' + robot.profile.teamNumber} onClick={() => navigate(`/navigator/record/record-game/${robot.profile.teamNumber}`, { state: { robot: robot } })}>
                <DisplayProfile profileData={robot} />
              </div>
            ))}
          </Suspense>
        </div>
        <button className="createButton" onClick={handleNavigate}>
          <span className="createButtonText">Create New Robot Profile</span>
        </button>
      </div>
    </div>
  );
}