import "./App.scss";
import Header from "./Header";
import TypingInput from "./TypingInput";
import React, { useState, useEffect } from "react";
import { FaRedo, FaRandom, FaBook } from "react-icons/fa";
import SideDrawer from "./components/SideDrawer";

function App() {
  const [showTutorial, setShowTutorial] = useState(false);
  const [codeToType, setCodeToType] = useState(""); // SideDrawer에서 받아올 텍스트 상태

  useEffect(() => {
    // 세션 스토리지에서 튜토리얼 표시 여부 확인
    const isTutorialShown = sessionStorage.getItem("isTutorialShown");

    if (!isTutorialShown) {
      setShowTutorial(true); // 튜토리얼 표시
      sessionStorage.setItem("isTutorialShown", "true"); // 튜토리얼 표시 기록
    }
  }, []);

  const handleCloseTutorial = () => {
    setShowTutorial(false); // 튜토리얼 닫기
  };

  const handleCodeToTypeChange = (selectedText) => {
    setCodeToType(selectedText); // SideDrawer에서 전달받은 코드 텍스트 설정
  };

  return (
    <>
      {showTutorial && (
        <div className="tutorial-overlay">
          <div className="tutorial-content">
            <h2>환영합니다!</h2>
            <p>모득타를 처음 방문하셨네요! 아래 내용을 참고하세요:</p>

            <div>
              <h3>기본 이용 방법</h3>
              <p className="instructions">
                글을 모두 입력하신 뒤에는{" "}
                <span className="keyboard-text">Enter</span> 혹은{" "}
                <span className="keyboard-text"> Spacebar </span>를 눌러야
                작성이 완료됩니다.
              </p>
            </div>

            <div>
              <h3>기능 설명</h3>
              <ol>
                <li>
                  <FaRedo /> 현재 글 다시 시도하기
                </li>
                <li>
                  <FaRandom /> 랜덤한 다른 글 호출하기
                </li>
                <li>
                  <FaBook /> 전체 글 중 선택하기
                </li>
              </ol>
            </div>

            <button onClick={handleCloseTutorial}>이해했어요!</button>
          </div>
        </div>
      )}

      {!showTutorial && (
        <>
          <Header />
          <div className="main">
            <TypingInput selectedText={codeToType} />
            <div>
              <p className="text">
                <span className="keyboard-text"> Tab </span> +
                <span className="keyboard-text"> Enter </span> - 재시작
              </p>
              <p className="text">
                <span className="keyboard-text"> Tab </span> +
                <span className="keyboard-text"> Tab </span> +
                <span className="keyboard-text"> Enter </span> - 글 변경
              </p>
            </div>
            <SideDrawer onTextSelect={handleCodeToTypeChange} />
          </div>
        </>
      )}
    </>
  );
}

export default App;
