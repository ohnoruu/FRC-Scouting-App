import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import IonIcon from '@reacticons/ionicons';
import './MatchStats.css';

export default function MatchStats() {
    const navigate = useNavigate();
    const { teamNumber, matchNumber } = useParams();

    const [robotProfileData, setRobotProfileData] = useState();
    const [robotMatchData, setRobotMatchData] = useState();

    useEffect(() => {
        axios.get(`http://localhost:3000/getRobot/${teamNumber}`)
            .then((response) => {
                setRobotProfileData(response.data);
            })
            .catch((error) => {
                console.error("Error making POST Request (MatchStats, getRobot teamNumber): ", error);
            });
        axios.get(`http://localhost:3000/getMatch/${teamNumber}/${matchNumber}`)
            .then((response) => {
                setRobotMatchData(response.data);
            })
            .catch((error) => {
                console.error("Error making POST Request (MatchStats, getRobot teamNumber matchNumber: ", error);
            });
    }, [teamNumber, matchNumber]);

    return (
        <>
            <div className="topPiece" />
            <div className="container">
                <div className="buttonPiece">
                    <img src=""/>
                </div>

                {robotMatchData &&
                    <>
                        <div className="teamMain">
                            <div className="teamNameNum">
                                <span className="header">{robotProfileData.profile.teamName}</span>
                                <span className="subHeader">{robotProfileData.profile.teamNumber}</span>
                            </div>
                            <img className="image" src={require('../../../assets/interface-icons/filler-image.png')} alt="Robot" />
                        </div>

                        <div className="teamDesc">
                            <p className="teamDescText">Match Number: {robotMatchData.matchNumber}</p>
                            <p className="teamDescText">Match Type: {robotMatchData.matchType}</p>
                            <p className="teamDescText">Teleop Amp Count: {robotMatchData.teleOpAmp}</p>
                            <p className="teamDescText">Teleop Speaker Count: {robotMatchData.teleOpSpeaker}</p>
                            <p className="teamDescText">Autonomous Amp Count: {robotMatchData.autoAmp}</p>
                            <p className="teamDescText">Autonomous Speaker Count: {robotMatchData.autoSpeaker}</p>
                            <p className="teamDescText">Climbed: {robotMatchData.climbed.toString()}</p>
                            <p className="teamDescText">Coopertition: {robotMatchData.coopertition.toString()}</p>
                            <p className="teamDescText">High Note: {robotMatchData.highNote.toString()}</p>
                        </div>
                    </>
                }
            </div>
        </>
    );
}