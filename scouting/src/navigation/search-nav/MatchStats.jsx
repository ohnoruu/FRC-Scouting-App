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
                        <h2>Match {matchData.matchNumber} Stats</h2>
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
                        </ListGroup>
                        
                    </div>
                </>
                }
        </Container>
    );
}
