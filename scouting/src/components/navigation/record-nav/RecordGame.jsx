import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';
import Counter from '../../record/Counter.jsx';
import CheckRecord from '../../record/CheckRecord.jsx';
import './RecordGame.css';

export default function RecordGame() {
    const navigate = useNavigate();
    const { teamNumber } = useParams();
    const location = useLocation();
    const { robot } = location.state;

    const matchTypeSelection = [
        { label: 'Practice Match', value: 'Practice Match' },
        { label: 'Qualification Match', value: 'Qualification Match' },
        { label: 'Playoff Match', value: 'Playoff Match' },
        { label: 'Semifinals', value: 'Semifinals' },
    ];

    const [matchType, setMatchType] = useState("Practice Match");
    const [matchNumber, setMatchNumber] = useState(null);

    const [coopertition, setCoopertition] = useState(false);
    const [highNote, setHighNote] = useState(false);
    const [climbed, setClimbed] = useState(false);
    const [trap, setTrap] = useState(false);

    const [teleOpSpeaker, setTeleOpSpeaker] = useState(0);
    const [teleOpAmp, setTeleOpAmp] = useState(0);
    const [autoSpeaker, setAutoSpeaker] = useState(0);
    const [autoAmp, setAutoAmp] = useState(0);

    const [comment, setComment] = useState('');

    const submitMatch = async () => {
        const matchData = {
            matchType,
            matchNumber: Number(matchNumber),
            coopertition,
            highNote,
            climbed,
            teleOpSpeaker,
            teleOpAmp,
            autoSpeaker,
            autoAmp,
            comment, 
        };

        try {
            await axios.post(`https://cyberlions-web-server-1028328220227.us-central1.run.app/addMatch/${teamNumber}`, matchData);
        } catch (error) {
            console.error('Error making a POST request:', error);
        }

        navigate(-1);
    };

    return (
        <div className="recordGame_container">
            <div className="recordGame_topPiece" />
            <div className="recordGame_middlePiece">
                <div className="recordGame_header">
                    <FaArrowLeft className = "recordGame_return-icon" onClick = {() => navigate(-1)} />
                </div>
                <div className="recordGame_scrollView">
                    <div className="recordGame_row recordGame_space-between">
                        <div className="recordGame_column">
                            <span className="recordGame_headerText">{robot.profile.teamName}</span>
                            <span className="recordGame_subText">Team {robot.profile.teamNumber}</span>
                        </div>
                    </div>
                    <div className="recordGame_row recordGame_gap-10">
                        <select className="recordGame_dropdown" value={matchType} onChange={e => setMatchType(e.target.value)}>
                            <option value="" disabled>Match Type</option>
                            {matchTypeSelection.map(option => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                        <input value={matchNumber} className="recordGame_matchNumber" placeholder="Match Number" type="number" onChange={e => setMatchNumber(e.target.value)} />
                    </div>
                    <div className="recordGame_checkboxes">
                        <CheckRecord checkboxTitle="Cooperition" stateValue={coopertition} changeState={setCoopertition} />
                        <CheckRecord checkboxTitle="High Note" stateValue={highNote} changeState={setHighNote} />
                        <CheckRecord checkboxTitle="Climbed" stateValue={climbed} changeState={setClimbed} />
                        <CheckRecord checkboxTitle="Trap" stateValue={trap} changeState={setTrap} />
                    </div>
                    <p className="recordGame_marginTop30">Add +1 for each NOTE scored. Ex: robot puts 1 note in AMP</p>
                    <div className="recordGame_marginTop30 recordGame_gap-20">
                        <div>
                            <span className="recordGame_headerText">Teleoperation</span>
                            <div className="recordGame_row recordGame_space-between">
                                <div className="recordGame_pointContainer">
                                    <span>Speaker</span>
                                    <Counter target={teleOpSpeaker} setTarget={setTeleOpSpeaker} className="recordGame_pointInput" />
                                </div>
                                <div className="recordGame_pointContainer">
                                    <span>Amp</span>
                                    <Counter target={teleOpAmp} setTarget={setTeleOpAmp} className="recordGame_pointInput" />
                                </div>
                            </div>
                        </div>
                        <span className="recordGame_headerText">Autonomous</span>
                        <div className="recordGame_row recordGame_space-between">
                            <div className="recordGame_pointContainer">
                                <span>Speaker</span>
                                <Counter target={autoSpeaker} setTarget={setAutoSpeaker} className="recordGame_pointInput" />
                            </div>
                            <div className="recordGame_pointContainer">
                                <span>Amp</span>
                                <Counter target={autoAmp} setTarget={setAutoAmp} className="recordGame_pointInput" />
                            </div>
                        </div>
                    </div>
                    <div className="recordGame_marginTop20">
                        <span className="recordGame_headerText">Additional Comments</span>
                        <textarea value={comment} className="recordGame_detailInput" onChange={e => setComment(e.target.value)} />
                    </div>
                    <button className="recordGame_submitButton" onClick={submitMatch}>
                        <span className="recordGame_submitButtonText">Submit</span>
                    </button>
                </div>
            </div>
        </div>
    );
}