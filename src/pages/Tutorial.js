import HelpOutlineIcon from "@mui/icons-material/HelpOutline"; // 물음표 아이콘
import SettingsIcon from "@mui/icons-material/Settings"; // 세팅 아이콘
import { FaRedo, FaRandom, FaBook, FaSortAmountDown } from "react-icons/fa";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Tutorial.scss";

const Tutorial = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 세션 스토리지에서 튜토리얼 표시 여부 확인
    const isTutorialShown = sessionStorage.getItem("isTutorialShown");

    if (!isTutorialShown) {
      navigate("/");
      sessionStorage.setItem("isTutorialShown", "true"); // 튜토리얼 표시 기록
    }
  }, [navigate]);

  const handleCloseTutorial = () => {
    navigate("/home");
  };

  return (
    <div className="tutorial-overlay overlay">
      <div className="tutorial-content">
        <h2>환영합니다!</h2>
        <p>이용 방법은 아래 내용을 참고하세요:</p>

        <div>
          <h3>기본 이용 방법</h3>
          <p className="instructions">
            1. 글을 모두 입력하신 뒤에는{" "}
            <span className="keyboard-text">Enter</span> 혹은{" "}
            <span className="keyboard-text"> Spacebar </span>를 눌러야 작성이
            완료됩니다.
          </p>
          <p className="instructions">
            2. 입력한 글에 오타가 존재할 경우, 타자연습은 완료되지 않습니다.
          </p>
        </div>

        <div>
          <h3>기능 설명</h3>
          <ul className="tutorial-grid">
            <li>
              <FaRedo /> 현재 글 다시 시도하기
            </li>
            <li>
              <FaRandom /> 랜덤한 다른 글 호출하기
            </li>
            <li>
              <FaBook /> 전체 글 중 선택하기
            </li>
            <li>
              <FaSortAmountDown /> 전체 글 정렬하기
            </li>
            <li>
              <HelpOutlineIcon /> 도움말 - 튜토리얼
            </li>
            <li>
              <SettingsIcon /> 환경 설정
            </li>
          </ul>
        </div>

        <button onClick={handleCloseTutorial}>이해했어요!</button>
      </div>
    </div>
  );
};

export default Tutorial;
