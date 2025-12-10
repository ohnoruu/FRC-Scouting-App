import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
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
            <Container className="passwordPrompt_container" fluid="md">
                <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>Settings Panel</h1>
                <div className="passwordPrompt_inputs">
                    <input
                        type="password"
                        value={passValue}
                        onChange={(e) => setPassValue(e.target.value)}
                        className="passwordPrompt_inputField"
                        placeholder="Enter Password"
                    />
                    <Button variant="primary" onClick={submitPassword}>
                        Submit
                    </Button>
                </div>
                { wrongPassword && (
                    <img className= "passwordPrompt_funny fade-in" src={funny} alt="Funny reaction" />
                )}
            </Container>
        </>
    );
}