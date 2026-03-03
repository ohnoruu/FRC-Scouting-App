import React, { useEffect, useState } from 'react';
import { Container, Form, Card, Button } from 'react-bootstrap';
import './Home.css';

import MatchupProfile from '../components/home/MatchupProfile';

export default function Home() {
  const [robots, setRobots] = useState([]);

  const [redAlliance, setRedAlliance] = useState([null, null, null]);
  const [blueAlliance, setBlueAlliance] = useState([null, null, null]);

  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/robotList`)
      .then((response) => response.json())
      .then((data) => setRobots(data))
      .catch((error) => console.error("Error fetching robot list: ", error));
  }, []);

  const renderSlot = (robot, alliance, index, color) => { // Helper function to render each alliance slot
    const setAlliance = alliance === 'red' ? setRedAlliance : setBlueAlliance; // Determine which alliance state to update based on the alliance color
    const allianceState = alliance === 'red' ? redAlliance : blueAlliance; // Get the current state of the alliance

    const handleSelect = (teamNumber) => { // Update the corresponding alliance state when a team is selected
      const selectedRobot = robots.find(
        r => r.profile.teamNumber.toString() === teamNumber // Find the selected robot based on team number
      );

      const updated = [...allianceState]; // Create a copy of the current alliance state
      updated[index] = selectedRobot; // Update the selected slot with the chosen robot
      setAlliance(updated); // Update the alliance state with the selected robot
    };

    const handleReset = () => {
      const updated = [...allianceState]; 
      updated[index] = null; 
      setAlliance(updated); 
    }

    if (!robot) {
      return (
        <Form.Select
          onChange={(e) => handleSelect(e.target.value)}
        >
          <option value="">Select Team</option>
          {robots.map(r => (
            <option
              key={r.profile.teamNumber}
              value={r.profile.teamNumber}
            >
              {r.profile.teamNumber} - {r.profile.teamName}
            </option>
          ))}
        </Form.Select>
      );
    }

    return (
      <>
        <MatchupProfile robot={robot} allianceColor={color}/>
        <Button
          size="sm"
          variant="danger"
          onClick={handleReset}
          style={{ marginTop: '0.5rem' }}
        >
          Reset
        </Button>
      </>
    )
  }

  return (
    <Container className="home-container" fluid="md">
      <h1 style={{textAlign: "center", marginTop: "2rem"}}>8521 Scout</h1>
      <p className="caption" style={{textAlign: "center"}}>Create predictions, or view and scout teams</p>
      
      <div className="section">
        <p style={{textAlign: "center"}}>Red/Blue Alliance Victory</p>
        <div className="home-scoreRow">
          <div className="home-scoreCard">
            <Card>
              <Card.Body>
                <Card.Title style={{color: "var(--primary-color-2)"}}>Red Alliance Score</Card.Title>
                <Card.Subtitle>Red 1 # - Red 1 Avg Score</Card.Subtitle>
                <Card.Subtitle>Red 2 # - Red 2 Avg Score</Card.Subtitle>
                <Card.Subtitle>Red 3 # - Red 3 Avg Score</Card.Subtitle>
              </Card.Body>
            </Card>
          </div>

          <div className="home-scoreCard">
            <Card>
              <Card.Body>
                <Card.Title style={{color: "var(--primary-color-4)"}}>Blue Alliance Score</Card.Title>
                <Card.Subtitle>Blue 1 # - Blue 1 Avg Score</Card.Subtitle>
                <Card.Subtitle>Blue 2 # - Blue 2 Avg Score</Card.Subtitle>
                <Card.Subtitle>Blue 3 # - Blue 3 Avg Score</Card.Subtitle>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>

      <div className="section">
        <h2 style={{textAlign: "center"}}>Input Matchup</h2>
        <div className="home-predictionRow">
          <div className="home-alliance">
            {redAlliance.map((robot, i) => (
              <div key={i}>
                {renderSlot(robot, 'red', i, 'red')}
              </div>
            ))}
          </div>
          <div className="home-alliance">
            {blueAlliance.map((robot, i) => (
              <div key={i}>
                {renderSlot(robot, 'blue', i, 'blue')}
              </div>
            ))}
          </div>
        </div>

        <Button
          variant="success"
          size="lg"
          style={{ display: 'block', margin: '2rem auto' }}
        >
          Predict!
        </Button>
      </div>
    </Container>
  );
}