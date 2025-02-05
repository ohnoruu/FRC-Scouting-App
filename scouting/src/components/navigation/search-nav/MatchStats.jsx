import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import './MatchStats.css';

export default function MatchStats() {
    const navigate = useNavigate();
    const location = useLocation();
    const { teamNumber, matchData } = location.state || {};

    const [robotProfileData, setRobotProfileData] = useState();

    useEffect(() => {
        if (teamNumber) {
            axios.get(`https://cyberlions-web-server-1028328220227.us-central1.run.app/getRobot/${teamNumber}`)
                .then((response) => {
                    setRobotProfileData(response.data);
                })
                .catch((error) => {
                    console.error("Error making GET Request (MatchStats, getRobot teamNumber): ", error);
                });
        }
    }, [teamNumber]);

    return (
        <>
            <div className="matchStats_topPiece" />
            <div className="matchStats_container">
                    <FaArrowLeft className="matchStats_buttonPiece" onClick = {() => navigate(-1)}/>
                {matchData && robotProfileData &&
                    <>
                        <div className="matchStats_teamMain">
                            <div className="matchStats_teamNameNum">
                                <span className="matchStats_header">{robotProfileData.profile.teamName}</span>
                                <span className="matchStats_subHeader">{robotProfileData.profile.teamNumber}</span>
                            </div>
                            <img className="matchStats_image" src={require('../../../assets/interface-icons/filler-image.png')} alt="Robot" />
                        </div>

                        <div className="matchStats_teamDesc">

                            <span className="matchStats_headerText">Match Info</span>
                            <p className="matchStats_teamDescText">Match Number: {matchData.matchNumber}</p>
                            <p className="matchStats_teamDescText">Match Type: {matchData.matchType}</p>

                            <span className="matchStats_headerText">Autonomous Scoring</span>
                            <span className="matchStats_headerText">Coral</span>
                            <p className="matchStats_teamDescText">L1: {}</p>
                            <p className="matchStats_teamDescText">L2: {}</p>
                            <p className="matchStats_teamDescText">L3: {}</p>
                            <p className="matchStats_teamDescText">L4: {}</p>

                            <span className="matchStats_headerText">Algae</span>
                            <p className="matchStats_teamDescText">Net: {}</p>
                            <p className="matchStats_teamDescText">Processor: {}</p>

                            <span className="matchStats_headerText">Teleop Scoring</span>
                            <span className="matchStats_headerText">Coral</span>
                            <p className="matchStats_teamDescText">L1: {}</p>
                            <p className="matchStats_teamDescText">L2: {}</p>
                            <p className="matchStats_teamDescText">L3: {}</p>
                            <p className="matchStats_teamDescText">L4: {}</p>

                            <span className="matchStats_headerText">Algae</span>
                            <p className="matchStats_teamDescText">Net: {}</p>
                            <p className="matchStats_teamDescText">Processor: {}</p>

                            <p className="matchStats_teamDescText">Climbed: {}</p>
                            <p className="matchStats_teamDescText">Comments: {matchData.comment}</p>
                        </div>
                    </>
                }
            </div>
        </>
    );
}