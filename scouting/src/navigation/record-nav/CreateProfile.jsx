import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation, ScrollRestoration } from 'react-router-dom';
import { Container, Form, Button, Col, Row, FloatingLabel } from 'react-bootstrap';
import axios from 'axios';

import BackButton from '../../components/BackButton';
import IntakeCheck from '../../components/record/IntakeCheck';
import RecordConsistency from '../../components/record/RecordConsistency';
import MultiImageUpload from '../../components/record/MultiImageUpload';
import './CreateProfile.css';

export default function CreateProfile() {
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { teamNumber: initialTeamNumber } = useParams(); //get profile ID from URL if editing
    const isEditing = location.state?.isEditing; //Determining if editing mode
    const [loading, setLoading] = useState(isEditing); // Set loading to true if editing
    const [matches, setMatches] = useState([]); 

    //General Information
    const [teamName, setTeamName] = useState('');
    const [teamNumberState, setTeamNumberState] = useState(initialTeamNumber || ''); // Initialize teamNumberState with teamNumber if it exists
    const [dimensions, setDimensions] = useState({
        height: null,
        extendedHeight: null,
        weight: null,
    })
    const [drivebase, setDrivebase] = useState('');
    const [intake, setIntake] = useState({
        fuel: { ground: null, source: null }
    });

    
    //Design 
    const [lanePreference, setLanePreference] = useState({
        bump: false,
        trench: false
    });
    
    const [hopperCapacity, setHopperCapacity] = useState(null);

    const [feedingStyle, setFeedingStyle] = useState({
        dump: false,
        launch: false
    });

    //Capabilities (recorded by consistency)
    const [scoring, setScoring] = useState({
        hub: null,
    });

    const [cycleTime, setCycleTime] = useState(null);

    const [maxSpeed, setMaxSpeed] = useState(null);

    const [climbing, setClimbing] = useState({
        lowRung: null,
        midRung: null,
        highRung: null
    });

    //Autonomous
    const [auto, setAuto] = useState(null); //recorded as consistency on scale of 0,1,2
    const [autoDetails, setAutoDetails] = useState('');

    //Additional Details
    const [additionalDetails, setAdditionalDetails] = useState('');

    //Images
    const [robotImages, setRobotImages] = useState([]);

    useEffect(() => {
        console.log("Team number", initialTeamNumber);
        if (isEditing) {
            axios.get(`${process.env.REACT_APP_BASE_URL}/getRobot/${initialTeamNumber}`)
                .then(response => {
                    const profile = response.data.profile;
                    setTeamName(profile.teamName || '');
                    setTeamNumberState(profile.teamNumber ? profile.teamNumber.toString() : '');
                    setDimensions(profile.dimensions || { height: null, extendedHeight: null, weight: null });
                    setDrivebase(profile.drivebase || '');
                    setIntake(profile.intake || { fuel: { ground: null, source: null } });
                    setLanePreference(profile.lanePreference || { bump: false, trench: false });
                    setHopperCapacity(profile.hopperCapacity || null);
                    setFeedingStyle(profile.feedingStyle || { dump: false, launch: false });
                    setScoring(profile.scoring || {
                        hub: null
                    });
                    setCycleTime(profile.cycleTime || null);
                    setMaxSpeed(profile.maxSpeed || null);
                    setClimbing(profile.climbing || { lowRung: null, midRung: null, highRung: null });
                    setAuto(profile.auto || null);
                    setAutoDetails(profile.autoDetails || '');
                    setAdditionalDetails(profile.additionalDetails || '');
                    setRobotImages(profile.robotImages || []);
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
    const updateIntake = (type, key, value) => {
        setIntake(prevState => ({
            ...prevState,
            [type]: { ...prevState[type], [key]: value }
        }));
    };

    const submitProfile = async () => {
        if (submitting) return; // prevent multiple submissions
        setSubmitting(true);

        const formData = new FormData();

        // Append profile JSON as string
        formData.append(
            "profile",
            JSON.stringify({
                teamName,
                teamNumber: Number(teamNumberState),
                dimensions,
                drivebase,
                intake,
                lanePreference,
                hopperCapacity,
                feedingStyle,
                scoring,
                cycleTime,
                maxSpeed,
                climbing,
                auto,
                autoDetails,
                additionalDetails,
            })
        );

        // Append images separately
        robotImages.forEach((img) => {
            if (img instanceof File) {
                formData.append("robotImages", img);
            }
        });

        try {
            if (isEditing) {
                await axios.put(
                    `${process.env.REACT_APP_BASE_URL}/updateProfile/${initialTeamNumber}`,
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );
            } else {
                await axios.post(
                    `${process.env.REACT_APP_BASE_URL}/addProfile`,
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );
            }
        } catch (error) {
            console.error("Error submitting profile:", error);
        } finally {
            setSubmitting(false);
            navigate(-1); // Go back to the previous page after submission
        }
    };

    if (loading) {
        return <div className="loadingMessage">Loading profile</div>;
    }

    return (
        <Container className="createProfile_container" fluid="md">
            <BackButton/>
            <h1 style={{ textAlign: 'center' }}>{ isEditing ? "Edit Profile" : "Create Profile" }</h1>

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
                <p className="caption">"What are the dimensions and weight of the robot?"</p>
                <Form>
                    <FloatingLabel
                        controlId="heightInput"
                        label="Height (inches)"
                        className="mb-3"
                    >
                        <Form.Control 
                            type="number" 
                            value={dimensions.height}
                            placeholder="Enter height"
                            onChange={(e) => setDimensions(prev => ({ ...prev, height: e.target.value }))}
                        />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="extendedHeightInput"
                        label="Height when extended (inches)"
                        className="mb-3"
                    >
                        <Form.Control 
                            type="number" 
                            value={dimensions.extendedHeight}
                            placeholder="Enter extended height"
                            onChange={(e) => setDimensions(prev => ({ ...prev, extendedHeight: e.target.value }))}
                        />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="weightInput"
                        label="Weight (pounds)"
                        className="mb-3"
                    >
                        <Form.Control 
                            type="number" 
                            value={dimensions.weight}
                            placeholder="Enter weight"
                            onChange={(e) => setDimensions(prev => ({ ...prev, weight: e.target.value }))}
                        />
                    </FloatingLabel>
                </Form>
            </div>

            <div className="section">
                <h2>Drivebase</h2>
                <p className="caption">"What type of drivebase does the robot use? What type of modules are on the drivebase?"</p>
                <Form.Select 
                    aria-label="Drivebase Selection" 
                    value={drivebase} 
                    onChange={(e) => setDrivebase(e.target.value)}
                >
                    <option>Select Drivebase</option>
                    <option value="swerve">Swerve</option>
                    <option value="mechanum">Mechanum</option>
                    <option value="tank">Tank</option>
                    <option value="h-drive">H-Drive</option>
                    <option value="other">Other</option>
                </Form.Select>
            </div>

            <div className="section">
                <h2>Intake</h2>
                <p className="caption">"How does the robot pick up game pieces?"</p>
                <IntakeCheck
                    description="Fuel"
                    value={intake.fuel}
                    hasSource={true}
                    onChange={(key, val) => updateIntake('fuel', key, val)}
                />
            </div>

            <div className="section">
                <h2>Shooter</h2>
                <p className="caption">"How does the robot pass game pieces?"</p>
                <Form>
                    <Form.Check
                        type="checkbox"
                        label="Dump"
                        checked={feedingStyle.dump}
                        onChange={(e) => setFeedingStyle(prev => ({ ...prev, dump: e.target.checked }))}
                        className="form-check-white"
                    />
                    <Form.Check
                        type="checkbox"
                        label="Launch"
                        checked={feedingStyle.launch}
                        onChange={(e) => setFeedingStyle(prev => ({ ...prev, launch: e.target.checked }))}
                        className="form-check-white"
                    />
                </Form>
            </div>

            <div className="section">
                <h2>Constraints</h2>
                <p className="caption">"How many fuel pieces can the robot store?"</p>
                <Form>
                    <FloatingLabel
                        controlId="hopperCapacityInput"
                        label="Hopper Capacity (# fuel)"
                        className="mb-3"
                    >
                        <Form.Control 
                            type="number" 
                            value={hopperCapacity}
                            placeholder="Enter hopper capacity"
                            onChange={(e) => setHopperCapacity(e.target.value)}
                        />
                    </FloatingLabel>
                </Form>

                <p className="caption">"Can the robot traverse through the bump, trench, or both?"</p>
                <Form>
                    <Form.Check
                        type="checkbox"
                        label="Bump"
                        checked={lanePreference.bump}
                        onChange={(e) => setLanePreference(prev => ({ ...prev, bump: e.target.checked }))}
                        className="form-check-white"
                    />
                    <Form.Check
                        type="checkbox"
                        label="Trench"
                        checked={lanePreference.trench}
                        onChange={(e) => setLanePreference(prev => ({ ...prev, trench: e.target.checked }))}
                        className="form-check-white"
                    />
                </Form>
            </div>

            <div className="section">
                <h2>Scoring</h2>
                <p className="caption">"How does the robot score during a match, and how consistently when doing so?"</p>
                <RecordConsistency
                    description="Hub Scoring"
                    value={scoring.hub}
                    onChange={(val) => setScoring(prev => ({ ...prev, hub: val }))}
                />
            </div>

            <div className="section">
                <h2>Speed</h2>
                <p className="caption">"What is the robot's maximum speed and cycle time?"</p>
                <Form>
                    <FloatingLabel
                        controlId="maxSpeedInput"
                        label="Max Speed (feet/second)"
                        className="mb-3"
                    >
                        <Form.Control 
                            type="number" 
                            value={maxSpeed}
                            placeholder="Enter max speed"
                            onChange={(e) => setMaxSpeed(e.target.value)}
                        />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="cycleTimeInput"
                        label="Cycle Time (seconds)"
                        className="mb-3"
                    >
                        <Form.Control 
                            type="number" 
                            value={cycleTime}
                            placeholder="Enter cycle time"
                            onChange={(e) => setCycleTime(e.target.value)}
                        />
                    </FloatingLabel>
                </Form>
            </div>

            <div className="section">
                <h2>Climbing</h2>
                <p className="caption">"Where can the robot climb, and how consistently when doing so?"</p>
                <RecordConsistency
                    description="Low Rung"
                    value={climbing.lowRung}
                    onChange={(val) => setClimbing(prev => ({ ...prev, lowRung: val }))}
                />
                <RecordConsistency
                    description="Mid Rung"
                    value={climbing.midRung}
                    onChange={(val) => setClimbing(prev => ({ ...prev, midRung: val }))}
                />
                <RecordConsistency
                    description="High Rung"
                    value={climbing.highRung}
                    onChange={(val) => setClimbing(prev => ({ ...prev, highRung: val }))}
                />
            </div>

            <div className="section">
                <h2>Autonomous</h2>
                <p className="caption">"What does the robot do during auto? Is the auto consistent/reliable?"</p>
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
                    value={auto}
                    onChange={(val) => setAuto(val)}
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

            <div className="section">
                <h2>Robot Photos</h2>
                <p className="caption">Politely ask the team to take photos of their robot :)</p>
                <MultiImageUpload
                    images={robotImages}
                    onChange={setRobotImages}
                    isEditing={isEditing}
                />
            </div>

            <Button
                variant="primary"
                onClick={submitProfile}
                className="submitProfile_button"
                disabled={submitting}
            >
                { submitting ? "Submitting..." : isEditing ? "Save Changes" : "Create Profile" }
            </Button>
        </Container>
    );
}