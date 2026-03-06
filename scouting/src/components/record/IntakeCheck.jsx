import React from 'react';
import { Form } from 'react-bootstrap';
import './IntakeCheck.css';

export default function IntakeCheck({ description, value, hasSource, onChange }){
    const handleGroundChange = (e) => onChange('ground', e.target.checked);
    const handleSourceChange = (e) => onChange('source', e.target.checked);

    return (
        <>
            <div className="intakeCheck-container">
                <p>{description}</p>
                <Form>
                    <Form.Check
                        type="checkbox"
                        label="Ground"
                        checked={value.ground}
                        onChange={handleGroundChange}
                        className="form-check-white"
                    />
                    {hasSource ? (
                        <Form.Check
                            type="checkbox"
                            label="Outpost"
                            checked={value.source}
                            onChange={handleSourceChange}
                            className="form-check-white"
                        />
                    ) : null}
                </Form>
            </div>
        </>
    );
}