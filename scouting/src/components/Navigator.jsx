import React from 'react';
import { NavLink, useLocation, Routes, Route } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import IonIcon from '@reacticons/ionicons';
import Home from './navigation/Home.jsx';
import Search from './navigation/Search.jsx';
import Record from './navigation/Record.jsx';
import Settings from './navigation/Settings.jsx';
import './Navigator.css';

export default function Navigator() {
    const location = useLocation(); // Get the current route location

    return (
        <div className="tabNavigator">
            {/* Static Navbar */}
            <nav className="tabBar">
                <NavLink
                    to="/navigator/home"
                    className={({ isActive }) => (isActive ? 'activeTab' : 'tabLink')}
                >
                    <IonIcon name="home-outline" className="icon" />
                </NavLink>
                <NavLink
                    to="/navigator/search"
                    className={({ isActive }) => (isActive ? 'activeTab' : 'tabLink')}
                >
                    <IonIcon name="search-outline" className="icon" />
                </NavLink>
                <NavLink
                    to="/navigator/record"
                    className={({ isActive }) => (isActive ? 'activeTab' : 'tabLink')}
                >
                    <IonIcon name="add-circle-outline" className="icon" />
                </NavLink>
                <NavLink
                    to="/navigator/settings"
                    className={({ isActive }) => (isActive ? 'activeTab' : 'tabLink')}
                >
                    <IonIcon name="settings-outline" className="icon" />
                </NavLink>
            </nav>

            <div className="tabContent">
                <SwitchTransition>
                    <CSSTransition
                        key={location.pathname} 
                        classNames="fade"
                        timeout={300} 
                    >
                        <Routes location={location}>
                            <Route path="home/*" element={<Home />} />
                            <Route path="search/*" element={<Search />} />
                            <Route path="record/*" element={<Record />} />
                            <Route path="settings/*" element={<Settings />} />
                        </Routes>
                    </CSSTransition>
                </SwitchTransition>
            </div>
        </div>
    );
}