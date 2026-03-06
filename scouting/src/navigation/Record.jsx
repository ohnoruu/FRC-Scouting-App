import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CreateProfile from './record-nav/CreateProfile';
import RecordMatch from './record-nav/RecordMatch';
import SelectProfile from './record-nav/SelectProfile';

export default function Record() {
  return (
    <Routes>
      <Route path="/" element={<SelectProfile />} />
      <Route path="create-profile" element={<CreateProfile />} />
      <Route path="edit-profile/:teamNumber" element={<CreateProfile />} /> 
      <Route path="record-match/:teamNumber" element={<RecordMatch />} />
    </Routes>
  );
}