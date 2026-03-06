import React from 'react';
import { Routes, Route } from 'react-router-dom';

import PasswordPrompt from './settings-nav/PasswordPrompt';
import SettingsPanel from './settings-nav/SettingsPanel';
import DeleteRobot from './settings-nav/DeleteRobot';

export default function Settings() {
  return (
    <Routes>
      <Route path="/" element={<PasswordPrompt />} />
      <Route path="/settings-panel" element={<SettingsPanel />} />
      <Route path="/delete-robot" element={<DeleteRobot />} />
    </Routes>
  );
}