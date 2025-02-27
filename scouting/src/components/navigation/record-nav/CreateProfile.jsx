import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import ReefscapeChecklist from '../../record/ReefscapeChecklist';
import RecordConsistency from '../../record/RecordConsistency';
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
                    if (response.data.matches && response.data.matches.length > 0) {
                        setMatches(response.data.matches); // Set matches from API response
                    } else {
                        setMatches([]); // No matches, set empty array
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
                drivebase,
                intakeData,
                scoreCapability,
                climbing,
                autoDetails,
                additionalDetails,
            },
            matchData: matches, // Pass the matches array here
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
                                <span className="createProfile_headerText">Drivebase</span>
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
                                    <span className="createProfile_headerText">Intake</span>
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
                                        <span className="createProfile_headerText">Algae</span>
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
                                        <span className="createProfile_headerText">Coral</span>
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
                                        <span className="createProfile_headerText">Climbing</span>
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
                                        <span className="createProfile_headerText">Autonomous</span>
                                        <RecordConsistency
                                            description="Auto Capability"
                                            value={scoreCapability.autoCapability}
                                            onChange={(value) => setScoreCapability(prev => ({ ...prev, autoCapability: value }))}
                                        />
                                        <span className="createProfile_header2">Auto Details</span>
                                        <input
                                            type="text"
                                            className="createProfile_detailInput"
                                            placeholder="Record auto cycles, etc.."
                                            onChange={e => setAutoDetails(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="marginTop20">
                        <span className="createProfile_headerText">Additional Details</span>
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