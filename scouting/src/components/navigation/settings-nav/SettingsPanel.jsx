import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './SettingsPanel.css';

export default function SettingsPanel() {
    const navigate = useNavigate();

    return (
        <>
            <div className="settingsPanel_container">
                <div className="settingsPanel_topPiece" />
                
                <div className="settingsPanel_middlePiece">
                    <div className="settingsPanel_titleContainer">
                            <FaArrowLeft onClick={() => navigate(-1)} className="iconButton"/>
                        <span className="settingsPanel_title">Settings Panel</span>
                    </div>

                    <button className="settingsPanel_button" onClick={() => navigate('/navigator/settings/delete-robot')}>
                        <span className="settingsPanel_buttonText">Delete Robot Profile</span>
                    </button>
                </div>
            </div>
        </>
    );
}