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
                            <span className="profile_text">Drivebase: {robotProfileData.profile?.drivebase}</span>
                            <span className="profile_text">Autonomous: {robotProfileData.profile?.autonomous?.toString()}</span>
                            <span className="profile_text">Intake: {robotProfileData.profile?.intake}</span>
                            <span className="profile_text">Additional Details: {robotProfileData.profile?.additionalDetails}</span>
                        </div>
                    </>
                ) : (
                    <span>Loading...</span>
                )}

                <div className="profile_matchSection">
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