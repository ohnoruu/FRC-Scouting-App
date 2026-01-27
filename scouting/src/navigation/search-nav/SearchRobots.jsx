import React, { useState, useEffect, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
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
    axios.get(`${process.env.REACT_APP_BASE_URL}/robotList`)
      .then((response) => {
        setGenData(response.data);
        // If no active query, show all immediately
        if (!searchQuery.trim()) setFilteredData(response.data);
      })
      .catch((error) => {
        console.error("Error making GET Request: SearchRobots, robotList: ", error);
      });
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    // Only update the displayed input value here; filtering runs in a separate effect
    setSearchQuery(e.target.value);
  };

  // Run filtering in an effect so it always uses the latest `genData` and `searchQuery`.
  // Debounce a little to avoid excessive recalculation while the user types.
  useEffect(() => {
    const raw = searchQuery;
    const q = raw.trim().toLowerCase();

    if (!q) {
      // Immediate reset (no debounce so nothing is skipped)
      setFilteredData(genData);
      return;
    }

    // Digits-only optimization preserved
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
    <Container className="searchRobots_container" fluid="md">
      <h1 className="searchRobots_header">Search for a Robot Profile</h1>
      <div className="searchRobots_searchBarContainer">
          <input
            className="searchbar"
            placeholder={'Search by Team Name or Number'}
            value={searchQuery}
            onChange={handleSearchChange}
          />
      </div>

      <div className="searchRobots_scrollView">
        <Suspense fallback={<SearchRobotsSkeleton />}>
          {filteredData?.map((robot, idx) => {
            const teamNumber = robot?.profile?.teamNumber;
            const teamName = robot?.profile?.teamName;
            return (
              <div
                key={`${teamNumber || 'unk'}-${teamName || 'noname'}-${idx}`}
                onClick={() => teamNumber != null && handleProfileNavigation(teamNumber)}
                className="searchRobots_pressable"
              >
                <StatGlimpse 
                  name={teamName || 'Unknown'}
                  teamNumber={teamNumber != null ? teamNumber : '—'}
                  playstyle={[
                    robot.profile?.playstyle?.algae && "Algae Scorer",
                    robot.profile?.playstyle?.coral && "Coral Scorer",
                    robot.profile?.playstyle?.defense && "Defender"
                  ].filter(Boolean)}
                />
              </div>
            );
          })}
        </Suspense>
      </div>
    </Container>
    </>
  );
}