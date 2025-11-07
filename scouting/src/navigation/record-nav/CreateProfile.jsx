import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
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
        { label: 'Mecanum', value: 'Mecanum' },
        { label: 'Tank', value: 'Tank' },
        { label: 'Swerve', value: 'Swerve' },
        { label: 'H-Drive', value: 'H-Drive' },
        { label: 'Other', value: 'Other' },
    ];

    const [intakeData, setIntakeData] = useState({
        algae: { ground: false, claw: false, wheel: false, other: '' },
        coral: { ground: false, claw: false, wheel: false, other: '' }
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
                    setIntakeData(profile.intakeData || {
                        algae: { ground: false, claw: false, wheel: false, other: '' },
                        coral: { ground: false, claw: false, wheel: false, other: '' }
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
        setIntakeData(prevState => ({
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
                intakeData,
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
        <div className="createProfile_container">
            <div className="topPiece" />
            <div className="createProfile_middlePiece">
                <div className="createProfile_header">
                    <FaArrowLeft className="chevron-left" onClick={() => navigate(-1)} />
                    <span className="createProfile_headerText">
                        {isEditing ? 'Edit Robot Profile' : 'Create Robot Profile'}
                    </span>
                </div>
                <div className="createProfile_scrollView">
                    <span className="createProfile_headerText">General Information</span>
                    <div className="createProfile_row">
                        <div className="inputContainer">
                            <div>
                                <input
                                    value={teamName}
                                    className="bigInput"
                                    placeholder="Team Name"
                                    onChange={e => setTeamName(e.target.value)}
                                />
                            </div>
                            <div className="row space-between">
                                <input
                                    value={teamNumberState}
                                    className="smallInput"
                                    placeholder="Team Number"
                                    type="number"
                                    onChange={e => setTeamNumberState(e.target.value)}
                                />
                            </div>
                            
                            <div className="marginTop10">
                                <div className="marginTop10">
                                    <span className="createProfile_headerText">Playstyles: </span>
                                    <span className="createProfile_description">What roles can the robot play during a match? Some robots may be flexible and can play multiple roles.</span>
                                    <div className="createProfile_checklist">
                                        <input
                                            type="checkbox"
                                            checked={playstyle.algae}
                                            onChange={() => updatePlaystyle('algae')}
                                        />
                                        <span className="createProfile_text">Algae Scorer</span>
                                    </div>
                                    <div className="createProfile_checklist">
                                        <input
                                            type="checkbox"
                                            checked={playstyle.coral}
                                            onChange={() => updatePlaystyle('coral')}
                                        />
                                        <span className="createProfile_text">Coral Scorer</span>
                                    </div>
                                    <div className="createProfile_checklist">
                                        <input
                                            type="checkbox"
                                            checked={playstyle.defense}
                                            onChange={() => updatePlaystyle('defense')}
                                        />
                                        <span className="createProfile_text">Defender</span>
                                    </div>
                                </div>

                                <span className="createProfile_headerText">Drivebase: </span>
                                <span className="createProfile_description">Select the type of drivebase the robot uses (e.g., Swerve Drive, Tank Drive).</span>
                                <select
                                    className="createProfile_dropdown"
                                    value={drivebase}
                                    onChange={(e) => setDrivebase(e.target.value)}
                                >
                                    <option value="" disabled>Drivebase</option>
                                    {drivebaseSelection.map(option => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                                {drivebase === 'Other' && <input className="bigInput" placeholder="Other Drivebase" onChange={e => setDrivebase(e.target.value)} />}
                                
                                <div className="createProfile_intakeSection">
                                    <span className="createProfile_headerText">Intake: </span>
                                    <span className="createProfile_description">How does the robot pick up coral and algae, if they can at all? If there are specific details, describe them in 'Other'.</span>
                                    <ReefscapeChecklist
                                        headerText="Algae"
                                        intakeState={intakeData.algae}
                                        updateIntake={(key, value) => updateIntake('algae', key, value)}
                                    />
                                    <ReefscapeChecklist
                                        headerText="Coral"
                                        intakeState={intakeData.coral}
                                        updateIntake={(key, value) => updateIntake('coral', key, value)}
                                    />
                                </div>
                                <div className="createProfile_capabilitiesSection">
                                    <div className="createProfile_algaeCapabilities">
                                        <span className="createProfile_headerText">Algae Capabilities: </span>
                                        <span className="createProfile_description">Where is the robot able to score algae, and how consistently while doing so?</span>
                                        <RecordConsistency
                                            description="Scores into net"
                                            value={scoreCapability.algae.netScoring}
                                            onChange={value => updateScoreCapability('algae', 'netScoring', value)}
                                        />
                                        <RecordConsistency
                                            description="Scores into processor"
                                            value={scoreCapability.algae.processorScoring}
                                            onChange={value => updateScoreCapability('algae', 'processorScoring', value)}
                                        />
                                    </div>
                                    <div className="createProfile_coralCapabilities">
                                        <span className="createProfile_headerText">Coral Capabilities: </span>
                                        <span className="createProfile_description">At which levels can the robot score coral, and how consistently while doing so?</span>
                                        {["L1", "L2", "L3", "L4"].map(level => (
                                            <RecordConsistency
                                                key={level}
                                                description={`Scores ${level.toUpperCase()}`}
                                                value={scoreCapability.coral[level]}
                                                onChange={(value) => updateScoreCapability('coral', level, value)}
                                            />
                                        ))}
                                    </div>
                                    <div className="createProfile_climbingCapabilities">
                                        <span className="createProfile_headerText">Climbing: </span>
                                        <span className="createProfile_description">Can the robot climb/hang on the cage at the end of the game, and on what level?</span>
                                        <div className="createProfile_checklist">
                                            <input
                                                type="checkbox"
                                                checked={climbing.shallow}
                                                onChange={() => updateClimbing('shallow')}
                                            />
                                            <span className="createProfile_text">Can climb shallow cage</span>
                                        </div>
                                        <div className="createProfile_checklist">
                                            <input
                                                type="checkbox"
                                                checked={climbing.deep}
                                                onChange={() => updateClimbing('deep')}
                                            />
                                            <span className="createProfile_text">Can climb deep cage</span>
                                        </div>
                                    </div>
                                    <div className="createProfile_autoCapabilities">
                                        <span className="createProfile_headerText">Autonomous: </span>
                                        <span className="createProfile_description">Does the robot have a consistent autonomous cycle? What does it do during autonomous (describe in 'Autonomous Details')?</span>
                                        <RecordConsistency
                                            description="Auto Capability"
                                            value={scoreCapability.autoCapability}
                                            onChange={(value) => setScoreCapability(prev => ({ ...prev, autoCapability: value }))}
                                        />
                                        <span className="createProfile_header2">Autonomous Details</span>
                                        <input
                                            type="text"
                                            className="createProfile_detailInput"
                                            placeholder="Record auto cycles (taxi, 2pc, etc..)"
                                            onChange={e => setAutoDetails(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="marginTop20">
                        <span className="createProfile_headerText">Additional Details</span>
                        <span className="createProfile_description">Are there any other details that might benefit drive team that wasn't included in prior sections (e.g., issues with the robot, new drivers)?</span>
                        <textarea
                            value={additionalDetails}
                            className="createProfile_detailInput"
                            onChange={e => setAdditionalDetails(e.target.value)} />
                    </div>
                    <button className="createProfile_submitButton" onClick={submitProfile}>
                        <span className="createProfile_submitButtonText">Submit</span>
                    </button>
                </div>
            </div>
        </div>
    );
}