import React from 'react';
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa';
import './Counter.css';

export default function Counter({ target, setTarget, style }) {
    return (
        <div className="counter-container">
            <FaMinusCircle size={40} onClick={() => setTarget(prev => prev - 1)} />
            <input
                type="text"
                value={target.toString()}
                style={style}
                className="counter-input"
                onChange={(e) => {
                    const parsedValue = parseInt(e.target.value);
                    if (!isNaN(parsedValue)) {
                        setTarget(parsedValue);
                    } else if (parsedValue === 0) {
                        setTarget(0);
                    }
                }}
            />
            <FaPlusCircle size={40} onClick={() => setTarget(prev => prev + 1)} />
        </div>
    );
}