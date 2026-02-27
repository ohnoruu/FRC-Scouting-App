import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './BackButton.css';

export default function BackButton() {
    const navigate = useNavigate();
    return <FaArrowLeft onClick={() => navigate(-1)} className="backButton"/>
}