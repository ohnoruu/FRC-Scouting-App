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
    const [teleop_L1_misses, setteleop_L1_misses] = useState(0);

    const [teleop_L2_scores, setteleop_L2_scores] = useState(0);
    const [teleop_L2_misses, setteleop_L2_misses] = useState(0);

    const [teleop_L3_scores, setteleop_L3_scores] = useState(0);
    const [teleop_L3_misses, setteleop_L3_misses] = useState(0);

    const [teleop_L4_scores, setteleop_L4_scores] = useState(0);
    const [teleop_L4_misses, setteleop_L4_misses] = useState(0);

    const [teleop_net, setteleop_net] = useState(0);
    const [teleop_net_misses, setteleop_net_misses] = useState(0);

    const [teleop_processor, setteleop_processor] = useState(0);
    const [teleop_processor_misses, setteleop_processor_misses] = useState(0);

    const [auto_L1_scores, setauto_L1_scores] = useState(0);
    const [auto_L1_misses, setauto_L1_misses] = useState(0);

    const [auto_L2_scores, setauto_L2_scores] = useState(0);
    const [auto_L2_misses, setauto_L2_misses] = useState(0);

    const [auto_L3_scores, setauto_L3_scores] = useState(0);
    const [auto_L3_misses, setauto_L3_misses] = useState(0);

    const [auto_L4_scores, setauto_L4_scores] = useState(0);
    const [auto_L4_misses, setauto_L4_misses] = useState(0);

    const [auto_net, setauto_net] = useState(0);
    const [auto_net_misses, setauto_net_misses] = useState(0);

    const [auto_processor, setauto_processor] = useState(0);
    const [auto_processor_misses, setauto_processor_misses] = useState(0);

    const [comment, setComment] = useState('');

    const submitMatch = async () => {
        const matchData = {
            matchType,
            matchNumber: Number(matchNumber),
            shallow_climbed,
            deep_climbed,
            teleop_L1_scores,
            teleop_L1_misses,
            teleop_L2_scores,
            teleop_L2_misses,
            teleop_L3_scores,
            teleop_L3_misses,
            teleop_L4_scores,
            teleop_L4_misses,
            teleop_net,
            teleop_net_misses,
            teleop_processor, 
            teleop_processor_misses,
            auto_L1_scores,
            auto_L1_misses,
            auto_L2_scores,
            auto_L2_misses,
            auto_L3_scores,
            auto_L3_misses,
            auto_L4_scores,
            auto_L4_misses,
            auto_net,
            auto_net_misses,
            auto_processor,
            auto_processor_misses,
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
                            <span className="recordGame_header">{robot.profile.teamName}</span>
                            <span className="recordGame_header">Team {robot.profile.teamNumber}</span>
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

                    <div className="recordGame_header-section">
                        <span className="recordGame_headerText">Autonomous Period</span>
                        <span className="recordGame_description">First 15 seconds of the game where the robot moves without driver control</span>
                        <span className="recordGame_headerText2">Coral</span>
                    </div>
                    <div id = "recordGame_coralDiv1">      
                        <div className = "recordGame_pointContainer">
                            <span className="recordGame_subtext">L1</span>
                                <span className="recordGame_description">Shots Scored</span>
                                <Counter target={auto_L1_scores} setTarget={setauto_L1_scores} className="recordGame_pointInput"/>
                                <span className="recordGame_description">Shots Missed</span>
                                <Counter target={auto_L1_misses} setTarget={setauto_L1_misses} className="recordGame_pointInput"/>
                        </div>

                        <div className = "recordGame_pointContainer">
                            <span className="recordGame_subtext">L2</span>
                                <span className="recordGame_description">Shots Scored</span>
                                <Counter target={auto_L2_scores} setTarget={setauto_L2_scores} className="recordGame_pointInput"/>
                                <span className="recordGame_description">Shots Missed</span>
                                <Counter target={auto_L2_misses} setTarget={setauto_L2_misses} className="recordGame_pointInput"/>
                        </div>
                    </div>

                    <div id = "recordGame_coralDiv2">
                        <div className = "recordGame_pointContainer">
                            <span className="recordGame_subtext">L3</span>
                                <span className="recordGame_description">Shots Scored</span>
                                <Counter target={auto_L3_scores} setTarget={setauto_L3_scores} className="recordGame_pointInput"/>
                                <span className="recordGame_description">Shots Missed</span>
                                <Counter target={auto_L3_misses} setTarget={setauto_L3_misses} className="recordGame_pointInput"/>
                        </div>

                        <div className = "recordGame_pointContainer">
                            <span className="recordGame_subtext">L4</span>
                                <span className="recordGame_description">Shots Scored</span>
                                <Counter target={auto_L4_scores} setTarget={setauto_L4_scores} className="recordGame_pointInput"/>
                                <span className="recordGame_description">Shots Missed</span>
                                <Counter target={auto_L4_misses} setTarget={setauto_L4_misses} className="recordGame_pointInput"/>
                        </div>
                    </div>
  
                    <span className="recordGame_headerText2">Algae</span>
                    <div id = "recordGame_algae">
                        <div className = "recordGame_pointContainer">
                            <span className="recordGame_subtext">Net</span>
                                <span className="recordGame_description">Shots Scored</span>
                                <Counter target={auto_net} setTarget={setauto_net} className="recordGame_pointInput"/>
                                <span className="recordGame_description">Shots Missed</span>
                                <Counter target={auto_net_misses} setTarget={setauto_net_misses} className="recordGame_pointInput"/>
                        </div>

                        <div className = "recordGame_pointContainer">
                            <span className="recordGame_subtext">Processor</span>
                                <span className="recordGame_description">Shots Scored</span>
                                <Counter target={auto_processor} setTarget={setauto_processor} className="recordGame_pointInput"/>
                                <span className="recordGame_description">Shots Missed</span>
                                <Counter target={auto_processor_misses} setTarget={setauto_processor_misses} className="recordGame_pointInput"/>
                        </div>
                    </div>
                    
                    <div className="recordGame_header-section">
                        <span className="recordGame_headerText">Teleop Period</span>
                        <span className="recordGame_description">Remaining period of the game where drivers control the robot</span>
                        <span className="recordGame_headerText2">Coral</span>
                    </div>
                    <div id = "recordGame_coralDiv1">      
                        <div className = "recordGame_pointContainer">
                            <span className="recordGame_subtext">L1</span>
                                <span className="recordGame_description">Shots Scored</span>
                                <Counter target={teleop_L1_scores} setTarget={setteleop_L1_scores} className="recordGame_pointInput"/>
                                <span className="recordGame_description">Shots Missed</span>
                                <Counter target={teleop_L1_misses} setTarget={setteleop_L1_misses} className="recordGame_pointInput"/>
                        </div>

                        <div className = "recordGame_pointContainer">
                            <span className="recordGame_subtext">L2</span>
                                <span className="recordGame_description">Shots Scored</span>
                                <Counter target={teleop_L2_scores} setTarget={setteleop_L2_scores} className="recordGame_pointInput"/>
                                <span className="recordGame_description">Shots Missed</span>
                                <Counter target={teleop_L2_misses} setTarget={setteleop_L2_misses} className="recordGame_pointInput"/>
                        </div>
                    </div>

                    <div id = "recordGame_coralDiv2">
                        <div className = "recordGame_pointContainer">
                            <span className="recordGame_subtext">L3</span>
                                <span className="recordGame_description">Shots Scored</span>
                                <Counter target={teleop_L3_scores} setTarget={setteleop_L3_scores} className="recordGame_pointInput"/>
                                <span className="recordGame_description">Shots Missed</span>
                                <Counter target={teleop_L3_misses} setTarget={setteleop_L3_misses} className="recordGame_pointInput"/>
                        </div>

                        <div className = "recordGame_pointContainer">
                            <span className="recordGame_subtext">L4</span>
                                <span className="recordGame_description">Shots Scored</span>
                                <Counter target={teleop_L4_scores} setTarget={setteleop_L4_scores} className="recordGame_pointInput"/>
                                <span className="recordGame_description">Shots Missed</span>
                                <Counter target={teleop_L4_misses} setTarget={setteleop_L4_misses} className="recordGame_pointInput"/>
                        </div>
                    </div>
  
                    <span className="recordGame_headerText2">Algae</span>
                    <div id = "recordGame_algae">
                        <div className = "recordGame_pointContainer">
                            <span className="recordGame_subtext">Net</span>
                                <span className="recordGame_description">Shots Scored</span>
                                <Counter target={teleop_net} setTarget={setteleop_net} className="recordGame_pointInput"/>
                                <span className="recordGame_description">Shots Missed</span>
                                <Counter target={teleop_net_misses} setTarget={setteleop_net_misses} className="recordGame_pointInput"/>
                        </div>

                        <div className = "recordGame_pointContainer">
                            <span className="recordGame_subtext">Processor</span>
                                <span className="recordGame_description">Shots Scored</span>
                                <Counter target={teleop_processor} setTarget={setteleop_processor} className="recordGame_pointInput"/>
                                <span className="recordGame_description">Shots Missed</span>
                                <Counter target={teleop_processor_misses} setTarget={setteleop_processor_misses} className="recordGame_pointInput"/>
                        </div>
                    </div>

                    <div className="recordGame_checkbox-section">
                        <CheckRecord className="recordGame_checkbox" checkboxTitle="Climbed shallow cage" stateValue={shallow_climbed} changeState = {()=>set_shallow_climbed(prev=>!prev)}></CheckRecord>
                        <CheckRecord className="recordGame_checkbox" checkboxTitle="Climbed deep cage" stateValue={deep_climbed} changeState = {()=>set_deep_climbed(prev=>!prev)}></CheckRecord>
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
