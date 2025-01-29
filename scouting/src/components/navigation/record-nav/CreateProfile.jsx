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
    const [drivebase, setDrivebaseDropdown] = useState('');
    const [algaeIntake, setAlgaeIntake] = useState({
        ground: false,
        claw: false,
        wheel: false,
        other: ''
    });
    const [coralIntake, setCoralIntake] = useState({
        ground: false,
        claw: false,
        wheel: false,
        other: ''
    });
    const [algaeCapability, setAlgaeCapability] = useState({
        //0 = none, 1 = inconsistent, 2 = consistent
        netScoring: null,
        processorScoring: null
    });
    const [coralCapability, setCoralCapability] = useState({
        //0 = none, 1 = inconsistent, 2 = consistent
        scoreL1: null,
        scoreL2: null,
        scoreL3: null,
        scoreL4: null
    });
    const [climbing, setClimbing] = useState({
        shallow: false,
        deep: false
    });
    const [autonomous, setAutonomous] = useState({
        //0 = none, 1 = inconsistent, 2 = consistent
        autoCapability: null,
        autoDetails: ''
    });
    const [additionalDetails, setAdditionalDetails] = useState('');
    
    /*
    const [autonomous, setAutonomous] = useState(false);
    const [intake, setIntake] = useState('');
    const [intakeDropdown, setIntakeDropdown] = useState('');
    */

    const drivebaseSelection = [
        { label: 'Mecanum', value: 'Mecanum' },
        { label: 'Tank', value: 'Tank' },
        { label: 'Swerve', value: 'Swerve' },
        { label: 'H-Drive', value: 'H-Drive' },
        { label: 'Other', value: 'Other' },
    ];

    /*
    const intakeSelection = [
        { label: 'Over', value: 'Over' },
        { label: 'Under', value: 'Under' },
        { label: 'Other', value: 'Other' },
    ];
    */

    //data manipulation functions
    const updateAlgaeIntake = (key, value) => {
        setAlgaeIntake(prevState => ({
            ...prevState,
            [key]: value
        }));
    }

    const submitProfile = async () => {
        const profileData = {
            profile: {
                teamName,
                teamNumber: Number(teamNumber),
                drivebase,
                autonomous,
                intake,
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
                                <input value={teamName} className="bigInput" placeholder="Team Name" onChange={e => setTeamName(e.target.value)} />
                            </div>
                            <div className="row space-between">
                                <input value={teamNumber} className="smallInput" placeholder="Team Number" type="number" onChange={e => setTeamNumber(e.target.value)} />
                            </div>
                            <div className="marginTop10">


                                <span className="createProfile_headerText">Drivebase</span>
                                <select className="createProfile_dropdown" value={drivebaseDropdown} onChange={e => {
                                    setDrivebaseDropdown(e.target.value);
                                    setDrivebase(e.target.value);
                                }}>
                                    <option value="" disabled>Drivebase</option>
                                    {drivebaseSelection.map(option => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                                {drivebaseDropdown === 'Other' && <input className="bigInput" placeholder="Other Drivebase" onChange={e => setDrivebase(e.target.value)} />}
                                <div className="createProfile_intakeSection">
                                    <span className="createProfile_headerText">Intake</span>
                                    <ReefscapeChecklist headerText="Algae"/>
                                    <ReefscapeChecklist headerText="Coral"/>
                                </div>
                                <div className="createProfile_capabilitiesSection">


                                    <div className="createProfile_algaeCapabilities">
                                        <span className="createProfile_headerText">Algae</span>
                                        <RecordConsistency description="Scores into net"/>
                                        <RecordConsistency description="Scores into processor"/>
                                    </div>


                                    <div className="createProfile_coralCapabilities">
                                        <span className="createProfile_headerText">Coral</span>
                                        <RecordConsistency description="Scores L1"/>
                                        <RecordConsistency description="Scores L2"/>
                                        <RecordConsistency description="Scores L3"/>
                                        <RecordConsistency description="Scores L4"/>
                                    </div>


                                    <div className="createProfile_climbingCapabilities">
                                        <span className="createProfile_headerText">Climbing</span>
                                        <div className="createProfile_checklist">
                                            <input type="checkbox"/>
                                            <span className="createProfile_text">Can climb shallow cage</span>
                                        </div>
                                        <div className="createProfile_checklist">
                                            <input type="checkbox"/>
                                            <span className="createProfile_text">Can climb deep cage</span>
                                        </div>
                                    </div>


                                    <div className="createProfile_autoCapabilities">
                                        <span className="createProfile_headerText">Autonomous</span>
                                        <RecordConsistency description=""/>
                                        <span className="createProfile_text">Auto Details</span>
                                        <input 
                                            type="text"
                                            className="createProfile_detailInput"
                                            placeholder="Record auto cycles, etc.."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="marginTop20">
                        <span className="createProfile_headerText">Additional Details</span>
                        <textarea value={additionalDetails} className="createProfile_detailInput" onChange={e => setAdditionalDetails(e.target.value)} />
                    </div>
                    <button className="createProfile_submitButton" onClick={submitProfile}>
                        <span className="createProfile_submitButtonText">Submit</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
