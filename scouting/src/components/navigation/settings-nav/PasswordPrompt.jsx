import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PasswordPrompt.css';
import funny from '../../../assets/images/myhonestreaction.jpg';

export default function PasswordPrompt() {
    const navigate = useNavigate();
    const [passValue, setPassValue] = useState('');
    const [wrongPassword, setWrongPassword] = useState(false);

    const submitPassword = () => {
        // will hide password in the backend later
        if (passValue === '8521GreatTap') {
            navigate('/navigator/settings/settings-panel');
        } else {
            setWrongPassword(true);
        }
    };

    return (
        <>
            <div className="passwordPrompt_topPiece" />

            <div className="passwordPrompt_container">
                <span className="passwordPrompt_title">Settings Panel</span>
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
                {wrongPassword && (
                        <img className="passwordPrompt_funny fade-in" src={funny} alt="Wrong Password" />
                    )}
            </div>
        </>
    );
}