import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './Welcome.css';

import Logo from './assets/images/cyberlions-logo.png';
import FIRSTlogo from './assets/images/FIRST.png';

export default function Launch() {
    const navigate = useNavigate();
    
    let navigateToMain = () => {
        navigate('/navigator/home');
    };

    return (
        <div className="welcome_container">
            <div className="welcome_topPiece" />

            <div className="welcome_mainContent">
                <h1>Welcome to Scouting 8521!</h1>
                <div className="welcome_image">
                    <img className="welcome_logo" alt="CyberLions logo" src={Logo} />
                </div>
                <p>This is the scouting application for FRC Team 8521 CyberLions. Here, you can record data of other FRC robots by creating robot profiles for each team. For match scouting, click on an existing robot profile to start recording data.</p>

                <Button variant="primary" className="welcome_button" onClick={navigateToMain}>
                    Continue to App
                </Button>
            </div>
        </div>
    );
}