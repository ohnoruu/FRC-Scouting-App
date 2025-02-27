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
    axios.get('https://cyberlions-web-server-1028328220227.us-central1.run.app/robotList')
      .then((response) => {
        setProfileData(response.data);
      })
      .catch((error) => {
        console.error("Error making POST Request:", error);
      });
  }, []);

  return (
    <div className="selectProfile_container">
      <div className="topPiece" />
      <div className="selectProfile_middlePiece">
        <span className="selectProfile_header">Select Robot to Scout</span>
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