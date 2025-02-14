import React from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"; // 물음표 아이콘
import { useNavigate } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings"; // 세팅 아이콘
// import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

function Header() {
  const navigate = useNavigate();

  const handleTutorialClick = () => {
    navigate("/");
  };

  const handleSettingClick = () => {
    navigate("/settings");
  };

  // const handleSuggestBoardClick = () => {
  //   onMenuSelect("/suggest-board");
  // };

  return (
    <div className="header-background">
      <header className="header">
        <img src="logo.svg" alt="Logo" className="header-logo" />
        <div className="nav-wrap">
          {/* <nav>
            <QuestionAnswerIcon
              className="menu-icon"
              onClick={handleSuggestBoardClick}
            />
          </nav> */}
          <nav>
            <SettingsIcon className="menu-icon" onClick={handleSettingClick} />
            <HelpOutlineIcon
              className="menu-icon"
              onClick={handleTutorialClick}
            />
          </nav>
        </div>
      </header>
    </div>
  );
}

export default Header;
