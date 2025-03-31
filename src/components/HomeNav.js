import React from "react";
import { FaRedo, FaRandom } from "react-icons/fa";
import "./HomeNav.scss";

const HomeNav = ({ isActive, onClick }) => {
  return (
    <nav className="home-menu-nav">
      <label
        className={`${isActive === "loop" ? "home-menu-active" : ""} home-menu`}
        onClick={() => onClick("loop")}
      >
        <FaRedo />
        문장 반복
      </label>

      <label
        className={`${
          isActive === "random" ? "home-menu-active" : ""
        } home-menu`}
        onClick={() => onClick("random")}
      >
        <FaRandom />
        다음 문장
      </label>
    </nav>
  );
};

export default HomeNav;
