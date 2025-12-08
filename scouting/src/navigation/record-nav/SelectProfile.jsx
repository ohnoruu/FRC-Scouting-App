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
    <>
      <Container className="selectProfile_container" fluid="md">
        <h1 style={{ marginTop: '2rem', textAlign: 'center' }}>Select a Robot Profile to Scout Matches</h1>
        <p style={{textAlign: 'center'}}>For Pit Scouting, edit an existing robot profile or add a new one by clicking "Create New Profile"</p>
        
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
            {filteredData?.map((robot) => (
              <div className="selectProfile_profileCard" key={'recording:' + robot.profile.teamNumber}>
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