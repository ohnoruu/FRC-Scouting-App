import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'
import axios from 'axios';
import ReefscapeChecklist from '../../record/ReefscapeChecklist';
import RecordConsistency from '../../record/RecordConsistency';
import './CreateProfile.css';


export default function CreateProfile() {
    const navigate = useNavigate();

    //variables
    const [teamName, setTeamName] = useState('');
    const [teamNumber, setTeamNumber] = useState('');
    const [drivebase, setDrivebase] = useState('');
    const drivebaseSelection = [
        { label: 'Mecanum', value: 'Mecanum' },
        { label: 'Tank', value: 'Tank' },
        { label: 'Swerve', value: 'Swerve' },
        { label: 'H-Drive', value: 'H-Drive' },
        { label: 'Other', value: 'Other' },
    ];

    const [intakeData, setIntakeData] = useState({
        algae: {ground: false, claw: false, wheel: false, other: ''},
        coral: {ground: false, claw: false, wheel: false, other: ''}
    });

    const [scoreCapability, setScoreCapability] = useState({
        algae: {netScoring: null, processorScoring: null},
        coral: {L1: null, L2: null, L3: null, L4: null},
        auto: null
    });

    const [climbing, setClimbing] = useState({
        shallow: false,
        deep: false
    });

    const [autoDetails, setAutoDetails] = useState('')
    const [additionalDetails, setAdditionalDetails] = useState('');

    //data manipulation functions
    const updateIntake = (type, key, value) => {
        setIntakeData(prevState => ({
            ...prevState,
            [type]: {...prevState[type], [key]: value} 
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
    }

    const submitProfile = async () => {
        const profileData = {
            profile: {
                teamName,
                teamNumber: Number(teamNumber),
                drivebase,
                intakeData, 
                scoreCapability, //includes algae, coral, and autonomous consistency
                climbing,
                autoDetails,
                additionalDetails,
            },
            matches: [],
        };

        try {
            await axios.post('https://cyberlions-web-server-1028328220227.us-central1.run.app/addProfile', profileData);
        } catch (error) {
            console.error('Error making a POST request:', error);
        }


        navigate(-1);
    };

    return (
        <div className="createProfile_container">
            <div className="topPiece" />
            <div className="createProfile_middlePiece">
                <div className="createProfile_header">
                    <FaArrowLeft className="chevron-left" onClick={() => navigate(-1)} />
                    <span className="createProfile_headerText">Create Robot Profile</span>
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
                                    value={teamNumber} 
                                    className="smallInput" 
                                    placeholder="Team Number" 
                                    type="number" 
                                    onChange={e => setTeamNumber(e.target.value)} 
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
                                            onChange={(value) => setScoreCapability(prev => ({...prev, autoCapability: value}))}
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
