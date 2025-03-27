import React, { useState } from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"; // 물음표 아이콘
import { useNavigate } from "react-router-dom";
import SettingsIcon from "@mui/icons-material/Settings"; // 세팅 아이콘
import KeyboardIcon from "@mui/icons-material/Keyboard";
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
// import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import "./Header.scss";

function Header() {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState("home");

  const handleTutorialClick = () => {
    navigate("/");
    setSelectedMenu("home");
  };

  const handleSettingClick = () => {
    setSelectedMenu("setting");
    navigate("/settings");
  };

  const handleHomeClick = () => {
    setSelectedMenu("home");
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
            <KeyboardIcon
              className={`menu-icon ${
                selectedMenu === "home" ? "menu-active" : ""
              }`}
              onClick={handleHomeClick}
            />
            {/* <AttachMoneyIcon
              className="menu-icon"
              onClick={handlePaymentClick}
            /> */}
          </nav>
          <nav>
            <SettingsIcon
              className={`menu-icon ${
                selectedMenu === "setting" ? "menu-active" : ""
              }`}
              onClick={handleSettingClick}
            />
            <HelpOutlineIcon
              className={`menu-icon ${
                selectedMenu === "tutorial" ? "menu-active" : ""
              }`}
              onClick={handleTutorialClick}
            />
          </nav>
        </div>
      </header>
    </div>
  );
}

export default Header;
