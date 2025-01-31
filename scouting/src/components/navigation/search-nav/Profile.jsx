import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
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

    return (
        <div className="profile_container">
            <div className="profile_topPiece" />
            <FaArrowLeft onClick={() => navigate(-1)} className="profile_buttonPiece" />
            <div className="profile_middlePieceContainer">
                <div className="profile_middlePiece">

                {robotProfileData ? (
                    <>
                        <div className="profile_teamMain">
                            <div className="profile_teamSubMain">
                                <span className="profile_header">{robotProfileData.profile?.teamName}</span>
                                <span className="profile_subText">{robotProfileData.profile?.teamNumber}</span>
                            </div>

                            <img className="profile_image" src={require('../../../assets/interface-icons/filler-image.png')} alt="Robot" />
                        </div>

                        <div className="profile_robotDetails">
                            <span className="profile_header">General Details</span>
                            <span className="profile_text">Drivebase: {robotProfileData.profile?.drivebase}</span>
                            <span className="profile_text">Autonomous Details: {/*robotProfileData.profile?.autoDetails || 'N/A'*/}</span>
                            <span className="profile-text">Climbing Capabilities: {/*robotProfileData.profile?.climbing.shallow ? 'Shallow: ' : ''*/} {robotProfileData.profile?.climbing.deep ? 'Deep' : ''}</span>
                            <span className="profile_text">Additional Details: {/*robotProfileData.profile?.additionalDetails || 'N/A'*/}</span>
                        </div>

                        <div className="profile_intakeSection">
                            <span className="profile_header">Intake Capabilities</span>
                            <span className="profile_text">Algae: {/*Object.entries(robotProfileData.profile?.intakeData.algae || {}).map(([key, value]) => value ? key: null).filter(Boolean).join(', ') || 'None'*/}</span>
                            <span className="profile_text">Coral: {/*Object.entries(robotProfileData.profile?.intakeData.coral || {}).map(([key, value]) => value ? key: null).filter(Boolean).join(', ') || 'None'*/}</span>
                        </div>

                        <div className="profile_scoringSection">
                            <span className="profile_header">Scoring Capabilities</span>
                            <span className="profile_text">Algae: Net - {/*robotProfileData.profile?.scoreCapability.algae.netScoring || 'N/A'}, Processor - {robotProfileData.profile?.scoreCapability.algae.processorScoring || 'N/A'*/}</span>
                            <span classname="profile_text">Coral: {/*Object.entries(robotProfileData.profile?.scoreCapability.coral || {}).map(([level, value]) => value ? `${level}: ${value}` : null).filter(Boolean).join(', ') || 'None'*/}</span>
                            <span className="profile_text">Autonomous: {/*robotProfileData.profile?.scoreCapability.auto || 'N/A'*/}</span>
                        </div>
                    </>
                ) : (
                    <span>Loading...</span>
                )}

                <div className="profile_matchSection">
                    <span className="profile_header">Mathc History</span>
                    {robotProfileData?.matches?.map((match) => (
                        <div key={`${robotProfileData.profile?.teamName} match ${match.matchNumber}`}
                            onClick={() => navigate('/navigator/search/match-stats', { state: { teamNumber: robotProfileData.profile?.teamNumber, matchData: match } })}>

                            <div className="profile_matches">
                                <span className="profile_text"> Match Number: {match.matchNumber} </span>
                                <span className="profile_text"> Match Type: {match.matchType} </span>
                            </div>

                        </div>
                    ))}
                </div>

                </div>
            </div>
        </div>
    );
}