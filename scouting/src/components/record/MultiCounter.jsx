import React from 'react';
import { ButtonGroup, Button, Form } from 'react-bootstrap';
import './MultiCounter.css';

export default function MultiCounter({title, target, setTarget}) {
    const amounts = [2,5,10];
    const min = 0;
    const max = 200;
    
    const clamp = (value) => Math.min(max, Math.max(min, value)); // Helper function to clamp values within the min and max range

    return (
        <div className="multiCounter-container">
            <Form.Range
                min={min}
                max={max}
                value={target}
                onChange={(e) => setTarget(clamp(Number(e.target.value)))}
                className="multiCounter-slider"
            />
            <p>{title}</p>
            <div className="multiCounter-row">
                <ButtonGroup>
                    <Button 
                        variant="primary"
                        onClick={() => setTarget(prev => clamp(prev - amounts[2]))} 
                        className="multiCounter-button"
                        disabled={target - amounts[2] < min}
                    >
                        -{amounts[2]}
                    </Button>
                    <Button variant="primary" onClick={() => setTarget(prev => clamp(prev - amounts[1]))} className="multiCounter-button" disabled={target - amounts[1] < min}>
                        -{amounts[1]}
                    </Button>
                    <Button variant="primary" onClick={() => setTarget(prev => clamp(prev - amounts[0]))} className="multiCounter-button" disabled={target - amounts[0] < min}>
                        -{amounts[0]}
                    </Button>
                </ButtonGroup>
                <Form>
                    <Form.Control
                        type="number"
                        value={target.toString()}
                        onChange={(e) => setTarget(clamp(Number(e.target.value)))}
                        className="multiCounter-input"
                    />
                </Form>
                <ButtonGroup>
                    <Button variant="primary" onClick={() => setTarget(prev => clamp(prev + amounts[0]))} className="multiCounter-button" disabled={target + amounts[0] > max}>
                        +{amounts[0]}
                    </Button>
                    <Button variant="primary" onClick={() => setTarget(prev => clamp(prev + amounts[1]))} className="multiCounter-button" disabled={target + amounts[1] > max}>
                        +{amounts[1]}
                    </Button>
                    <Button variant="primary" onClick={() => setTarget(prev => clamp(prev + amounts[2]))} className="multiCounter-button" disabled={target + amounts[2] > max}>
                        +{amounts[2]}
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    )
}