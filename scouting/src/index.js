import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // Assuming you have a global CSS file

// Export default navigation functions in index.js to save lines in navigation.jsx
export { default as Home } from './navigation/Home.jsx';
export { default as Search } from './navigation/Search.jsx';
export { default as Record } from './navigation/Record.jsx';
export { default as Settings } from './navigation/Settings.jsx';

// Export default icon types to use. Refer to https://oblador.github.io/react-native-vector-icons/
/*
export { SearchIcon } from '@ant-design/icons';
export { FontAwesome } from '@react-icons/fa';
export { MaterialCommunityIcons } from '@react-icons/md';
export { IonIcon } from '@reacticons/ionicons';
*/

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);