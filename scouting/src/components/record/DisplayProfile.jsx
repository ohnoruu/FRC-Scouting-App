import React, { useState, useEffect } from 'react';
import './DisplayProfile.css';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
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
        <Card 
            className="displayProfile_card"
            onClick={() => navigate(`/navigator/record/record-game/${profileData.profile.teamNumber}`, { state: { robot: profileData, isEditing: false } })}
        >
            <div className="displayProfile_teamSelection">
                <Card.Title className="displayProfile_header">{profileData.profile.teamName}</Card.Title>
                <Card.Subtitle className="displayProfile_subheader">{profileData.profile.teamNumber}</Card.Subtitle>
            </div>

            <div className="displayProfile_editSelection">
                <Button
                    variant="outline-primary"
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent navigation when clicking edit
                        navigate(`/navigator/record/edit-profile/${profileData.profile.teamNumber}`, { state: { robot: profileData, isEditing: true } });
                    }}
                >
                    <FaEdit className="displayProfile_editIcon" /> 
                    Edit Profile
                </Button>
            </div>
        </Card>
    );
}
