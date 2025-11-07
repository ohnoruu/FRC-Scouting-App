import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
                                <span className="profile_header">{robotProfileData.profile?.teamNumber}</span>
                            </div>

                            <img className="profile_image" src={fillerImg} alt="Robot" />
                        </div>

                        <div className="profile_robotDetails">
                            <span className="profile_header">General Details</span>
                            <span className="profile_text">Drivebase: {robotProfileData.profile?.drivebase}</span>
                            <span className="profile_text">Playstyles: {[
                                    robotProfileData.profile?.playstyle?.algae && "Algae Scorer",
                                    robotProfileData.profile?.playstyle?.coral && "Coral Scorer", 
                                    robotProfileData.profile?.playstyle?.defense && "Defender"
                                ].filter(Boolean).join(", " ) || "None"}
                            </span>
                            <span className="profile_text">Autonomous Details: {robotProfileData.profile?.autoDetails || 'N/A' /*retest this, post request didnt go through first time*/ }</span>  
                            <span className="profile_text">Climbing Capabilities: 
                                {robotProfileData.profile?.climbing?.shallow && ' Can climb shallow cage'} 
                                {robotProfileData.profile?.climbing?.shallow && robotProfileData.profile?.climbing?.deep ? ' and ' : ''}
                                {robotProfileData.profile?.climbing?.deep && 'Can climb deep cage'}
                                {!robotProfileData.profile?.climbing?.shallow && !robotProfileData.profile?.climbing?.deep && 'None'}
                            </span>
                            <span className="profile_text">Additional Details: {robotProfileData.profile?.additionalDetails || 'N/A'}</span>

                            <div className="profile_intakeSection">
                                <span className="profile_header">Intake Capabilities</span>
                                <span className="profile_text">Algae: {Object.entries(robotProfileData.profile?.intakeData.algae || {}).map(([key, value]) => value ? key : null).filter(Boolean).join(', ')}{robotProfileData.profile?.intakeData.algae?.other ? ` (${robotProfileData.profile.intakeData.algae.other})` : '' || ''}</span>
                                <span className="profile_text">Coral: {Object.entries(robotProfileData.profile?.intakeData.coral || {}).map(([key, value]) => value ? key : null).filter(Boolean).join(', ')}{robotProfileData.profile?.intakeData.coral?.other ? ` (${robotProfileData.profile.intakeData.coral.other})` : '' || ''}</span>
                            </div>

                            <div className="profile_scoringSection">
                                <span className="profile_header">Scoring Capabilities</span>
                                <span className="profile_text">Algae: Net - {computeScore(robotProfileData.profile?.scoreCapability.algae.netScoring)}, Processor - {computeScore(robotProfileData.profile?.scoreCapability.algae.processorScoring)}</span>
                                <span className="profile_text">
                                    Coral: {Object.entries(robotProfileData.profile?.scoreCapability.coral || {})
                                        .filter(([level, value]) => value !== undefined)
                                        .map(([level, value]) => `${level}: ${computeScore(value)}`)
                                        .join(', ') || 'None'}
                                </span>
                                <span className="profile_text">Autonomous: {computeScore(robotProfileData.profile?.scoreCapability.autoCapability)}</span>
                            </div>
                        </div>
                    </>
                ) : (
                    <span>Loading...</span>
                )}

                <div className="profile_matchSection">
                    <span className="profile_header">Match History</span>
                    {robotProfileData?.matches?.map((match) => (
                        <div key={`${robotProfileData.profile?.teamName} match ${match.matchNumber}`}
                            onClick={() => navigate('/navigator/search/match-stats', { state: { teamNumber: robotProfileData.profile?.teamNumber, matchData: match } })}>

                            <div className="profile_matches">
                                <span className="profile_text"> Match Number: {match.matchNumber} </span>
                                <span className="profile_text"> Match Type: {match.matchType} </span>
                                <span className="profile_text"> Raw Score: {match.score}</span>
                            </div>

                        </div>
                    ))}
                </div>
                </div>
            </div>
        </div>
    );
}
