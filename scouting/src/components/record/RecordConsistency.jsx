import React from 'react';
import './RecordConsistency.css'


export default function RecordConsistency({description, value, onChange}){
    return (
        <div className="recordConsistency_container">
            <span className="recordConsistency_description">{description}</span>
            <div className="recordConsistency_columns">
                {["None", "Inconsistent", "Consistent"].map((label, index) => (
                    <div key={label} className="recordConsistency_attribute">
                    <span className="recordConsistency_text">{label}</span>
                    <input 
                        type="checkbox"
                        name={description} //ensure only one is selected per category
                        checked={value===index}
                        onChange={() => onChange(index)} //update state in CreateProfile
                    />
                </div>
                ))}
            </div>
        </div>
    );
}
