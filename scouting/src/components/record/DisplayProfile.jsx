import React, { useState, useEffect } from 'react';
import './DisplayProfile.css';
import { useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import axios from 'axios';

export default function DisplayProfile({ profileData }) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://cyberlions-web-server-1028328220227.us-central1.run.app/getRobot/${profileData.profile.teamNumber}`)
            .then(() => setIsLoading(false))
            .catch(() => setIsLoading(false));
    }, [profileData.profile.teamNumber]);

    if (isLoading) {
        return (
            <div className="displayProfile_loading">
                <span>Loading profile...</span>
            </div>
        );
    }

    return (
        <div 
            className="displayProfile_container" 
            onClick={() => navigate(`/navigator/record/record-game/${profileData.profile.teamNumber}`, { state: { robot: profileData, isEditing: false } })}
        >
            <div className="displayProfile_teamSelection">
                <span className="displayProfile_teamName">{profileData.profile.teamName}</span>
                <span>{profileData.profile.teamNumber}</span>
            </div>

            <div 
                className="displayProfile_editSelection"
                onClick={(e) => {
                    e.stopPropagation(); // Prevent navigation when clicking edit
                    navigate(`/navigator/record/edit-profile/${profileData.profile.teamNumber}`, { state: { robot: profileData, isEditing: true } });
                }}
            >
                <FaEdit className="displayProfile_edit-icon"/>
                <span>Edit Profile</span>
            </div>
        </div>
    );
}
