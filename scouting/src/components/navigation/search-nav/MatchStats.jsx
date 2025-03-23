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
                            <span>{robotProfileData.profile.teamName}</span>
                            <span>{robotProfileData.profile.teamNumber}</span>
                        </div>

                        <div className="matchStats_teamDesc">
                            <span className="matchStats_headerText">Match Info</span>
                            <p className="matchStats_teamDescText">Match Number: {matchData.matchNumber}</p>
                            <p className="matchStats_teamDescText">Match Type: {matchData.matchType}</p>
                            <p className="matchStats_teamDescText">Raw Score: {matchData.score}</p>
                            <p className="matchStats_caption">Number of points the singular team scored, without penalty or coopertition bonus</p>

                            <span className="matchStats_headerText">Autonomous Scoring</span>
                            <span className="matchStats_teamDescText">Left Starting Line: {matchData.leave_auto.toString()}</span>
                            <span className="matchStats_headerText2">Coral</span>
                            <p className="matchStats_teamDescText">L1: 
                                {matchData.auto_L1_scores ? ` ${matchData.auto_L1_scores} scored, ` : ""}
                                {matchData.auto_L1_misses ? ` ${matchData.auto_L1_misses} missed` : ""}
                            </p>
                            <p className="matchStats_teamDescText">L2: 
                                {matchData.auto_L2_scores ? ` ${matchData.auto_L2_scores} scored, ` : ""}
                                {matchData.auto_L2_misses ? ` ${matchData.auto_L2_misses} missed` : ""}
                            </p>
                            <p className="matchStats_teamDescText">L3: 
                                {matchData.auto_L3_scores ? ` ${matchData.auto_L3_scores} scored, ` : ""}
                                {matchData.auto_L3_misses ? ` ${matchData.auto_L3_misses} missed` : ""}
                            </p>
                            <p className="matchStats_teamDescText">L4: 
                                {matchData.auto_L4_scores ? ` ${matchData.auto_L4_scores} scored, ` : ""}
                                {matchData.auto_L4_misses ? ` ${matchData.auto_L4_misses} missed` : ""}
                            </p>

                            <span className="matchStats_headerText2">Algae</span>
                            <p className="matchStats_teamDescText">Net: 
                                {matchData.auto_net ? ` ${matchData.auto_net} scored, ` : ""}
                                {matchData.auto_net_misses ? ` ${matchData.auto_net_misses} missed` : ""}
                            </p>
                            <p className="matchStats_teamDescText">Processor: 
                                {matchData.auto_processor ? ` ${matchData.auto_processor} scored, ` : ""}
                                {matchData.auto_processor_misses ? ` ${matchData.auto_processor_misses} missed` : ""}
                            </p>

                            <span className="matchStats_headerText">Teleop Scoring</span>
                            <span className="matchStats_headerText2">Coral</span>
                            <p className="matchStats_teamDescText">L1: 
                                {matchData.teleop_L1_scores ? ` ${matchData.teleop_L1_scores} scored, ` : ""}
                                {matchData.teleop_L1_misses ? ` ${matchData.teleop_L1_misses} missed` : ""}
                            </p>
                            <p className="matchStats_teamDescText">L2: 
                                {matchData.teleop_L2_scores ? ` ${matchData.teleop_L2_scores} scored, ` : ""}
                                {matchData.teleop_L2_misses ? ` ${matchData.teleop_L2_misses} missed` : ""}
                            </p>
                            <p className="matchStats_teamDescText">L3: 
                                {matchData.teleop_L3_scores ? ` ${matchData.teleop_L3_scores} scored, ` : ""}
                                {matchData.teleop_L3_misses ? ` ${matchData.teleop_L3_misses} missed` : ""}
                            </p>
                            <p className="matchStats_teamDescText">L4: 
                                {matchData.teleop_L4_scores ? ` ${matchData.teleop_L4_scores} scored, ` : ""}
                                {matchData.teleop_L4_misses ? ` ${matchData.teleop_L4_misses} missed` : ""}
                            </p>

                            <span className="matchStats_headerText2">Algae</span>
                            <p className="matchStats_teamDescText">Net: 
                                {matchData.teleop_net ? ` ${matchData.teleop_net} scored, ` : ""}
                                {matchData.teleop_net_misses ? ` ${matchData.teleop_net_misses} missed` : ""}
                            </p>
                            <p className="matchStats_teamDescText">Processor: 
                                {matchData.teleop_processor ? ` ${matchData.teleop_processor} scored, ` : ""}
                                {matchData.teleop_processor_misses ? ` ${matchData.teleop_processor_misses} missed` : ""}
                            </p>
                            <p className="matchStats_teamDescText">Parked at barge: {matchData.parked.toString()}</p>
                            <p className="matchStats_teamDescText">Climbed shallow cage: {matchData.shallow_climbed.toString()}</p>
                            <p className="matchStats_teamDescText">Climbed deep cage: {matchData.deep_climbed.toString()}</p>
                            <p className="matchStats_teamDescText">Comments: {matchData.comment}</p>
                        </div>
                    </>
                }
            </div>
        </>
    );
}
