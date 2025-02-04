import React from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"; // 물음표 아이콘
import SettingsIcon from "@mui/icons-material/Settings"; // 세팅 아이콘
import { MenuType } from "./common/MenuType";

function Header({ onMenuSelect }) {
  const handleTutorialClick = () => {
    onMenuSelect(MenuType.TUTORIAL);
  };

  const handleSettingClick = () => {
    onMenuSelect(MenuType.SETTINGS);
  };

  return (
    <div className="header-background">
      <header className="header">
        <img src="logo.svg" alt="Logo" className="header-logo" />
        <nav>
          <SettingsIcon className="menu-icon" onClick={handleSettingClick} />

          <HelpOutlineIcon
            className="menu-icon"
            onClick={handleTutorialClick}
          />
        </nav>
      </header>
    </div>
  );
}

export default Header;
