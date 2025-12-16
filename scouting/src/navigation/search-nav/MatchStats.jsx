import React, { useEffect, useState, useRef } from 'react';
import { Container, ListGroup, Overlay, Tooltip, Table } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaInfoCircle } from 'react-icons/fa';
import axios from 'axios';
import './MatchStats.css';

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
            axios.get(`https://cyberlions-web-server-1028328220227.us-central1.run.app/getRobot/${teamNumber}`)
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
            <FaArrowLeft onClick={() => navigate(-1)} className="matchStats_backButton"/>
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
                                <strong>Raw Score: </strong> {matchData.score}
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
                            <ListGroup.Item><strong>Comments: </strong>{matchData.comment || "None"}</ListGroup.Item>
                        </ListGroup>


                        <div className="section">
                            <h2>Autonomous</h2>
                            <ListGroup>
                                <ListGroup.Item><strong>Left Starting Line: </strong>{matchData.leave_auto.toString()}</ListGroup.Item>
                            </ListGroup>

                            <p style={{marginTop: '1rem'}}>Coral</p>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Level</th>
                                        <th>Scored</th>
                                        <th>Missed</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>L1</td>
                                        <td>{matchData.auto_L1_scores}</td>
                                        <td>{matchData.auto_L1_misses}</td>
                                    </tr>
                                    <tr>
                                        <td>L2</td>
                                        <td>{matchData.auto_L2_scores}</td>
                                        <td>{matchData.auto_L2_misses}</td>
                                    </tr>
                                    <tr>
                                        <td>L3</td>
                                        <td>{matchData.auto_L3_scores}</td>
                                        <td>{matchData.auto_L3_misses}</td>
                                    </tr>
                                    <tr>
                                        <td>L4</td>
                                        <td>{matchData.auto_L4_scores}</td>
                                        <td>{matchData.auto_L4_misses}</td>
                                    </tr>
                                    <tr>
                                        <td>Total</td>
                                        <td>{matchData.auto_L1_scores + matchData.auto_L2_scores + matchData.auto_L3_scores + matchData.auto_L4_scores}</td>
                                        <td>{matchData.auto_L1_misses + matchData.auto_L2_misses + matchData.auto_L3_misses + matchData.auto_L4_misses}</td>
                                    </tr>
                                </tbody>
                            </Table>

                            <p>Algae</p>
                            <Table striped border hover>
                                <thead>
                                    <tr>
                                        <th>Scoring Location</th>
                                        <th>Scored</th>
                                        <th>Missed</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Net</td>
                                        <td>{matchData.auto_net}</td>
                                        <td>{matchData.auto_net_misses}</td>
                                    </tr>
                                    <tr>
                                        <td>Processor</td>
                                        <td>{matchData.auto_processor}</td>
                                        <td>{matchData.auto_processor_misses}</td>
                                    </tr>
                                    <tr>
                                        <td>Total</td>
                                        <td>{matchData.auto_net + matchData.auto_processor}</td>
                                        <td>{matchData.auto_net_misses + matchData.auto_processor_misses}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>

                        <div className="section">
                            <h2>Teleop</h2>
                            <p style={{marginTop: '1rem'}}>Coral</p>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Level</th>
                                        <th>Scored</th>
                                        <th>Missed</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>L1</td>
                                        <td>{matchData.teleop_L1_scores}</td>
                                        <td>{matchData.teleop_L1_misses}</td>
                                    </tr>
                                    <tr>
                                        <td>L2</td>
                                        <td>{matchData.teleop_L2_scores}</td>
                                        <td>{matchData.teleop_L2_misses}</td>
                                    </tr>
                                    <tr>
                                        <td>L3</td>
                                        <td>{matchData.teleop_L3_scores}</td>
                                        <td>{matchData.teleop_L3_misses}</td>
                                    </tr>
                                    <tr>
                                        <td>L4</td>
                                        <td>{matchData.teleop_L4_scores}</td>
                                        <td>{matchData.teleop_L4_misses}</td>
                                    </tr>
                                    <tr>
                                        <td>Total</td>
                                        <td>{matchData.teleop_L1_scores + matchData.teleop_L2_scores + matchData.teleop_L3_scores + matchData.teleop_L4_scores}</td>
                                        <td>{matchData.teleop_L1_misses + matchData.teleop_L2_misses + matchData.teleop_L3_misses + matchData.teleop_L4_misses}</td>
                                    </tr>
                                </tbody>
                            </Table>

                            <p>Algae</p>
                            <Table striped border hover>
                                <thead>
                                    <tr>
                                        <th>Scoring Location</th>
                                        <th>Scored</th>
                                        <th>Missed</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Net</td>
                                        <td>{matchData.teleop_net}</td>
                                        <td>{matchData.teleop_net_misses}</td>
                                    </tr>
                                    <tr>
                                        <td>Processor</td>
                                        <td>{matchData.teleop_processor}</td>
                                        <td>{matchData.teleop_processor_misses}</td>
                                    </tr>
                                    <tr>
                                        <td>Total</td>
                                        <td>{matchData.teleop_net + matchData.teleop_processor}</td>
                                        <td>{matchData.teleop_net_misses + matchData.teleop_processor_misses}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>

                        <div className="section">
                            <h2>Endgame</h2>
                            <ListGroup>
                                <ListGroup.Item><strong>Parked: </strong>{matchData.parked.toString()}</ListGroup.Item>
                                <ListGroup.Item><strong>Climbed shallow cage: </strong>{matchData.shallow_climbed.toString()}</ListGroup.Item>
                                <ListGroup.Item><strong>Climbed deep cage: </strong>{matchData.deep_climbed.toString()}</ListGroup.Item>
                            </ListGroup>
                        </div>
                    </div>
                </>
                }
        </Container>
    );
}
