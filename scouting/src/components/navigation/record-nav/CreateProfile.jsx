import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'
import axios from 'axios';
import './CreateProfile.css';

export default function CreateProfile() {
    const navigate = useNavigate();

    const [teamName, setTeamName] = useState('');
    const [teamNumber, setTeamNumber] = useState('');
    const [drivebase, setDrivebase] = useState('');
    const [drivebaseDropdown, setDrivebaseDropdown] = useState('');
    const [autonomous, setAutonomous] = useState(false);
    const [intake, setIntake] = useState('');
    const [intakeDropdown, setIntakeDropdown] = useState('');
    const [additionalDetails, setAdditionalDetails] = useState('');

    const drivebaseSelection = [
        { label: 'Mecanum', value: 'Mecanum' },
        { label: 'Tank', value: 'Tank' },
        { label: 'Swerve', value: 'Swerve' },
        { label: 'H-Drive', value: 'H-Drive' },
        { label: 'Other', value: 'Other' },
    ];

    const intakeSelection = [
        { label: 'Over', value: 'Over' },
        { label: 'Under', value: 'Under' },
        { label: 'Other', value: 'Other' },
    ];

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
                    <span className="headerText">General Information</span>
                    <div className="createProfile_row">
                        <div className="inputContainer">
                            <div>
                                <input value={teamName} className="bigInput" placeholder="Team Name" onChange={e => setTeamName(e.target.value)} />
                            </div>
                            <div className="row space-between">
                                <input value={teamNumber} className="smallInput" placeholder="Team Number" type="number" onChange={e => setTeamNumber(e.target.value)} />
                            </div>
                            <div className="marginTop10">
                                <span className="headerText">Drivebase</span>
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
                            </div>
                            <div className="marginTop10">
                                <span className="headerText">Intake</span>
                                <select className="createProfile_dropdown" value={intakeDropdown} onChange={e => {
                                    setIntakeDropdown(e.target.value);
                                    setIntake(e.target.value);
                                }}>
                                    <option value="" disabled>Intake</option>
                                    {intakeSelection.map(option => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                                {intakeDropdown === 'Other' && <input className="bigInput" placeholder="Other Intake" onChange={e => setIntake(e.target.value)} />}
                            </div>
                            <div className="row space-between align-center">
                                <div className="row align-center marginTop20">
                                    <input type="checkbox" checked={autonomous} onChange={e => setAutonomous(e.target.checked)} />
                                    <span className="createProfile_subText">Autonomous</span>
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