import React, { Suspense, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteRobotSkeleton from '../../settings/DeleteRobotSkeleton';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import './DeleteRobot.css';

export default function DeleteRobot() {
  const navigate = useNavigate();
  const tImg = require('../../../assets/interface-icons/filler-image.png'); // template image
  const [robotList, setRobotList] = useState([]);

  useEffect(() => {
    axios.get('https://cyberlions-web-server-1028328220227.us-central1.run.app/robotList') // imports data using axios
      .then((response) => { // sets robotList to the data
        setRobotList(response.data);
      })
      .catch((error) => {
        console.error("Error making POST Request: (DeleteRobot, robotList)", error);
      });
  }, [setRobotList]); // Updates on page load and when setRobotList changes

  const removeRobot = async (teamNumber) => {
    // remove robot from robotList and update list on screen
    await axios.get(`https://cyberlions-web-server-1028328220227.us-central1.run.app/removeRobot/${teamNumber}`);
    let newList = await axios.get('https://cyberlions-web-server-1028328220227.us-central1.run.app/robotList');
    setRobotList((prev) => newList.data);
  };

  const displayData = robotList.map((robot) =>
    <div key={robot.robotID} className="deleteRobot_teamSelection" onClick={() => removeRobot(robot.profile.teamNumber)}>
      <div className="deleteRobot_teamName">
        <span>{robot.profile.teamNumber} - {robot.profile.teamName}</span>
      </div>
      <img src={tImg} className="deleteRobot_teamImage" alt="Robot" />
    </div>
  );

  return (
    <>
      <div className="deleteRobot_container">
        <div className="deleteRobot_topPiece" />
        <div className="deleteRobot_middlePiece">
          <div className="deleteRobot_titleContainer">
              <FaArrowLeft onClick={() => navigate(-1)} className = "deleteRobot_return-icon"/>
            <span className="deleteRobot_title">Select Robot to Delete</span>
          </div>
          <span className="deleteRobot_subText">This action CANNOT BE UNDONE. DO NOT CLICK PROFILES YOU DO NOT WANT TO DELETE.</span>
          <div className="deleteRobot_robotListContainer">
            <Suspense fallback={<DeleteRobotSkeleton />}>
              {displayData}
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}