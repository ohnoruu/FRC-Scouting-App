import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Image, Tab, Tabs, ListGroup, Card } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import fillerImg from '../../assets/interface-icons/filler-image.png';
import axios from 'axios';
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
                        <div className="profile_section">
                            <h2>Robot Details</h2>
                            <ListGroup>
                                <ListGroup.Item>Drivebase: {robotProfileData.profile?.drivebase}</ListGroup.Item>
                                <ListGroup.Item>Weight:</ListGroup.Item>
                                <ListGroup.Item>Height:</ListGroup.Item>
                                <ListGroup.Item>
                                    Playstyles: {[
                                        robotProfileData.profile?.playstyle?.algae && "Algae Scorer",
                                        robotProfileData.profile?.playstyle?.coral && "Coral Scorer", 
                                        robotProfileData.profile?.playstyle?.defense && "Defender"
                                    ].filter(Boolean).join(", " ) || "None"}
                                </ListGroup.Item>
                                <ListGroup.Item>Autonomous Details: {robotProfileData.profile?.autoDetails || 'N/A'}</ListGroup.Item>
                                <ListGroup.Item>Climbing:
                                    {robotProfileData.profile?.climbing?.shallow && ' Can climb shallow cage'} 
                                    {robotProfileData.profile?.climbing?.shallow && robotProfileData.profile?.climbing?.deep ? ' and ' : ''}
                                    {robotProfileData.profile?.climbing?.deep && 'Can climb deep cage'}
                                    {!robotProfileData.profile?.climbing?.shallow && !robotProfileData.profile?.climbing?.deep && 'None'}
                                </ListGroup.Item>
                                <ListGroup.Item>Algae Intake: {Object.entries(robotProfileData.profile?.intakeData.algae || {}).map(([key, value]) => value ? key : null).filter(Boolean).join(', ')}{robotProfileData.profile?.intakeData.algae?.other ? ` (${robotProfileData.profile.intakeData.algae.other})` : '' || ''}</ListGroup.Item>
                                <ListGroup.Item>Coral Intake: {Object.entries(robotProfileData.profile?.intakeData.coral || {}).map(([key, value]) => value ? key : null).filter(Boolean).join(', ')}{robotProfileData.profile?.intakeData.coral?.other ? ` (${robotProfileData.profile.intakeData.coral.other})` : '' || ''}</ListGroup.Item>
                            </ListGroup>
                        </div>

                        <div className="profile_section">
                            <h2>Scoring</h2>
                            <ListGroup>
                                
                            </ListGroup>
                            <p>Algae</p>
                            <ListGroup>
                                <ListGroup.Item>Algae (Net) - {computeScore(robotProfileData.profile?.scoreCapability.algae.netScoring)}</ListGroup.Item>
                                <ListGroup.Item>Algae (Processor) - {computeScore(robotProfileData.profile?.scoreCapability.algae.processorScoring)}</ListGroup.Item>
                            </ListGroup>
                        </div>
                    </Tab>
                    <Tab eventKey="match" title="Matches">

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
