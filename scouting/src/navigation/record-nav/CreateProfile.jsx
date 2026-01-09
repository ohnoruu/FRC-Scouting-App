import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Container, Form, Button, Col, Row, FloatingLabel } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';

import IntakeCheck from '../../components/record/IntakeCheck';
import RecordConsistency from '../../components/record/RecordConsistency';
import './CreateProfile.css';

export default function CreateProfile() {
    const navigate = useNavigate();
    const location = useLocation();
    const { teamNumber: initialTeamNumber } = useParams(); //get profile ID from URL if editing
    const isEditing = location.state?.isEditing; //Determining if editing mode
    const [loading, setLoading] = useState(isEditing); // Set loading to true if editing
    const [matches, setMatches] = useState([]); 

    //variables

    //REBUILT TO DO: update variables after kickoff
    const [teamName, setTeamName] = useState('');
    const [teamNumberState, setTeamNumberState] = useState(initialTeamNumber || ''); // Initialize teamNumberState with teamNumber if it exists
    
    const [dimensions, setDimensions] = useState({
        height: '',
        extendedHeight: '',
        weight: '',
    })

    const [drivebase, setDrivebase] = useState('');
    const drivebaseSelection = [
        { label: 'swerve', value: 'swerve' },
        { label: 'mechanum', value: 'mechanum' },
        { label: 'tank', value: 'tank' },
        { label: 'h-drive', value: 'h-drive' },
        { label: 'other', value: 'other' },
    ];

    const [playstyle, setPlaystyle] = useState({
        defense: false,
    });

    const [intake, setIntake] = useState({

    });

    const [scoreCapability, setScoreCapability] = useState({
        auto: null
    });

    const [climbing, setClimbing] = useState({

    });

    const [autoDetails, setAutoDetails] = useState('');
    //for auto capability, see scoreCapability
    const [additionalDetails, setAdditionalDetails] = useState('');

    useEffect(() => {
        console.log("Team number", initialTeamNumber);
        if (isEditing) {
            axios.get(`https://cyberlions-web-server-1028328220227.us-central1.run.app/getRobot/${initialTeamNumber}`)
                .then(response => {
                    const profile = response.data.profile;
                    setTeamName(profile.teamName || '');
                    setTeamNumberState(profile.teamNumber ? profile.teamNumber.toString() : '');
                    setDimensions(profile.dimensions || { height: '', extendedHeight: '', weight: '' });
                    setDrivebase(profile.drivebase || '');
                    setPlaystyle(profile.playstyle || { defense: false });
                    setIntake(profile.intake || {  });
                    setScoreCapability(profile.scoreCapability || {
                        auto: null
                    });
                    setClimbing(profile.climbing || {  });
                    setAutoDetails(profile.autoDetails || '');
                    setAdditionalDetails(profile.additionalDetails || '');
    
                    // Check if matches exist and set it
                    if (Array.isArray(response.data.matches) && response.data.matches.length > 0) {
                        setMatches(prevMatches => [
                            ...prevMatches, 
                            ...response.data.matches // Append the fetched matches to the previous ones
                        ]);
                    }
    
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching profile: ", error);
                    setLoading(false);
                });
        }
    }, [isEditing, initialTeamNumber]);
    

    //data manipulation functions

    const updatePlaystyle = (key) => {
        setPlaystyle(prev => ({
            ...prev, 
            [key]: !prev[key]
        }));
    };

    const updateIntake = (type, key, value) => {
        setIntake(prevState => ({
            ...prevState,
            [type]: { ...prevState[type], [key]: value }
        }));
    };

    const updateScoreCapability = (type, key, value) => {
        setScoreCapability(prev => ({
            ...prev,
            [type]: {
                ...prev[type],
                [key]: value
            }
        }));
    };

    const updateClimbing = (key) => {
        setClimbing(prev => ({
            ...prev,
            [key]: !prev[key] //toggle between true/false
        }));
    };

    const submitProfile = async () => {
        const profileData = {
            profile: {
                teamName,
                teamNumber: Number(teamNumberState),
                dimensions,
                drivebase,
                playstyle,
                intake,
                scoreCapability,
                climbing,
                autoDetails,
                additionalDetails,
            },
            matchData: Array.isArray(matches) ? matches : [], // Ensure matches is an array
        };
    
        try {
            if (isEditing) {
                // PUT request to update existing profile
                await axios.put(`https://cyberlions-web-server-1028328220227.us-central1.run.app/updateProfile/${initialTeamNumber}`, profileData);
            } else {
                // POST request to create a new profile
                await axios.post('https://cyberlions-web-server-1028328220227.us-central1.run.app/addProfile', profileData);
            }
        } catch (error) {
            console.error('Error submitting profile:', error);
        }
        navigate(-1);
    };

    if (loading) {
        return <div className="loadingMessage">Loading profile</div>;
    }

    return (
        <Container className="createProfile_container" fluid="md">
            <FaArrowLeft onClick={() => navigate(-1)} className="createProfile_backButton"/>
            <h1 style={{ textAlign: 'center'}}>{ isEditing ? "Edit Profile" : "Create Profile" }</h1>

            <div className="section">
                <h2>General Information</h2>
                <Form>
                    <Row>
                        <Col>
                            <FloatingLabel
                                controlId="teamNameInput"
                                label="Team Name"
                                className="mb-3"
                            >
                                <Form.Control 
                                    value={teamName} 
                                    onChange={(e) => setTeamName(e.target.value)} 
                                    type="text" 
                                    placeholder="Enter team name" 
                                />
                            </FloatingLabel>
                        </Col>
                        <Col>
                            <FloatingLabel
                                controlId="teamNumberInput"
                                label="Team Number"
                                className="mb-3"
                            >
                                <Form.Control
                                    value={teamNumberState}
                                    onChange={(e) => setTeamNumberState(e.target.value)}
                                    type="text"
                                    placeholder="Enter team number" 
                                />
                            </FloatingLabel>
                        </Col>
                    </Row>
                </Form>
            </div>

            <div className="section">
                <h2>Dimensions</h2>
                <p className="createProfile_caption">"What are the dimensions and weight of the robot?"</p>
                <Form>
                    <FloatingLabel
                        controlId="heightInput"
                        label="Height (inches)"
                        className="mb-3"
                    >
                        <Form.Control type="number" placeholder="Enter height"/>
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="extendedHeightInput"
                        label="Height when extended (inches)"
                        className="mb-3"
                    >
                        <Form.Control type="number" placeholder="Enter extended height"/>
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="weightInput"
                        label="Weight (pounds)"
                        className="mb-3"
                    >
                        <Form.Control type="number" placeholder="Enter weight"/>
                    </FloatingLabel>
                </Form>
            </div>

            <div className="section">
                <h2>Drivebase</h2>
                <p className="createProfile_caption">"What type of drivebase does the robot use? What type of modules are on the drivebase?"</p>
                <Form.Select 
                    aria-label="Drivebase Selection" 
                    value={drivebase} 
                    onChange={(e) => setDrivebase(e.target.value)}>
                    <option>Select Drivebase</option>
                    <option value="swerve">Swerve</option>
                    <option value="mechanum">Mechanum</option>
                    <option value="tank">Tank</option>
                    <option value="h-drive">H-Drive</option>
                    <option value="other">Other</option>
                </Form.Select>
            </div>

            
            <div className="section">
                <h2>Roles</h2>
                <p className="createProfile_caption">"What roles can the robot play during a match?"</p>
                <Form>
                    <Form.Check
                        type="checkbox"
                        label="Algae Scoring"
                        checked={playstyle.algae}
                        onChange={() => updatePlaystyle('algae')}
                        className="form-check-white"
                    />
                    <Form.Check
                        type="checkbox"
                        label="Coral Scoring"
                        checked={playstyle.coral}
                        onChange={() => updatePlaystyle('coral')}
                        className="form-check-white"
                    />
                    <Form.Check
                        type="checkbox"
                        label="Defense"
                        checked={playstyle.defense}
                        onChange={() => updatePlaystyle('defense')}
                        className="form-check-white"
                    />
                </Form>
            </div>

            <div className="section">
                <h1>Intake</h1>
                <p className="createProfile_caption">"How does the robot pick up game pieces?"</p>
                <IntakeCheck
                    description="Algae Intake"
                    gamepiece="algae"
                    value={intake}
                    hasSource={false}
                />
                <IntakeCheck
                    description="Coral Intake"
                    gamepiece="coral"
                    value={intake}
                    hasSource={true}
                />
            </div>

            <div className="section">
                <h1>Scoring</h1>
                <p className="createProfile_caption">"How does the robot score during a match, and how consistently when doing so?"</p>
            </div>

            <div className="section">
                <h2>Climbing</h2>
                <p className="createProfile_caption">"Where can the robot climb, and how consistently when doing so?"</p>
            </div>

            <div className="section">
                <h2>Autonomous</h2>
                <p className="createProfile_caption">"What does the robot do during auto? Is the auto consistent/reliable?"</p>
                <Form style={{ marginBottom: '1rem' }}>
                    <Form.Group>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={autoDetails}
                                onChange={(e) => setAutoDetails(e.target.value)}
                                placeholder="Briefly describe auto cycle (e.g., 1 pc algae, 2 pc coral)"
                            />
                    </Form.Group>
                </Form>
                <RecordConsistency
                    description="Autonomous Reliability"
                    value={scoreCapability.auto}
                    onChange={(value) => setScoreCapability(prev => ({ ...prev, auto: value }))}
                />
            </div>

            <div className="section">
                <h2>Additional Details/Comments</h2>
                <Form>
                    <Form.Group>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={additionalDetails}
                            onChange={(e) => setAdditionalDetails(e.target.value)}
                            placeholder="Provide any other details that would benefit drive team (e.g., issues with robot, new drivers)"
                        />
                    </Form.Group>
                </Form>
            </div>

            <Button
                variant="primary"
                onClick={submitProfile}
                className="submitProfile_button"
            >
                { isEditing ? "Save Changes" : "Create Profile" }
            </Button>
        </Container>
    );
}