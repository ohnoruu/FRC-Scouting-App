import React, { Suspense, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import IonIcon from '@reacticons/ionicons';
import SelectProfileSkeleton from '../../components/record/SelectProfileSkeleton';
import DisplayProfile from '../../components/record/DisplayProfile';
import axios from 'axios';
import './SelectProfile.css';

export default function SelectProfile() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]); 

  const handleNavigate = () => {
    navigate('/navigator/record/create-profile');
  };

  const [profileData, setProfileData] = useState();

  useEffect(() => {
    axios.get('https://cyberlions-web-server-1028328220227.us-central1.run.app/robotList')
      .then((response) => {
        setProfileData(response.data);
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.error("Error making POST Request:", error);
      });
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = profileData?.filter(robot =>
      robot.profile.teamName.toLowerCase().includes(query) ||
      robot.profile.teamNumber.toString().includes(query)
    );
    setFilteredData(filtered);
  }
 
  return (
    <>
    </>
  );
}