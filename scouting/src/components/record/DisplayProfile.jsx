import React from 'react';
import './DisplayProfile.css';

export default function DisplayProfile({ profileData }) {
    return (
        <div className="teamSelection">
            <span>{profileData.profile.teamName}</span>
            <span>{profileData.profile.teamNumber}</span>
        </div>
    );
}