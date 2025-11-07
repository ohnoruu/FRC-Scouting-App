import robbie from './assets/images/robbie-transparent.png';
import FIRSTlogo from './assets/images/FIRST.png';
import floor from './assets/images/floor.png';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import './Welcome.css';

export default function Launch({ navigation }) {
    const navigate = useNavigate();
    
    let navigateToMain = () => {
        navigate('/navigator/home');
    };

    return (
        <div className="welcome_container">
            <div className="welcome_topPiece" />

            <div className="welcome_mainContent">

                <div className="welcome_mainContentText">
                    <span className="welcome_heroText">Welcome to Scouting 8521!</span>
                    <span className="welcome_infoText">This is the scouting application for FRC Team 8521 CyberLions. Here, you can record data of other FRC robots by creating robot profiles for each team. For match scouting, click on an existing robot profile to start recording data.</span>

                    <div className="welcome_continueButton" onClick={navigateToMain}>
                        Get Started
                    </div>
                </div>
            </div>

            <div className="welcome_mainContentImage">
                <img className="welcome_floor" alt="background" src={floor} />
                <img className="welcome_robbie" alt="Robbie" src={robbie} />

                <div className="welcome_credits">
                    <span className="welcome_creditsText">Scouting 8521 was made for</span>
                    <img className="welcome_FIRSTlogo" alt="FIRST logo" src={FIRSTlogo} />
                </div>
            </div>
        </div>
    );
}