import React, { useState } from 'react';
import './ReefscapeChecklist.css';


export default function ReefscapeChecklist({headerText}){
    const [isOtherChecked, setIsOtherChecked] = useState(false);
    const [otherText, setOtherText] = useState("");


    const handleOtherChange = (event) => {
        setIsOtherChecked(event.target.checked);
        if(!event.target.checked){
            setOtherText(''); //clear text input when unchecked
        }
    }


    return(
        <div className="checklist_container">
            <span className="checklist_header">{headerText}</span>
            <div className="checklist_attribute">
                <input type="checkbox"/>
                <span className="checklist_text">Ground Intake</span>
            </div>
            <div className="checklist_attribute">
                <input type="checkbox"/>
                <span className="checklist_text">Claw</span>
            </div>
            <div className="checklist_attribute">
                <input type="checkbox"/>
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
                            onChange={(e)=> setOtherText(e.target.value)}
                            placeholder="Specify other..."
                        />
                    )}
            </div>
        </div>
    );
}
