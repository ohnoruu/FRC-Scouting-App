import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Launch from './Launch';
import Welcome from './Welcome';
import Navigator from './Navigator';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Launch />} />
                <Route path="/welcome" element={<Welcome />} />
                <Route path="/navigator/*" element={<Navigator />} /> {/*Home, Record, Search, and Settings are now rendered inside Navigator.jsx*/}
            </Routes>
        </Router>
        
    );
}