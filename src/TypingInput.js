import React, { useState, useEffect, useRef } from "react";
import IconButton from "./components/DeaugTaButton";
import { FaRedo } from "react-icons/fa";
import ResultDialog from "./components/ResultDialog";

function TypingInput() {
  const [codeToType] = useState(
    "애국가 1. 동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세."
  );
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState("");
  const [isFinish, setIsFinish] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [accuracy, setAccuracy] = useState("");
  const [speed, setSpeed] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false); // dialog 상태 관리

  const timerRef = useRef(null);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
    if (!startTime) {
      setStartTime(new Date().getTime());
    }
  };

  const handleResetClick = () => {
    setAccuracy("");
    setIsFinish(false);
    setUserInput("");
    setCurrentTime("");
    setSpeed("");
    setStartTime("");
    setIsDialogOpen(false); // dialog 닫기
    document.getElementById("userInput").focus();
  };

  useEffect(() => {
    if (userInput.length === codeToType.length) {
      const endTime = new Date().getTime();
      const takenTime = (endTime - startTime) / 1000;
      const correctChars = userInput
        .split("")
        .filter((char, index) => char === codeToType[index]).length;
      setAccuracy(((correctChars / codeToType.length) * 100).toFixed(1));
      setSpeed((userInput.length * (100 / takenTime)).toFixed(0));

      setIsFinish(true);
      setIsDialogOpen(true); // 타자 종료 시 dialog 열기
    }
  }, [userInput, codeToType, startTime]);

  useEffect(() => {
    if (startTime && !isFinish) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prevTime) => {
          const updateTime = (parseFloat(prevTime) || 0) + 0.01;
          return updateTime.toFixed(2);
        });
      }, 10);
    }

    return () => clearInterval(timerRef.current);
  }, [startTime, isFinish]);

  const renderCode = () => {
    return codeToType.split("").map((char, index) => {
      let color;
      let bgColor;
      if (index < userInput.length) {
        if (userInput[index] !== char) {
          bgColor = "red";
          color = "red";
        }
      }
      return (
        <span
          key={index}
          style={{
            backgroundColor: bgColor,
            color: color,
          }}
        >
          {char}
        </span>
      );
    });
  };

  return (
    <>
      <div>
        <p className="hint-text">경과시간 : {currentTime}초</p>
      </div>
      <div className="stroke-box">
        <p className="hint-text">{renderCode()}</p>
        <input
          id="userInput"
          type="text"
          className="typing-text"
          value={userInput}
          onChange={handleInputChange}
          onPaste={(e) => e.preventDefault()} // 붙여넣기 금지
          autoComplete="off"
          spellCheck="false"
        />
      </div>
      <IconButton icon={<FaRedo />} onClick={handleResetClick} />

      {/* 결과 Dialog */}
      {isDialogOpen && (
        <ResultDialog
          accuracy={accuracy}
          speed={speed}
          onClose={() => setIsDialogOpen(false)}
        />
      )}
    </>
  );
}

export default TypingInput;
