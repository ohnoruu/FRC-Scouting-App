import React from 'react';
import './RecordConsistency.css'

// 0 = none, 1 = inconsistent, 2 = consistent
export default function RecordConsistency({ description, value, onChange }) {
    return (
        <div className="recordConsistency_container">
            <span className="recordConsistency_description">{description}</span>
            <div className="recordConsistency_columns">
                <div className="recordConsistency_attribute">
                    <span className="recordConsistency_text">None</span>
                    <input 
                        type="checkbox"
                        checked={value === 0}
                        onChange={() => onChange(0)}
                    />
                </div>

                <div className="recordConsistency_attribute">
                    <span className="recordConsistency_text">Inconsistent</span>
                    <input 
                        type="checkbox"
                        checked={value === 1}
                        onChange={() => onChange(1)}
                    />
                </div>

                <div className="recordConsistency_attribute">
                    <span className="recordConsistency_text">Consistent</span>
                    <input 
                        type="checkbox"
                        checked={value === 2}
                        onChange={() => onChange(2)}
                    />
                </div>
            </div>
        </div>
    );
}
