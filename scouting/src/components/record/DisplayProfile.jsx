import React, { useState } from 'react';
import './DisplayProfile.css';
import { useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';

export default function DisplayProfile({ profileData }) {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleEditClick = (e) => {
        e.stopPropagation(); // Prevent navigation when clicking edit
        setIsLoading(true);  // Show loading text
        navigate(`/navigator/record/edit-profile/${profileData.profile.teamNumber}`, { 
            state: { robot: profileData, isEditing: true } 
        });
    };

    return (
        <div className="displayProfile_container" onClick={() => navigate(`/navigator/record/record-game/${profileData.profile.teamNumber}`, { state: { robot: profileData, isEditing: false} })}>
            <div className="displayProfile_teamSelection">
                <span className="displayProfile_teamName">{profileData.profile.teamName}</span>
                <span>{profileData.profile.teamNumber}</span>
            </div>
            <div className="displayProfile_editSelection" onClick={handleEditClick}>
                {isLoading ? (
                    <span>Loading editing feature...</span> // Show loading text when clicked
                ) : (
                    <>
                        <FaEdit className="displayProfile_edit-icon"/>
                        <span>Edit Profile</span>
                    </>
                )}
            </div>
        </div>
    );
}
