import React from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"; // 물음표 아이콘
import SettingsIcon from "@mui/icons-material/Settings"; // 세팅 아이콘
import { MenuType } from "./common/MenuType";

function Header({ onMenuSelect }) {
  const handleTutorialClick = () => {
    onMenuSelect(MenuType.TUTORIAL);
  };

  // const handleSettingClick = () => {
  //   onMenuSelect(MenuType.SETTINGS);
  // };

  const handleSuggestBoardClick = () => {
    onMenuSelect(MenuType.SUGGEST_BOARD);
  };

  return (
    <div className="header-background">
      <header className="header">
        <img src="logo.svg" alt="Logo" className="header-logo" />
        <div className="nav-wrap">
          <nav>
            {/* 추후 댓글 혹은 응모 등의 아이콘으로 변경 */}
            <SettingsIcon
              className="menu-icon"
              onClick={handleSuggestBoardClick}
            />
          </nav>
          <nav>
            <SettingsIcon
              className="menu-icon"
              // onClick={handleSettingClick}
            />
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
