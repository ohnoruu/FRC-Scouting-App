import React, { Suspense, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import IonIcon from '@reacticons/ionicons';
import SelectProfileSkeleton from '../../record/SelectProfileSkeleton';
import DisplayProfile from '../../record/DisplayProfile';
import axios from 'axios';
import './SelectProfile.css';

export default function SelectProfile() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]); 

  const handleNavigate = () => {
    navigate('/navigator/record/create-profile');
  };

  const [profileData, setProfileData] = useState();

  useEffect(() => {
    axios.get('https://cyberlions-web-server-1028328220227.us-central1.run.app/robotList')
      .then((response) => {
        setProfileData(response.data);
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.error("Error making POST Request:", error);
      });
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = profileData?.filter(robot =>
      robot.profile.teamName.toLowerCase().includes(query) ||
      robot.profile.teamNumber.toString().includes(query)
    );
    setFilteredData(filtered);
  }
 
  return (
    <div className="selectProfile_container">
      <div className="topPiece" />
      <div className="selectProfile_middlePiece">
        <span className="selectProfile_header">Select a Profile to Scout Matches.</span>
        <span className="selectProfile_subheader"> For Pit Scouting, edit an existing robot profile or add a new one by clicking the "Create New Robot Profile" button below.</span>
        <div className="selectProfile_searchSection">
          <IonIcon name="search-outline" className="searchIcon"/>
          <input 
            className="searchbar"
            placeholder={'Search by Team Name or Number'}
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="viewSelection">
          <Suspense fallback={<SelectProfileSkeleton />}>
            {filteredData?.map((robot) => (
              <div className = "profileSelection" key={'recording:' + robot.profile.teamNumber}>
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