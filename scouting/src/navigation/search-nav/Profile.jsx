import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Image, Tab, Tabs, ListGroup, Card } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';

import MatchPreview from '../../components/search/MatchPreview.jsx'
import fillerImg from '../../assets/interface-icons/filler-image.png';
import './Profile.css';

export default function Profile() {
    const navigate = useNavigate();
    const { teamNumber } = useParams();
    const [robotProfileData, setRobotProfileData] = useState(null);

    useEffect(() => {
        console.log(`Fetching data for team number: ${teamNumber}`);
        if (teamNumber) {
            axios.get(`https://cyberlions-web-server-1028328220227.us-central1.run.app/getRobot/${teamNumber}`)
                .then((response) => {
                    console.log('Data fetched successfully:', response.data);
                    setRobotProfileData(response.data);
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

    return (
        <Container className="profile_container" fluid="md">
            <FaArrowLeft onClick={() => navigate(-1)} className="profile_backButton"/>
            {robotProfileData ? (
                <div className="profile_content">
                    <div className="profile_header">
                        <div className="profile_headerText">
                            <h1>{robotProfileData.profile?.teamName}</h1>
                            <h2>Team {robotProfileData.profile?.teamNumber}</h2>
                        </div>
                        <Image
                            src={fillerImg}
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
                            <h2>Robot Details</h2>
                            <ListGroup>
                                <ListGroup.Item><strong>Drivebase:</strong> {robotProfileData.profile?.drivebase}</ListGroup.Item>
                                <ListGroup.Item><strong>Height:</strong> {robotProfileData.profile?.dimensions.height}</ListGroup.Item>
                                <ListGroup.Item><strong>Extended Height:</strong> {robotProfileData.profile?.dimensions.extendedHeight}</ListGroup.Item>
                                <ListGroup.Item><strong>Weight:</strong> {robotProfileData.profile?.dimensions.weight}</ListGroup.Item>

                                <ListGroup.Item><strong>Autonomous Details:</strong> {robotProfileData.profile?.autoDetails || 'N/A'}</ListGroup.Item>
                                <ListGroup.Item><strong>Climbing: </strong>
                                    {robotProfileData.profile?.climbing?.shallow && ' Can climb shallow cage'} 
                                    {robotProfileData.profile?.climbing?.shallow && robotProfileData.profile?.climbing?.deep ? ' and ' : ''}
                                    {robotProfileData.profile?.climbing?.deep && 'Can climb deep cage'}
                                    {!robotProfileData.profile?.climbing?.shallow && !robotProfileData.profile?.climbing?.deep && 'None'}
                                </ListGroup.Item>
                                <ListGroup.Item><strong>Algae Intake:</strong> {Object.entries(robotProfileData.profile?.intakeData.algae || {}).map(([key, value]) => value ? key : null).filter(Boolean).join(', ')}{robotProfileData.profile?.intakeData.algae?.other ? ` (${robotProfileData.profile.intakeData.algae.other})` : '' || ''}</ListGroup.Item>
                                <ListGroup.Item><strong>Coral Intake:</strong> {Object.entries(robotProfileData.profile?.intakeData.coral || {}).map(([key, value]) => value ? key : null).filter(Boolean).join(', ')}{robotProfileData.profile?.intakeData.coral?.other ? ` (${robotProfileData.profile.intakeData.coral.other})` : '' || ''}</ListGroup.Item>
                                <ListGroup.Item><strong>Reported Cycle Time:</strong></ListGroup.Item>
                            </ListGroup>
                        </div>

                        <div className="section">
                            <h2>Scoring Capabilities</h2>
                            <ListGroup>
                                
                            </ListGroup>
                            <p>Algae</p>
                            <ListGroup>
                                <ListGroup.Item><strong>Algae (Net):</strong> {computeScore(robotProfileData.profile?.scoreCapability.algae.netScoring)}</ListGroup.Item>
                                <ListGroup.Item><strong>Algae (Processor):</strong> {computeScore(robotProfileData.profile?.scoreCapability.algae.processorScoring)}</ListGroup.Item>
                            </ListGroup>
                            <p>Coral</p>
                            <ListGroup>
                                <ListGroup.Item>
                                        {Object.entries(robotProfileData.profile?.scoreCapability.coral || {})
                                        .filter(([level, value]) => value !== undefined)
                                        .map(([level, value]) => `${level}: ${computeScore(value)}`)
                                        .join(', ') || 'None'}
                                </ListGroup.Item>
                            </ListGroup>
                            <p>Autonomous</p>
                            <ListGroup>
                                <ListGroup.Item>{computeScore(robotProfileData.profile?.scoreCapability.autoCapability)}</ListGroup.Item>
                            </ListGroup>
                            
                            <p>Average Raw Score</p>
                            <ListGroup>
                                <ListGroup.Item><strong>Autonomous:</strong></ListGroup.Item>
                                <ListGroup.Item><strong>Teleop:</strong></ListGroup.Item>
                                <ListGroup.Item><strong>Total:</strong></ListGroup.Item>
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

                    </Tab>
                </Tabs>

                </div>
            ) : (
                <h1>Loading...</h1>
            )}
        </Container>
    );
}
