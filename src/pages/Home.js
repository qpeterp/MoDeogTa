import TypingInput from "../TypingInput";
import React, { useState } from "react";
import SideDrawer from "../components/SideDrawer";
import "./Home.scss";

function Home() {
  const [codeToType, setCodeToType] = useState(""); // SideDrawer에서 받아올 텍스트 상태

  const handleCodeToTypeChange = (selectedText) => {
    setCodeToType(selectedText); // SideDrawer에서 전달받은 코드 텍스트 설정
  };

  return (
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
  );
}

export default Home;
