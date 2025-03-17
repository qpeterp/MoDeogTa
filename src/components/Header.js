import React from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"; // 물음표 아이콘
import { useNavigate } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings"; // 세팅 아이콘
import KeyboardIcon from "@mui/icons-material/Keyboard";
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
// import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import "./Header.scss";

function Header() {
  const navigate = useNavigate();

  const handleTutorialClick = () => {
    navigate("/");
  };

  const handleSettingClick = () => {
    navigate("/settings");
  };

  const handleHomeClick = () => {
    navigate("/home");
  };

  // const handlePaymentClick = () => {
  //   navigate("/payment");
  // };

  // const handleSuggestBoardClick = () => {
  //   onMenuSelect("/suggest-board");
  // };

  return (
    <div className="header-background">
      <header className="header">
        <img src="logo.svg" alt="Logo" className="header-logo" width="120" />
        <div className="nav-wrap">
          <nav>
            {/* <QuestionAnswerIcon
              className="menu-icon"
              onClick={handleSuggestBoardClick}
            /> */}
            <KeyboardIcon className="menu-icon" onClick={handleHomeClick} />
            {/* <AttachMoneyIcon
              className="menu-icon"
              onClick={handlePaymentClick}
            /> */}
          </nav>
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
