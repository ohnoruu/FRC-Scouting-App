import React, { useEffect, useState, useRef } from 'react';
import { Container, ListGroup, Overlay, Tooltip, Table } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaInfoCircle } from 'react-icons/fa';
import axios from 'axios';
import './MatchStats.css';

import BackButton from '../../components/BackButton.jsx';

export default function MatchStats() {
    const navigate = useNavigate();
    const location = useLocation();

    // tooltip control
    const [showTooltip, setShowTooltip] = useState(false);
    const infoRef = useRef(null);

    const { teamNumber, matchData } = location.state || {};

    const [robotProfileData, setRobotProfileData] = useState();

    useEffect(() => {
        if (teamNumber) {
            axios.get(`${process.env.REACT_APP_BASE_URL}/getRobot/${teamNumber}`)
                .then((response) => {
                    setRobotProfileData(response.data);
                })
                .catch((error) => {
                    console.error("Error making GET Request (MatchStats, getRobot teamNumber): ", error);
                });
        }
    }, [teamNumber]);

    return (
        <Container className="matchStats_container" fluid="md">
            <BackButton/>
                {matchData && robotProfileData && 
                <>
                    <div className="matchStats_header">
                        <h1>{robotProfileData.profile?.teamName}</h1>
                        <h2>Team {robotProfileData.profile?.teamNumber}</h2>
                    </div>

                    <div className="matchStats_matchInfo">
                        <h2>Match {matchData.matchNumber} Details</h2>
                        <ListGroup>
                            <ListGroup.Item><strong>Match Type: </strong> {matchData.matchType}</ListGroup.Item>
                            <ListGroup.Item className="position-relative">
                                <strong>Total Raw Score: </strong> {matchData.totalScore}
                                <span ref={infoRef} className="d-inline-block">
                                    <FaInfoCircle
                                        className="matchStats_infoIcon"
                                        tabIndex={0}
                                        aria-label="Raw Score Info"
                                        onClick={() => setShowTooltip((s) => !s)}
                                        onMouseEnter={() => setShowTooltip(true)}
                                        onMouseLeave={() => setShowTooltip(false)}
                                    />
                                </span>
                                <Overlay
                                    target={infoRef.current}
                                    show={showTooltip}
                                    placement="right"
                                    container={document.body}
                                    containerPadding={8}
                                >
                                    <Tooltip id="raw-score-tooltip">
                                        The raw score is calculated based on the scoring actions performed by the singular robot during the match, without any adjustments or penalties.
                                    </Tooltip>
                                </Overlay>
                            </ListGroup.Item>
                            <ListGroup.Item><strong>Total Accuracy: </strong>{matchData.totalAccuracy || "N/A"}%</ListGroup.Item>
                            <ListGroup.Item><strong>Reported Playstyle: </strong>
                                {matchData.playstyle 
                                ? [
                                    matchData.playstyle.scoring && "Scoring",
                                    matchData.playstyle.passing && "Passing",
                                    matchData.playstyle.defense && "Defense"
                                ].filter(Boolean)
                                .join(", ")  || "None"
                                : "N/A"}
                            </ListGroup.Item>
                            <ListGroup.Item><strong>Comments: </strong>{matchData.comments || "None"}</ListGroup.Item>
                        </ListGroup>


                        <div className="section">
                            <h2>Autonomous</h2>
                            <ListGroup>
                                <ListGroup.Item><strong>Climbed Low Rung: </strong>{matchData.autoLowRungClimb.toString()}</ListGroup.Item>
                            </ListGroup>

                            <p style={{marginTop: '1rem'}}>Fuel</p>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Scored</th>
                                        <th>Missed</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{matchData.autoFuelScores}</td>
                                        <td>{matchData.autoFuelMisses}</td>
                                    </tr>
                                </tbody>
                            </Table>
                            
                            <ListGroup>
                                <ListGroup.Item><strong>Score: </strong>{matchData.autoScore || "N/A"}</ListGroup.Item>
                                <ListGroup.Item><strong>Accuracy: </strong>{matchData.autoAccuracy || "N/A"}%</ListGroup.Item>
                            </ListGroup>

                        </div>

                        <div className="section">
                            <h2>Teleop</h2>
                            <p style={{marginTop: '1rem'}}>Fuel</p>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Scored</th>
                                        <th>Missed</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{matchData.teleopFuelScores}</td>
                                        <td>{matchData.teleopFuelMisses}</td>
                                    </tr>
                                </tbody>
                            </Table>

                            <ListGroup>
                                <ListGroup.Item><strong>Score: </strong>{matchData.teleopScore || "N/A"}</ListGroup.Item>
                                <ListGroup.Item><strong>Accuracy: </strong>{matchData.teleopAccuracy || "N/A"}%</ListGroup.Item>
                            </ListGroup>
                        </div>

                        <div className="section">
                            <h2>Endgame</h2>
                            <ListGroup>
                                <ListGroup.Item><strong>Climbed Low Rung: </strong>{matchData.lowRungClimb.toString()}</ListGroup.Item>
                                <ListGroup.Item><strong>Climbed Mid Rung: </strong>{matchData.midRungClimb.toString()}</ListGroup.Item>
                                <ListGroup.Item><strong>Climbed High Rung: </strong>{matchData.highRungClimb.toString()}</ListGroup.Item>
                            </ListGroup>
                        </div>
                    </div>
                </>
                }
        </Container>
    );
}
