import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PasswordPrompt.css';

export default function PasswordPrompt() {
    const navigate = useNavigate();
    const [passValue, setPassValue] = useState('');

    const submitPassword = () => {
        // will hide password in the backend later
        if (passValue === 'cyberlions8521') {
            navigate('/navigator/settings/settings-panel');
        }
    };

    return (
        <>
            <div className="passwordPrompt_topPiece" />

            <div className="passwordPrompt_container">
                <span className="passwordPrompt_title">Settings Panel</span>

                <span className="passwordPrompt_header">Admin Access Only</span>

                <div className="passwordPrompt_inputs">
                    <input
                        className="inputText inputBox"
                        placeholder="Password"
                        onChange={(e) => setPassValue(e.target.value)}
                        value={passValue}
                        type="password"
                    />

                    <button className="passwordPrompt_submitButton" onClick={submitPassword}>
                        <span className="passwordPrompt_submitText">Submit</span>
                    </button>
                </div>
            </div>
        </>
    );
}