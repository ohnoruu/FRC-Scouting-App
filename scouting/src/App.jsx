import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Launch from './components/Launch.jsx';
import Welcome from './components/Welcome.jsx';
import Navigator from './components/Navigator.jsx';

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