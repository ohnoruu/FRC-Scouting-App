import React, { useState } from 'react';
import './ReefscapeChecklist.css';


const ReefscapeChecklist = ({headerText, intakeState, updateIntake})=>{
    const [isOtherChecked, setIsOtherChecked] = useState(intakeState.other !== '');
    const [otherText, setOtherText] = useState(intakeState.other || '');

    const handleCheckboxChange = (key) => {
        updateIntake(key, !intakeState[key]);
    };

    const handleOtherChange = () => {
        setIsOtherChecked(!isOtherChecked);
        if (!isOtherChecked){
            updateIntake('other', otherText || ''); //Whenever 'other' is checked, the text input should be empty.
        } else {
            updateIntake('other', !isOtherChecked ? otherText : ''); //Clear other when unchecked
        }
    };

    return(
        <div className="checklist_container">
            <span className="checklist_header">{headerText}</span>
            <div className="checklist_attribute">
                <input 
                    type="checkbox"
                    checked={intakeState.ground}
                    onChange={()=> handleCheckboxChange('ground')}
                />
                <span className="checklist_text">Ground Intake</span>
            </div>
            <div className="checklist_attribute">
                <input 
                    type="checkbox"
                    checked={intakeState.claw}
                    onChange={()=> handleCheckboxChange('claw')}
                />
                <span className="checklist_text">Claw</span>
            </div>
            <div className="checklist_attribute">
                <input 
                    type="checkbox"
                    checked={intakeState.wheel}
                    onChange={()=> handleCheckboxChange('wheel')}
                />
                <span className="checklist_text">Wheel</span>
            </div>
           
            <div className="checklist_column">
                <div className="checklist_attribute">
                    <input
                        type="checkbox"
                        checked={isOtherChecked}
                        onChange={handleOtherChange}
                    />
                    <span className="checklist_text">Other</span>
                </div>
                    {isOtherChecked && (
                        <input
                            type="text"
                            className="checklist_otherInput"
                            value={otherText}
                            onChange={(e)=> {
                                const value = e.target.value
                                setOtherText(value);
                                updateIntake('other', e.target.value);
                            }}
                            placeholder="Specify other..."
                        />
                    )}
            </div>
        </div>
    );
};

export default ReefscapeChecklist;
