import React from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"; // 물음표 아이콘
import { MenuType } from "./common/MenuType";

function Header({ onMenuSelect }) {
  const handleTutorialClick = () => {
    onMenuSelect(MenuType.TUTORIAL);
  };

  return (
    <div className="header-background">
      <header className="header">
        <img src="logo.svg" alt="Logo" className="header-logo" />
        <nav>
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
