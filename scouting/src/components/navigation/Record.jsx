import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CreateProfile from './record-nav/CreateProfile';
import RecordGame from './record-nav/RecordGame';
import SelectProfile from './record-nav/SelectProfile';

export default function Record() {
  return (
    <Routes>
      <Route path="/" element={<SelectProfile />} />
      <Route path="create-profile" element={<CreateProfile />} />
      <Route path="edit-profile/:profileId" element={<CreateProfile />} /> 
      <Route path="record-game/:teamNumber" element={<RecordGame />} />
    </Routes>
  );
}