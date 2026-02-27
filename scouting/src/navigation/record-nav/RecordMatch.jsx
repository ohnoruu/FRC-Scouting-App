import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Container, FloatingLabel, Form, Button} from 'react-bootstrap';
import axios from 'axios';

import Counter from '../../components/record/Counter.jsx';
import CheckRecord from '../../components/record/CheckRecord.jsx';
import './RecordMatch.css';

export default function RecordMatch() {
    const navigate = useNavigate();
    const { teamNumber } = useParams();
    const location = useLocation();
    const { robot } = location.state;

    const matchTypeSelection = [
        { label: 'Practice Match', value: 'Practice Match' },
        { label: 'Qualification Match', value: 'Qualification Match' },
        { label: 'Playoff Match', value: 'Playoff Match' },
        { label: 'Finals', value: 'Finals' },
    ];

    //General Info
    const [matchType, setMatchType] = useState("Practice Match");
    const [matchNumber, setMatchNumber] = useState(null);

    //Autonomous
    const [autoFuelScores, setAutoFuelScores] = useState(0);
    const [autoFuelMisses, setAutoFuelMisses] = useState(0);

    const [autoLowRungClimb, setAutoLowRungClimb] = useState(false);

    //Teleop
    const [teleopFuelScores, setTeleopFuelScores] = useState(0);
    const [teleopFuelMisses, setTeleopFuelMisses] = useState(0);

    //Climbing
    const [lowRungClimb, setLowRungClimb] = useState(false);
    const [midRungClimb, setMidRungClimb] = useState(false);
    const [highRungClimb, setHighRungClimb] = useState(false);

    //Description
    const [ playstyle, setPlaystyle ] = useState({
        scoring: false,
        passing: false,
        defense: false
    })
    const [comments, setComments] = useState('');

    //Overall Score & Accuracy
    const [score, setScore] = useState(0);
    const [accuracy, setAccuracy] = useState(0);

    const computeScore = () => {
       const autoScore = autoFuelScores + (autoLowRungClimb ? 15 : 0);
       const teleopScore = teleopFuelScores;
       const climbScore = (lowRungClimb ? 10 : 0) + (midRungClimb ? 20 : 0) + (highRungClimb ? 30 : 0);
       return autoScore + teleopScore + climbScore;
    }

    const computeAccuracy = () => {
        const totalShots = autoFuelScores + autoFuelMisses + teleopFuelScores + teleopFuelMisses;
        const totalScores = autoFuelScores + teleopFuelScores;
        if (totalShots === 0) return 0;
        return (totalScores / totalShots) * 100;
    }

    const submitMatch = async () => {
        setScore(computeScore());
        setAccuracy(computeAccuracy());
        const matchData = {
            matchType,
            matchNumber: Number(matchNumber),
            autoFuelScores,
            autoFuelMisses,
            autoLowRungClimb,
            teleopFuelScores,
            teleopFuelMisses,
            lowRungClimb,
            midRungClimb,
            highRungClimb,
            playstyle,
            comments,
            score,
            accuracy
        };

        try {
            await axios.post(`${process.env.REACT_APP_BASE_URL}/addMatch/${teamNumber}`, matchData);
        } catch (error) {
            console.error('Error making a POST request:', error);
        }

        navigate(-1);
    };

    return (
        <>
            <Container className="recordMatch_container" fluid="md">

            </Container>
        </>
    );
}
