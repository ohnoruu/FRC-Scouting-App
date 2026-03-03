import React, { useEffect, useState, useRef } from 'react';
import { Container, Form, Card, Button } from 'react-bootstrap';
import './Home.css';

import MatchupProfile from '../components/home/MatchupProfile';

export default function Home() {
  const topRef = useRef(null);
  const [robots, setRobots] = useState([]);

  const [redAlliance, setRedAlliance] = useState([null, null, null]);
  const [blueAlliance, setBlueAlliance] = useState([null, null, null]);

  const [prediction, setPrediction] = useState(null);
  const allSelected = [...redAlliance, ...blueAlliance].every(r => r !== null);

  const [displayedScores, setDisplayedScores] = useState({
    red: 0,
    blue: 0
  });

  const [analyzedRed, setAnalyzedRed] = useState([]);
  const [analyzedBlue, setAnalyzedBlue] = useState([]);

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
          style={{ margin: '0.5rem', backgroundColor: color === 'red' ? 'var(--primary-color-2)' : 'var(--primary-color-4)', color: 'white' }}
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
          style={{ margin: '0.5rem' }}
        >
          Reset
        </Button>
      </>
    )
  }

  const computeAverage = (robot) => {
    const matches = robot?.matches?.filter(
      m => m.matchType !== "Practice Match"
    );

    if (!matches || matches.length === 0) return 0;

    const total = matches.reduce(
      (sum, m) => sum + (Number(m.totalScore) || 0),
      0
    );

    return Math.round(total / matches.length);
  }

  const calculateAllianceScore = (alliance) => {
    return alliance.reduce((sum, robot) => {
      if (!robot) return sum;
      return Math.round(sum + computeAverage(robot));
    }, 0);
  };

  const analyzeMatchup = () => {
    const redScore = calculateAllianceScore(redAlliance);
    const blueScore = calculateAllianceScore(blueAlliance);

    setAnalyzedRed([...redAlliance]);
    setAnalyzedBlue([...blueAlliance]);

    setDisplayedScores({
      red: redScore,
      blue: blueScore
    });

    setPrediction({
      red: redScore,
      blue: blueScore,
      winner:
        redScore > blueScore
          ? 'Red Alliance Victory'
          : blueScore > redScore
            ? 'Blue Alliance Victory'
            : 'Tie'
    });

    topRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <Container className="home-container" fluid="md" ref={topRef}>
      <h1 style={{textAlign: "center", marginTop: "2rem"}}>8521 Scout</h1>
      <p className="caption" style={{textAlign: "center"}}>Create predictions, analyze, or view and scout teams</p>
      
      <div className="section">
        <p 
          style={{textAlign: "center"}}
          className={
            prediction?.winner === "Red Alliance Victory"
            ? "prediction-red"
            : prediction?.winner === "Blue Alliance Victory"
            ? "prediction-blue"
            : ""
          }
        >
          {prediction ? `Predicted: ${prediction.winner}` : "No predictions yet (╯°□°)╯︵ ┻━┻"}
        </p>
        <div className="home-scoreRow">
          <div className="home-scoreCard">
            <Card>
              <Card.Body>
                <Card.Title style={{color: "var(--primary-color-2)"}}>{redAlliance.length > 0 ? `Red Alliance Score: ${displayedScores.red}` : "Red Alliance Score: 0"}</Card.Title>
                <Card.Subtitle>{analyzedRed[0] ? `${analyzedRed[0].profile.teamNumber} - ${computeAverage(analyzedRed[0])}` : "Red 1: No Team Selected"}</Card.Subtitle>
                <Card.Subtitle>{analyzedRed[1] ? `${analyzedRed[1].profile.teamNumber} - ${computeAverage(analyzedRed[1])}` : "Red 2: No Team Selected"}</Card.Subtitle>
                <Card.Subtitle>{analyzedRed[2] ? `${analyzedRed[2].profile.teamNumber} - ${computeAverage(analyzedRed[2])}` : "Red 3: No Team Selected"}</Card.Subtitle>
              </Card.Body>
            </Card>
          </div>

          <div className="home-scoreCard">
            <Card>
              <Card.Body>
                <Card.Title style={{color: "var(--primary-color-4)"}}>{blueAlliance.length > 0 ? `Blue Alliance Score: ${displayedScores.blue}` : "Blue Alliance Score: 0"}</Card.Title>
                <Card.Subtitle>{analyzedBlue[0] ? `${analyzedBlue[0].profile.teamNumber} - ${computeAverage(analyzedBlue[0])}` : "Blue 1: No Team Selected"}</Card.Subtitle>
                <Card.Subtitle>{analyzedBlue[1] ? `${analyzedBlue[1].profile.teamNumber} - ${computeAverage(analyzedBlue[1])}` : "Blue 2: No Team Selected"}</Card.Subtitle>
                <Card.Subtitle>{analyzedBlue[2] ? `${analyzedBlue[2].profile.teamNumber} - ${computeAverage(analyzedBlue[2])}` : "Blue 3: No Team Selected"}</Card.Subtitle>
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
          onClick={analyzeMatchup}
          disabled={!allSelected}
        >
          Analyze Matchup
        </Button>
      </div>
    </Container>
  );
}