import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './PasswordPrompt.css';
import funny from '../../assets/images/myhonestreaction.jpg';

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
        </>
    );
}