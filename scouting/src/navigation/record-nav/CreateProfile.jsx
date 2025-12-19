import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Container, Form, Button, Col, Row, FloatingLabel } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import ReefscapeChecklist from '../../components/record/ReefscapeChecklist';
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
    const [teamName, setTeamName] = useState('');
    const [teamNumberState, setTeamNumberState] = useState(initialTeamNumber || ''); // Initialize teamNumberState with teamNumber if it exists
    const [playstyle, setPlaystyle] = useState({
        algae: false, 
        coral: false,
        defense: false,
    });
    const [drivebase, setDrivebase] = useState('');
    const drivebaseSelection = [
        { label: 'swerve', value: 'swerve' },
        { label: 'mechanum', value: 'mechanum' },
        { label: 'tank', value: 'tank' },
        { label: 'h-drive', value: 'h-drive' },
        { label: 'other', value: 'other' },
    ];

    const [intake, setIntake] = useState({
        algae: { ground: false, source: false },
        coral: { ground: false, source: false }
    });

    const [scoreCapability, setScoreCapability] = useState({
        algae: { netScoring: null, processorScoring: null },
        coral: { L1: null, L2: null, L3: null, L4: null },
        auto: null
    });

    const [climbing, setClimbing] = useState({
        shallow: false,
        deep: false
    });

    const [autoDetails, setAutoDetails] = useState('');
    const [additionalDetails, setAdditionalDetails] = useState('');

    useEffect(() => {
        console.log("Team number", initialTeamNumber);
        if (isEditing) {
            axios.get(`https://cyberlions-web-server-1028328220227.us-central1.run.app/getRobot/${initialTeamNumber}`)
                .then(response => {
                    const profile = response.data.profile;
                    setTeamName(profile.teamName || '');
                    setTeamNumberState(profile.teamNumber ? profile.teamNumber.toString() : '');
                    setPlaystyle(profile.playstyle || {algae: false, coral: false, defense: false})
                    setDrivebase(profile.drivebase || '');
                    setIntake(profile.intake || {
                        algae: { ground: false, source: false },
                        coral: { ground: false, source: false }
                    });
                    setScoreCapability(profile.scoreCapability || {
                        algae: { netScoring: null, processorScoring: null },
                        coral: { L1: null, L2: null, L3: null, L4: null },
                        auto: null
                    });
                    setClimbing(profile.climbing || { shallow: false, deep: false });
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
                playstyle,
                drivebase,
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
                <h1>Intake</h1>
                <p className="createProfile_caption">"How does the robot pick up game pieces?"</p>
                <p>Algae Intake</p>
                <Form>
                    <Form.Check
                        type="checkbox"
                        label="Source"
                        checked={intake.algae.source}
                        onChange={(e) => updateIntake('algae', 'source', e.target.checked)}
                        className="form-check-white"
                    />
                    <Form.Check
                        type="checkbox"
                        label="Ground"
                        checked={intake.algae.ground}
                        onChange={(e) => updateIntake('algae', 'ground', e.target.checked)}
                        className="form-check-white"
                    />
                </Form>
                <p>Coral Intake</p>
                <Form>
                    <Form.Check
                        type="checkbox"
                        label="Source"
                        checked={intake.coral.source}
                        onChange={(e) => updateIntake('coral', 'source', e.target.checked)}
                        className="form-check-white"
                    />
                    <Form.Check
                        type="checkbox"
                        label="Ground"
                        checked={intake.coral.ground}
                        onChange={(e) => updateIntake('coral', 'ground', e.target.checked)}
                        className="form-check-white"
                    />
                </Form>
            </div>

            <div className="section">
                <h1>Capability & Consistency</h1>
                <p className="createProfile_caption">"What can the robot do during a match, and how consistently when doing so?"</p>
                <p>Algae</p>
                <RecordConsistency
                    description="Scores algae into net"
                    value={scoreCapability.algae.netScoring}
                    onChange={(val) => updateScoreCapability('algae', 'netScoring', val)}
                />
                <RecordConsistency
                    description="Scores algae into processor"
                    value={scoreCapability.algae.processorScoring}
                    onChange={(val) => updateScoreCapability('algae', 'processorScoring', val)}
                />
                <p>Coral</p>
                <RecordConsistency
                    description="Scores L1"
                    value={scoreCapability.coral.L1}
                    onChange={(val) => updateScoreCapability('coral', 'L1', val)}
                />
                <RecordConsistency
                    description="Scores L2"
                    value={scoreCapability.coral.L2}
                    onChange={(val) => updateScoreCapability('coral', 'L2', val)}
                />
                <RecordConsistency
                    description="Scores L3"
                    value={scoreCapability.coral.L3}
                    onChange={(val) => updateScoreCapability('coral', 'L3', val)}
                />
                <RecordConsistency
                    description="Scores L4"
                    value={scoreCapability.coral.L4}
                    onChange={(val) => updateScoreCapability('coral', 'L4', val)}
                />
            </div>

            <div className="section">
                <h2>Climbing</h2>
                <p className="createProfile_caption">"Can the robot climb?"</p>
            </div>
        </Container>
    );
}