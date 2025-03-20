import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatGlimpse from '../home/StatGlimpse';
import informationIcon from '../../assets/interface-icons/info.png';
import axios from 'axios';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();
  const [robotList, alterRobotList] = useState();
  const [closeInfo, setCloseInfo] = useState(false);

  const handleProfileNavigation = (teamNumber) => {
    navigate(`/navigator/search/profile/${teamNumber}`);
  }

  useEffect(() => {
    axios.get('https://cyberlions-web-server-1028328220227.us-central1.run.app/robotList') 
      .then((response) => {
        alterRobotList(response.data);
      })
      .catch((error) => {
        console.error("Error making POST Request: Home, robotList: ", error);
      });
  }, []);

  const manageCloseInfo = () => {
    setCloseInfo(true);
  };

  return (
    <>
      <div className="home_container">
        <div className="home_topPiece" />
        <div className="home_middlePiece">
          {!closeInfo && (
            <div className="home_getStarted">
              <span className="home_header">Get Started Scouting</span>

              <div className="home_important">
                <div className="home_importantHero">
                  <img className="home_importantIconImage" alt="important icon" src={informationIcon} />
                  <span className="home_headerSmaller">Important</span>
                </div>

                <span className="home_importantText">Scouting is the process of recording data for strategy, so take note!</span>

                <button onClick={manageCloseInfo} className="home_hyperlinkButton">
                  <span className="home_hyperlink">Let's Get Going!</span>
                </button>
              </div>
            </div>
          )}

          <div className="home_viewScoutingData">
            <span className="home_header">View Scouting Data</span>
            <div className="home_scoutingDataGlimpses">
              {robotList?.map((robot) => (
                <button key={robot.profile.teamNumber} className="home_statGlimpseButton" onClick = {()=> handleProfileNavigation(robot.profile.teamNumber)}>
                  <StatGlimpse 
                    name={robot.profile.teamName} 
                    teamNumber={robot.profile.teamNumber} 
                    playstyle={[
                      robot.profile?.playstyle?.algae && "Algae Scorer",
                      robot.profile?.playstyle?.coral && "Coral Scorer",
                      robot.profile?.playstyle?.defense && "Defender"
                    ].filter(Boolean).join(", ") || "None"}
                  />
                </button>
              ))}
            </div>
            <span className="home_text2">For more information of all teams, click on the search icon</span>
          </div>
        </div>
      </div>
    </>
  );
}