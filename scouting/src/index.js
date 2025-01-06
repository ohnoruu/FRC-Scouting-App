import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // Assuming you have a global CSS file

// Export default navigation functions in index.js to save lines in navigation.jsx
export { default as Home } from './components/navigation/Home';
export { default as Search } from './components/navigation/Search';
export { default as Record } from './components/navigation/Record';
export { default as Settings } from './components/navigation/Settings';

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