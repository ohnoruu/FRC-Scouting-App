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

    const [shallow_climbed, set_shallow_climbed] = useState(false);
    const [deep_climbed, set_deep_climbed] = useState(false);

    const [teleop_L1_scores, setteleop_L1_scores] = useState(0);
    const [teleop_L2_scores, setteleop_L2_scores] = useState(0);
    const [teleop_L3_scores, setteleop_L3_scores] = useState(0);
    const [teleop_L4_scores, setteleop_L4_scores] = useState(0);

    const [teleop_net, setteleop_net] = useState(0);
    const [teleop_processor, setteleop_processor] = useState(0);

    const [auto_L1_scores, setauto_L1_scores] = useState(0);
    const [auto_L2_scores, setauto_L2_scores] = useState(0);
    const [auto_L3_scores, setauto_L3_scores] = useState(0);
    const [auto_L4_scores, setauto_L4_scores] = useState(0);

    const [auto_net, setauto_net] = useState(0);
    const [auto_processor, setauto_processor] = useState(0);

    const [comment, setComment] = useState('');

    const submitMatch = async () => {
        const matchData = {
            matchType,
            matchNumber: Number(matchNumber),
            shallow_climbed,
            deep_climbed,
            teleop_L1_scores,
            teleop_L2_scores,
            teleop_L3_scores,
            teleop_L4_scores,
            teleop_net,
            teleop_processor, 
            auto_L1_scores,
            auto_L2_scores,
            auto_L3_scores,
            auto_L4_scores,
            auto_net,
            auto_processor,
            comment
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
                    


                    

                    <h1>Teleop</h1>
                    <h2>Coral</h2>

                    <div id = "recordGame_coralDiv1">      
                        <div className = "recordGame_pointContainer">
                            <h3>L1</h3>
                                <Counter target={teleop_L1_scores} setTarget={setteleop_L1_scores} className="recordGame_pointInput"/>
                        </div>

                        <div className = "recordGame_pointContainer">
                            <h3>L2</h3>
                                <Counter target={teleop_L2_scores} setTarget={setteleop_L2_scores} className="recordGame_pointInput"/>
                        </div>
                    </div>

                    <div id = "recordGame_coralDiv2">
                        <div className = "recordGame_pointContainer">
                            <h3>L3</h3>
                                <Counter target={teleop_L3_scores} setTarget={setteleop_L3_scores} className="recordGame_pointInput"/>
                        </div>

                        <div className = "recordGame_pointContainer">
                            <h3>L4</h3>
                                <Counter target={teleop_L4_scores} setTarget={setteleop_L4_scores} className="recordGame_pointInput"/>
                        </div>
                    </div>
  
                    <h2>Algae</h2>

                    <div id = "recordGame_algae">
                        <div className = "recordGame_pointContainer">
                            <h3>Net</h3>
                                <Counter target={teleop_net} setTarget={setteleop_net} className="recordGame_pointInput"/>
                        </div>

                        <div className = "recordGame_pointContainer">
                            <h3>Processor</h3>
                                <Counter target={teleop_processor} setTarget={setteleop_processor} className="recordGame_pointInput"/>
                        </div>
                    </div>

                    <h1>Automatic</h1>
                    <h2>Coral</h2>

                    <div id = "recordGame_coralDiv1">      
                        <div className = "recordGame_pointContainer">
                            <h3>L1</h3>
                                <Counter target={auto_L1_scores} setTarget={setauto_L1_scores} className="recordGame_pointInput"/>
                        </div>

                        <div className = "recordGame_pointContainer">
                            <h3>L2</h3>
                                <Counter target={auto_L2_scores} setTarget={setauto_L2_scores} className="recordGame_pointInput"/>
                        </div>
                    </div>

                    <div id = "recordGame_coralDiv2">
                        <div className = "recordGame_pointContainer">
                            <h3>L3</h3>
                                <Counter target={auto_L3_scores} setTarget={setauto_L3_scores} className="recordGame_pointInput"/>
                        </div>

                        <div className = "recordGame_pointContainer">
                            <h3>L4</h3>
                                <Counter target={auto_L4_scores} setTarget={setauto_L4_scores} className="recordGame_pointInput"/>
                        </div>
                    </div>
  
                    <h2>Algae</h2>

                    <div id = "recordGame_algae">
                        <div className = "recordGame_pointContainer">
                            <h3>Net</h3>
                                <Counter target={auto_net} setTarget={setauto_net} className="recordGame_pointInput"/>
                        </div>

                        <div className = "recordGame_pointContainer">
                            <h3>Processor</h3>
                                <Counter target={auto_processor} setTarget={setauto_processor} className="recordGame_pointInput"/>
                        </div>
                    </div>

                    <CheckRecord checkboxTitle="Shallow Climbed" stateValue={shallow_climbed} changeState = {()=>set_shallow_climbed(prev=>!prev)}></CheckRecord>
                    <CheckRecord checkboxTitle="Deep Climbed" stateValue={deep_climbed} changeState = {()=>set_deep_climbed(prev=>!prev)}></CheckRecord>



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
