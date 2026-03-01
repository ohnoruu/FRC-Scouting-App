import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Container, FloatingLabel, Form, Button} from 'react-bootstrap';
import axios from 'axios';

import BackButton from '../../components/BackButton.jsx';
import MultiCounter from '../../components/record/MultiCounter';
import './RecordMatch.css';

export default function RecordMatch() {
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();
    const { teamNumber } = useParams();
    const location = useLocation();
    const { robot } = location.state;

    const matchTypeSelection = [
        { label: 'Practice Match', value: 'Practice Match' },
        { label: 'Qualification Match', value: 'Qualification Match' },
        { label: 'Playoff Match', value: 'Playoff Match' },
        { label: 'Finals', value: 'Finals' },
    ];

    //General Info
    const [matchType, setMatchType] = useState("");
    const [matchNumber, setMatchNumber] = useState(null);

    //Autonomous
    const [autoFuelScores, setAutoFuelScores] = useState(0);
    const [autoFuelMisses, setAutoFuelMisses] = useState(0);

    const [autoLowRungClimb, setAutoLowRungClimb] = useState(false);

    //Teleop
    const [teleopFuelScores, setTeleopFuelScores] = useState(0);
    const [teleopFuelMisses, setTeleopFuelMisses] = useState(0);

    //Climbing
    const [lowRungClimb, setLowRungClimb] = useState(false);
    const [midRungClimb, setMidRungClimb] = useState(false);
    const [highRungClimb, setHighRungClimb] = useState(false);

    //Description
    const [ playstyle, setPlaystyle ] = useState({
        scoring: false,
        passing: false,
        defense: false
    })
    const [comments, setComments] = useState('');

    // Seperate Scores & Accuracies
    const [autoScore, setAutoScore] = useState(0);
    const [teleopScore, setTeleopScore] = useState(0);
    const [autoAccuracy, setAutoAccuracy] = useState(0);
    const [teleopAccuracy, setTeleopAccuracy] = useState(0);

    //Overall Score & Accuracy
    const [totalScore, setTotalScore] = useState(0);
    const [totalAccuracy, setTotalAccuracy] = useState(0);

    const computeAutoScore = () => {
        return autoFuelScores + (autoLowRungClimb ? 15 : 0);
    }

    const computeTeleopScore = () => {
        return teleopFuelScores;
    }

    const computeClimbScore = () => {
        return (lowRungClimb ? 10 : 0) + (midRungClimb ? 20 : 0) + (highRungClimb ? 30 : 0);
    }

    const computeTotalScore = () => {
       const autoScore = computeAutoScore();
       const teleopScore = computeTeleopScore();
       const climbScore = computeClimbScore();
       return autoScore + teleopScore + climbScore;
    }

    const computeAutoAccuracy = () => {
        const totalAutoShots = autoFuelScores + autoFuelMisses;
        if (totalAutoShots === 0) return 0;
        return Math.round((autoFuelScores / totalAutoShots) * 100);
    }

    const computeTeleopAccuracy = () => {
        const totalTeleopShots = teleopFuelScores + teleopFuelMisses;
        if (totalTeleopShots === 0) return 0;
        return Math.round((teleopFuelScores / totalTeleopShots) * 100);
    }

    const computeTotalAccuracy = () => {
        const totalShots = autoFuelScores + autoFuelMisses + teleopFuelScores + teleopFuelMisses;
        const totalScores = autoFuelScores + teleopFuelScores;
        if (totalShots === 0) return 0;
        return Math.round((totalScores / totalShots) * 100);
    }

    const submitMatch = async () => {
        if (submitting) return;
        setSubmitting(true);
        
        const calculatedAutoScore = computeAutoScore();
        const calculatedTeleopScore = computeTeleopScore();
        const calculatedTotalScore = computeTotalScore();
        const calculatedAutoAccuracy = computeAutoAccuracy();
        const calculatedTeleopAccuracy = computeTeleopAccuracy();
        const calculatedTotalAccuracy = computeTotalAccuracy();
        
        const matchData = {
            matchType,
            matchNumber: Number(matchNumber),
            autoFuelScores,
            autoFuelMisses,
            autoLowRungClimb,
            teleopFuelScores,
            teleopFuelMisses,
            lowRungClimb,
            midRungClimb,
            highRungClimb,
            playstyle,
            comments,
            autoScore: calculatedAutoScore,
            teleopScore: calculatedTeleopScore,
            autoAccuracy: calculatedAutoAccuracy,
            teleopAccuracy: calculatedTeleopAccuracy,
            totalScore: calculatedTotalScore,
            totalAccuracy: calculatedTotalAccuracy    
        };

        try {
            await axios.post(`${process.env.REACT_APP_BASE_URL}/addMatch/${teamNumber}`, matchData);
        } catch (error) {
            console.error('Error making a POST request:', error);
        }

        setSubmitting(false);
        navigate(-1);
    };

    return (
        <>
            <Container className="recordMatch_container" fluid="md">
                <BackButton/>
                <h1 style={{ textAlign: 'center' }}>Record Match for Team {teamNumber}</h1>

                <div className="section">
                    <h2>General Match Info</h2>
                    <Form>
                        <Form.Select
                            aria-label="Match Type"
                            value={matchType}
                            onChange={(e) => setMatchType(e.target.value)}
                        >
                            <option>Select Match Type</option>
                            <option value="Practice Match">Practice Match</option>
                            <option value="Qualification Match">Qualification Match</option>
                            <option value="Playoff Match">Playoff Match</option>
                            <option value="Finals">Finals</option>
                        </Form.Select>
                    </Form>
                    <Form style={{ marginTop: '1rem'}}>
                        <FloatingLabel
                            controlId="matchNumberInput"
                            label="Match Number"
                            className="mb-3"
                        >
                            <Form.Control
                                type="number"
                                placeholder="Match Number"
                                value={matchNumber}
                                onChange={(e) => setMatchNumber(e.target.value)}
                            />
                        </FloatingLabel>
                    </Form>
                </div>

                <div className="section">
                    <h2>Autonomous</h2>
                    <MultiCounter
                        title="Fuel Scores"
                        target={autoFuelScores}
                        setTarget={setAutoFuelScores}
                    />
                    <MultiCounter
                        title="Fuel Misses"
                        target={autoFuelMisses}
                        setTarget={setAutoFuelMisses}
                    />
                    <Form>
                        <Form.Check
                            type="checkbox"
                            label="Climbed Low Rung"
                            checked={autoLowRungClimb}
                            onChange={(e) => setAutoLowRungClimb(e.target.checked)}
                            className="form-check-white"
                        />
                    </Form>
                </div>

                <div className="section">
                    <h2>Teleop</h2>
                    <MultiCounter
                        title="Fuel Scores"
                        target={teleopFuelScores}
                        setTarget={setTeleopFuelScores}
                    />
                    <MultiCounter
                        title="Fuel Misses"
                        target={teleopFuelMisses}
                        setTarget={setTeleopFuelMisses}
                    />
                </div>

                <div className="section">
                    <h2>Endgame Actions</h2>
                    <Form>
                        <Form.Check
                            type="checkbox"                            
                            label="Climbed Low Rung"
                            checked={lowRungClimb}
                            onChange={
                                (e) => {
                                    if (midRungClimb || highRungClimb) {
                                        setMidRungClimb(false);
                                        setHighRungClimb(false);
                                    }
                                    setLowRungClimb(e.target.checked);
                                }
                            }
                            className="form-check-white"
                        />
                        <Form.Check
                            type="checkbox"                            
                            label="Climbed Mid Rung"
                            checked={midRungClimb}
                            onChange={
                                (e) => {
                                    if (lowRungClimb || highRungClimb) {
                                        setLowRungClimb(false);
                                        setHighRungClimb(false);
                                    }
                                    setMidRungClimb(e.target.checked);
                                }
                            }
                            className="form-check-white"
                        />
                        <Form.Check
                            type="checkbox"                            
                            label="Climbed High Rung"
                            checked={highRungClimb}
                            onChange={
                                (e) => {
                                    if (lowRungClimb || midRungClimb) {
                                        setLowRungClimb(false);
                                        setMidRungClimb(false);
                                    }
                                    setHighRungClimb(e.target.checked);
                                }
                            }
                            className="form-check-white"
                        />
                    </Form>
                </div>
                <div className="section">
                    <h2>Playstyle</h2>
                    <p className="caption">What role(s) did the robot play during the match?</p>
                    <Form>
                        <Form.Check
                            type="checkbox"
                            label="Scoring"
                            checked={playstyle.scoring}
                            onChange={(e) => setPlaystyle({...playstyle, scoring: e.target.checked})}
                            className="form-check-white"
                        />
                        <Form.Check
                            type="checkbox"
                            label="Passing"
                            checked={playstyle.passing}
                            onChange={(e) => setPlaystyle({...playstyle, passing: e.target.checked})}
                            className="form-check-white"
                        />
                        <Form.Check
                            type="checkbox"
                            label="Defense"
                            checked={playstyle.defense}
                            onChange={(e) => setPlaystyle({...playstyle, defense: e.target.checked})}
                            className="form-check-white"
                        />
                    </Form>
                </div>

                <div className="section">
                    <h2>Comments</h2>
                    <Form>
                        <Form.Group>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Notable details about the match (e.g., issues, standout moments)?"
                                value={comments}
                                onChange={(e) => setComments(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </div>

                <Button
                    variant="primary"
                    onClick={submitMatch}
                    className="recordMatch-submitButton"
                    disabled={submitting}
                >
                    {submitting ? "Submitting..." : "Submit Match Report"}
                </Button>
            </Container>
        </>
    );
}
