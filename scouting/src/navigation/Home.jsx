import React, { useEffect, useState, useRef } from 'react';
import { Container, Form, Card, Button } from 'react-bootstrap';
import './Home.css';

import MatchupProfile from '../components/home/MatchupProfile';
import StatGlimpsev2 from '../components/StatGlimpsev2';

export default function Home() {
  const topRef = useRef(null);
  const [analyzed, setAnalyzed] = useState(false);
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

  useEffect(() => {
    const saved = localStorage.getItem("matchPrediction");
    if (!saved || robots.length === 0) return;

    const parsed = JSON.parse(saved);

    const restoreAlliance = (teamNumbers) =>
      teamNumbers.map(num =>
        robots.find(r => r.profile.teamNumber === num) || null
      );

    const restoredRed = restoreAlliance(parsed.red);
    const restoredBlue = restoreAlliance(parsed.blue);

    setRedAlliance(restoredRed);
    setBlueAlliance(restoredBlue);
    setAnalyzedRed(restoredRed);
    setAnalyzedBlue(restoredBlue);
    setDisplayedScores(parsed.displayedScores);
    setPrediction(parsed.prediction);

    setAnalyzed(parsed.analyzed);
  }, [robots]);

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
          style={{ marginTop: '0.5rem', backgroundColor: color === 'red' ? 'var(--primary-color-2)' : 'var(--primary-color-4)', color: 'white' }}
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

    // scroll to top
    topRef.current.scrollIntoView({ behavior: 'smooth' });

    // save data to local storage
    const result = {
      red: redAlliance.map(r => r?.profile.teamNumber || null),
      blue: blueAlliance.map(r => r?.profile.teamNumber || null),
      displayedScores: {
        red: redScore,
        blue: blueScore
      },
      prediction: {
        red: redScore,
        blue: blueScore,
        winner:
          redScore > blueScore
            ? 'Red Alliance Victory'
            : blueScore > redScore
            ? 'Blue Alliance Victory'
            : 'Tie'
      },
      analyzed: true
    };

    localStorage.setItem("matchPrediction", JSON.stringify(result));
    setAnalyzed(true);
  }

  const resetAll = () => {
    setRedAlliance([null, null, null]);
    setBlueAlliance([null, null, null]);
    setAnalyzed(false);
    setPrediction(null);
    setDisplayedScores({ red: 0, blue: 0 });
    setAnalyzedRed([]);
    setAnalyzedBlue([]);
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
              </Card.Body>
            </Card>
          </div>

          <div className="home-scoreCard">
            <Card>
              <Card.Body>
                <Card.Title style={{color: "var(--primary-color-4)"}}>{blueAlliance.length > 0 ? `Blue Alliance Score: ${displayedScores.blue}` : "Blue Alliance Score: 0"}</Card.Title>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>

      { analyzed && (
        <div className="section">
          <h2 style={{textAlign: "center"}}>Red Alliance Overview</h2>
          <StatGlimpsev2 robot={analyzedRed[0]} allianceColor="red"/>
          <StatGlimpsev2 robot={analyzedRed[1]} allianceColor="red"/>
          <StatGlimpsev2 robot={analyzedRed[2]} allianceColor="red"/>
        </div>
      )}

      { analyzed && (
        <div className="section">
          <h2 style={{textAlign: "center"}}>Blue Alliance Overview</h2>
          <StatGlimpsev2 robot={analyzedBlue[0]} allianceColor="blue"/>
          <StatGlimpsev2 robot={analyzedBlue[1]} allianceColor="blue"/>
          <StatGlimpsev2 robot={analyzedBlue[2]} allianceColor="blue"/>
        </div>
      )}

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
          variant="secondary"
          onClick={resetAll}
          style={{ display: 'block', margin: '1rem auto' }}
        >
          Reset All
        </Button>

        <Button
          variant="success"
          size="lg"
          style={{ display: 'block', margin: '2rem auto' }}
          onClick={analyzeMatchup}
          disabled={!allSelected}
        >
          Analyze Matchup (⌐■_■)
        </Button>
      </div>
    </Container>
  );
}