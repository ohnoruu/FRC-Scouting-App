import React, { useState, useEffect, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import IonIcon from '@reacticons/ionicons';
import SearchRobotsSkeleton from '../../search/SearchRobotsSkeleton.jsx';
import StatGlimpse from '../../home/StatGlimpse.jsx';
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
    <div className="searchRobots_container">
      <div className="searchRobots_topPiece" />
      <div className="searchRobots_middlePiece">
        <span className="searchRobots_header">Get Started Scouting</span>
        <div className="searchSection">
          <IonIcon name="search-outline" className="searchIcon"/>
          <input
            className="searchbar"
            placeholder={'Search'}
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="searchRobots_viewScoutingData">
          <div className="searchRobots_scrollView">
            <div className="scoutingDataGlimpses">
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
          </div>
        </div>
      </div>
    </div>
  );
}