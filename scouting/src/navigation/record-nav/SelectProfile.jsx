import React, { Suspense, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import SelectProfileSkeleton from '../../components/record/SelectProfileSkeleton';
import DisplayProfile from '../../components/record/DisplayProfile';
import axios from 'axios';
import './SelectProfile.css';

export default function SelectProfile() {
  const navigate = useNavigate();
  const [genData, setGenData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]); 

  const handleNavigate = () => {
    navigate('/navigator/record/create-profile');
  };

  useEffect(() => {
    axios.get('https://cyberlions-web-server-1028328220227.us-central1.run.app/robotList')
      .then((response) => {
        setGenData(response.data);
        // if no active query, show all immediately
        if (!searchQuery.trim()) setFilteredData(response.data);
      })
      .catch((error) => {
        console.error("Error making GET Request:", error);
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  }

  useEffect(() => {
    const raw = searchQuery;
    const q = raw.trim().toLowerCase();

    if (!q) {
      setFilteredData(genData);
      return;
    }

    const digitsOnly = q.replace(/\D/g, '');
    const treatAsPureNumber = digitsOnly.length > 0 && digitsOnly === q.replace(/\s/g, '');

    const filtered = genData.filter((robot) => {
      const teamName = robot?.profile?.teamName?.toString().toLowerCase() || '';
      const teamNumberStr = robot?.profile?.teamNumber != null
        ? robot.profile.teamNumber.toString()
        : '';

      if (treatAsPureNumber) {
        return teamNumberStr.includes(digitsOnly) || teamName.includes(q);
      }
      return teamName.includes(q) || teamNumberStr.includes(q);
    });

    setFilteredData(filtered);
  }, [searchQuery, genData]);
 
  return (
    <>
      <Container className="selectProfile_container" fluid="md">
        <h1 style={{ marginTop: '2rem', textAlign: 'center' }}>Select a Robot Profile to Scout Matches</h1>
        <p style={{textAlign: 'center', fontSize: '0.8rem'}}>For Pit Scouting, edit an existing robot profile or add a new one by clicking "Create New Profile" below</p>
        
        <div className="selectProfile_searchContainer">
          <input
            className="searchbar"
            placeholder="Search by Team Name or Number"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        <div className="selectProfile_scrollview">
          <Suspense fallback={<SelectProfileSkeleton/>}>
            {filteredData?.map((robot, idx) => (
              <div 
                className="selectProfile_profileCard" 
                key={`${robot.profile.teamNumber || 'unk'}-${robot.profile.teamName || 'noname'}-${idx}`}
              >
                <DisplayProfile profileData={robot}/>
              </div>
            ))}
          </Suspense>
        </div>

        <Button variant="primary" onClick={handleNavigate}>Create New Profile</Button>
      </Container>
    </>
  );
}