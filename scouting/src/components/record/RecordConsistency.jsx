import React from 'react';
import './RecordConsistency.css'


export default function RecordConsistency({description}){
    return (
        <div className="recordConsistency_container">
            <span className="recordConsistency_description">{description}</span>
            <div className="recordConsistency_columns">
                <div className="recordConsistency_attribute">
                    <span className="recordConsistency_text">None</span>
                    <input type="checkbox"/>
                </div>


                <div className="recordConsistency_attribute">
                    <span className="recordConsistency_text">Inconsistent</span>
                    <input type="checkbox"/>
                </div>


                <div className="recordConsistency_attribute">
                    <span className="recordConsistency_text">Consistent</span>
                    <input type="checkbox"/>
                </div>
            </div>
        </div>
    );
}
