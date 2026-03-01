import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Image, Tab, Tabs, ListGroup, Card, Overlay, Tooltip} from 'react-bootstrap';
import axios from 'axios';

import BackButton from '../../components/BackButton.jsx';
import MatchPreview from '../../components/search/MatchPreview.jsx'
import fillerImg from '../../assets/interface-icons/filler-image.png';
import './Profile.css';

export default function Profile() {
    const navigate = useNavigate();
    const { teamNumber } = useParams();
    const [robotProfileData, setRobotProfileData] = useState(null);
    const img = process.env.REACT_APP_BASE_URL + '/uploads/';

    useEffect(() => {
        console.log(`Fetching data for team number: ${teamNumber}`);
        if (teamNumber) {
            axios.get(`${process.env.REACT_APP_BASE_URL}/getRobot/${teamNumber}`)
                .then((response) => {
                    console.log('Data fetched successfully:', response.data);
                    setRobotProfileData(response.data);
                    console.log('Images:', response.data.robotImages);
                })
                .catch((error) => {
                    console.error("Error making GET Request (Profile, getRobot teamNumber): ", error);
                });
        }
    }, [teamNumber]);

    useEffect(() => {
        console.log('robotProfileData:', robotProfileData);
    }, [robotProfileData]);

    const computeScore = (value) => {
        switch(value){
            case 0: return 'None';
            case 1: return 'Inconsistent';
            case 2: return 'Consistent';
            default: return 'N/A';
        }
    };

    const computeAvgAutoScore = () => {
        if (!robotProfileData?.matches || robotProfileData.matches.length === 0) return 'N/A';

        const totalAutoScore = robotProfileData.matches.reduce((autoScore, match) => {
            if (match.matchType != 'Practice Match') {
                autoScore += match.autoScore || 0;
            }
            return autoScore;
        }, 0)
        return Math.round(totalAutoScore / robotProfileData.matches.filter(m => m.matchType != 'Practice Match').length);
    }

    const computeAvgTeleopScore = () => {
        if (!robotProfileData?.matches || robotProfileData.matches.length === 0) return 'N/A';

        const totalTeleopScore = robotProfileData.matches.reduce((teleopScore, match) => {
            if (match.matchType != 'Practice Match') {
                teleopScore += match.teleopScore || 0;
            }
            return teleopScore;
        }, 0)
        return Math.round(totalTeleopScore / robotProfileData.matches.filter(m => m.matchType != 'Practice Match').length);
    }

    const computeAvgTotalScore = () => {
        if (!robotProfileData?.matches || robotProfileData.matches.length === 0) return 'N/A';

        const totalTotalScore = robotProfileData.matches.reduce((totalScore, match) => {
            if (match.matchType != 'Practice Match') {
                totalScore += match.totalScore || 0;
            }
            return totalScore;
        }, 0)
        return Math.round(totalTotalScore / robotProfileData.matches.filter(m => m.matchType != 'Practice Match').length);
    }

    const computeAvgAutoAccuracy = () => {
        if (!robotProfileData?.matches || robotProfileData.matches.length === 0) return 'N/A';

        const totalAutoAccuracy = robotProfileData.matches.reduce((autoAccuracy, match) => {
            if (match.matchType != 'Practice Match') {
                autoAccuracy += match.autoAccuracy || 0;
            }
            return autoAccuracy;
        }, 0)
        return Math.round(totalAutoAccuracy / robotProfileData.matches.filter(m => m.matchType != 'Practice Match').length);
    }

    const computeAvgTeleopAccuracy = () => {
        if (!robotProfileData?.matches || robotProfileData.matches.length === 0) return 'N/A';

        const totalTeleopAccuracy = robotProfileData.matches.reduce((teleopAccuracy, match) => {
            if (match.matchType != 'Practice Match') {
                teleopAccuracy += match.teleopAccuracy || 0;
            }
            return teleopAccuracy;
        }, 0)
        return Math.round(totalTeleopAccuracy / robotProfileData.matches.filter(m => m.matchType != 'Practice Match').length);
    }

    const computeAvgTotalAccuracy = () => {
        if (!robotProfileData?.matches || robotProfileData.matches.length === 0) return 'N/A';
        const totalTotalAccuracy = robotProfileData.matches.reduce((totalAccuracy, match) => {
            if (match.matchType != 'Practice Match') {
                totalAccuracy += match.totalAccuracy || 0;
            }
            return totalAccuracy;
        }, 0)
        return Math.round(totalTotalAccuracy / robotProfileData.matches.filter(m => m.matchType != 'Practice Match').length); 
    }

    return (
        <Container className="profile_container" fluid="md">
            <BackButton/>
            {robotProfileData ? (
                <div className="profile_content">
                    <div className="profile_header">
                        <div className="profile_headerText">
                            <h1>{robotProfileData.profile?.teamName}</h1>
                            <h2>Team {robotProfileData.profile?.teamNumber}</h2>
                        </div>
                        <Image
                            src={
                                robotProfileData.profile?.robotImages?.[0]
                                    ? `${img}${robotProfileData.profile.robotImages[0]}`
                                    : fillerImg
                            }
                            alt="Robot"
                            className="profile_img"
                            thumbnail
                        />
                    </div>

                <Tabs 
                    style={{marginTop: '2rem'}}
                    defaultActiveKey="robot"
                    id="profile_tabs"
                    className="mb-3"
                >
                    <Tab eventKey="robot" title="Robot">
                        <div className="section">
                            <h2>Robot Overview</h2>
                            <ListGroup>
                                <ListGroup.Item><strong>Drivebase: </strong> {robotProfileData.profile?.drivebase || 'N/A'}</ListGroup.Item>
                                <ListGroup.Item><strong>Height: </strong> {robotProfileData.profile?.dimensions.height || 'N/A'}</ListGroup.Item>
                                <ListGroup.Item><strong>Extended Height: </strong> {robotProfileData.profile?.dimensions.extendedHeight || 'N/A'}</ListGroup.Item>
                                <ListGroup.Item><strong>Weight: </strong> {robotProfileData.profile?.dimensions.weight || 'N/A'}</ListGroup.Item>
                                <ListGroup.Item><strong>Autonomous Details:</strong> {robotProfileData.profile?.autoDetails || 'N/A'}</ListGroup.Item>
                                <ListGroup.Item><strong>Climbing: </strong>
                                    Low Rung ({computeScore(robotProfileData.profile?.climbing.lowRung) || 'N/A'}), 
                                    Mid Rung ({computeScore(robotProfileData.profile?.climbing.midRung) || 'N/A'}),
                                    High Rung ({computeScore(robotProfileData.profile?.climbing.highRung) || 'N/A'})
                                </ListGroup.Item>
                                <ListGroup.Item><strong>Intake: </strong>
                                    Fuel (Ground): {robotProfileData.profile?.intake.fuel.ground?.toString() || 'N/A'}, 
                                    Fuel (Source): {robotProfileData.profile?.intake.fuel.source?.toString() || 'N/A'}
                                </ListGroup.Item>
                            </ListGroup>
                        </div>

                        <div className="section">
                            <h2>Design & Constraints</h2>
                            <ListGroup>
                                <ListGroup.Item>
                                    <strong>Lane Preference: </strong>
                                    {robotProfileData.profile?.lanePreference
                                        ? [
                                            robotProfileData.profile.lanePreference.bump && "Bump",
                                            robotProfileData.profile.lanePreference.trench && "Trench"
                                        ]
                                            .filter(Boolean)
                                            .join(", ") || "None"
                                        : "N/A"}
                                </ListGroup.Item>
                                <ListGroup.Item><strong>Hopper Capacity: </strong>{robotProfileData.profile?.hopperCapacity || 'N/A'}</ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Feeding Style: </strong>
                                    {robotProfileData.profile?.feedingStyle 
                                        ? [
                                            robotProfileData.profile.feedingStyle.dump && "Dump", 
                                            robotProfileData.profile.feedingStyle.launch && "Launch"
                                        ]
                                            .filter(Boolean)
                                            .join(", ") || "None"
                                        : "N/A"
                                    }
                                
                                </ListGroup.Item>
                            </ListGroup>
                        </div>

                        <div className="section">
                            <h2>Scoring Capabilities</h2>
                            <p>Scoring Fuel</p>
                            <ListGroup>
                                <ListGroup.Item><strong>Hub: </strong>{computeScore(robotProfileData.profile?.scoring.hub) || 'N/A'}</ListGroup.Item>
                            </ListGroup>

                            <p>Speed</p>
                            <ListGroup>
                                <ListGroup.Item><strong>Reported Cycle Time: </strong>{robotProfileData.profile?.cycleTime || 'N/A'}</ListGroup.Item>
                                <ListGroup.Item><strong>Max Speed: </strong>{robotProfileData.profile?.maxSpeed || 'N/A'}</ListGroup.Item>
                            </ListGroup>

                            <p>Autonomous</p>
                            <ListGroup>
                                <ListGroup.Item>{computeScore(robotProfileData.profile?.auto) || 'N/A'}</ListGroup.Item>
                            </ListGroup>
                        </div>

                        <div className="section">
                            <h2>Average Stats</h2>
                                
                                <p>Average Raw Score</p>
                                <ListGroup>
                                    <ListGroup.Item><strong>Autonomous: </strong>{computeAvgAutoScore()}</ListGroup.Item>
                                    <ListGroup.Item><strong>Teleop: </strong>{computeAvgTeleopScore()}</ListGroup.Item>
                                    <ListGroup.Item><strong>Total: </strong>{computeAvgTotalScore()}</ListGroup.Item>
                                </ListGroup>

                                <p>Average Accuracy</p>
                                <ListGroup>
                                    <ListGroup.Item><strong>Autonomous: </strong>{computeAvgAutoAccuracy()}%</ListGroup.Item>
                                    <ListGroup.Item><strong>Teleop: </strong>{computeAvgTeleopAccuracy()}%</ListGroup.Item>
                                    <ListGroup.Item><strong>Total: </strong>{computeAvgTotalAccuracy()}%</ListGroup.Item>
                                </ListGroup>
                        </div>
                    </Tab>
                    <Tab eventKey="match" title="Matches">
                        <div className="section">
                            <h2>Match History</h2>
                            <div className="profile_matchSection">
                                {robotProfileData?.matches?.map((match) => (
                                    <div key={`${robotProfileData.profile?.teamName} match ${match.matchNumber}`}
                                        onClick={() => navigate('/navigator/search/match-stats', { state: { teamNumber: robotProfileData.profile?.teamNumber, matchData: match } })}>

                                        <MatchPreview matchData={match} />

                                    </div>
                                ))}
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="photos" title="Photos">
                        <div className="section">
                            <h2>Robot Photos</h2>

                            {robotProfileData.profile?.robotImages?.length > 0 ? (
                                <div className="profile_photoGrid">
                                    {robotProfileData.profile?.robotImages?.map((filename, index) => (
                                        <Card
                                            key={index}
                                            className="profile_photoCard"
                                        >
                                            <Image
                                                src={`${img}${filename || fillerImg}`}
                                                alt={`Robot Photo ${index + 1}`}
                                                fluid
                                                rounded
                                                loading="lazy"
                                            />
                                            
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                <p>No photos uploaded.</p>
                            )}
                        </div>
                    </Tab>
                </Tabs>

                </div>
            ) : (
                <h1>Loading...</h1>
            )}
        </Container>
    );
}
