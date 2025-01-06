//Navigation Bar
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import IonIcon from '@reacticons/ionicons';
import './Navigator.css';

export default function Navigator() {
  return (
      <div className="tabNavigator">
        <nav className="tabBar">
          <NavLink 
          to="/navigator/home" 
          className={({ isActive }) => isActive ? 'activeTab' : 'tabLink'}
          >
            <IonIcon name="home-outline" className="icon"/>
          </NavLink>
          <NavLink 
          to="/navigator/search" 
          className = {({ isActive }) => isActive ? 'activeTab' : 'tabLink'}
          >
            <IonIcon name="search-outline" className="icon"/>
          </NavLink>
          <NavLink 
          to="/navigator/record" 
          className= {({ isActive }) => isActive ? 'activeTab' : 'tabLink'}
          >
            <IonIcon name="add-circle-outline" className="icon"/>
          </NavLink>
          <NavLink 
          to="/navigator/settings" 
          className= {({ isActive }) => isActive ? 'activeTab' : 'tabLink'}
          >
            <IonIcon name="settings-outline" className="icon"/>
          </NavLink>
        </nav>
        <div className="tabContent">
          <Outlet/>
        </div>
      </div>
  );
}