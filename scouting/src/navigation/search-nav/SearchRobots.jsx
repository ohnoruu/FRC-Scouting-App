import React, { useState, useEffect, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import IonIcon from '@reacticons/ionicons';
import SearchRobotsSkeleton from '../../components/search/SearchRobotsSkeleton.jsx';
import StatGlimpse from '../../components/StatGlimpse.jsx';
import axios from 'axios';
import './SearchRobots.css';

export default function SearchRobots() {
  const navigate = useNavigate();
  const [genData, setGenData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const handleProfileNavigation = (teamNumber) => {
    navigate(`/navigator/search/profile/${teamNumber}`);
  }
  
  useEffect(() => {
    axios.get('https://cyberlions-web-server-1028328220227.us-central1.run.app/robotList')
      .then((response) => {
        setGenData(response.data);
        setFilteredData(response.data); // Initialize filtered data with all data
      })
      .catch((error) => {
        console.error("Error making GET Request: SearchRobots, robotList: ", error);
      });
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = genData.filter(robot =>
      robot.profile.teamName.toLowerCase().includes(query) ||
      robot.profile.teamNumber.toString().includes(query)
    );
    setFilteredData(filtered);
  };

  return (
    <>
    <Container className="searchRobots_container" fluid="md">
      <h1>Search for a Robot Profile</h1>
      <div className="searchRobots_searchBarContainer">
        <IonIcon name="search-outline" className="searchIcon"/>
          <input
            className="searchbar"
            placeholder={'Search by Team Name or Number'}
            value={searchQuery}
            onChange={handleSearchChange}
          />
      </div>

      <div className="searchRobots_scrollView">
        <Suspense fallback={<SearchRobotsSkeleton />}>
          {filteredData?.map((robot) => (
            <div
              key={robot.profile.teamNumber}
              onClick={() => handleProfileNavigation(robot.profile.teamNumber)}
              className="searchRobots_pressable"
            >
              <StatGlimpse 
              name={robot.profile.teamName} 
              teamNumber={robot.profile.teamNumber} 
              playstyle={[
                robot.profile?.playstyle?.algae && "Algae Scorer",
                robot.profile?.playstyle?.coral && "Coral Scorer",
                robot.profile?.playstyle?.defense && "Defender"
              ].filter(Boolean).join(", ") || "None"}
            />
            </div>
          ))}
        </Suspense>
      </div>
    </Container>
    </>
  );
}