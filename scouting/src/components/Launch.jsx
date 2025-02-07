import robbie from '../assets/images/robbie-transparent.png';
import logo from '../assets/images/logo.png';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Launch.css';

export default function Launch() {
    const navigate = useNavigate();

    let [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);

        if (isLoading === false) {
            setTimeout(() => {
                navigate('/Welcome');
            }, 2000);
        }
    }, [isLoading, navigate]);

    return (
        <div className="launch_container">
            <div className="launch_hero">
                <img className="launch_launchImage" alt="Robbie" src={robbie} />
                <span className="launch_header">ROBO SCOUTS</span>
            </div>

            <div className="launch_credits">
                <span className="launch_smallText">By Team 8521</span>

                <div className="launch_creditsImageBackground">
                    <img className="launch_creditsImage" alt="team logo 8521" src={logo} />
                </div>
            </div>
        </div>
    );
}