import React from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import './SearchRobotsSkeleton.css';
import StatGlimpse from '../StatGlimpse.jsx';

export default function SearchRobotsSkeleton() {
    return (
        <div className="container">
            <div className="topPiece" />
            <div className="middlePiece">
                <div className="searchbar">
                    <img src = '' />
                </div>
                <div className="viewScoutingData">
                    <StatGlimpse isLoading={true} />
                </div>
            </div>
            <div className="bottomPiece" />
        </div>
    );
}