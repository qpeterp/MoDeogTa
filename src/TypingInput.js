import React, { useState, useEffect, useRef } from "react";

function TypingInput() {
  const [codeToType] = useState(
    "애국가 1. 동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세."
  );
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState("");
  const [isFinish, setIsFinish] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  const timerRef = useRef(null); // useRef로 타이머 변수 선언

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
    if (!startTime) {
      setStartTime(new Date().getTime());
    }
    if (userInput.length === codeToType.length - 1) {
      setIsFinish(true);
    }
  };

  useEffect(() => {
    if (startTime && !isFinish) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prevTime) => {
          const updateTime = (parseFloat(prevTime) || 0) + 0.1;
          return updateTime.toFixed(1);
        });
      }, 100);
    }

    return () => clearInterval(timerRef.current);
  }, [startTime, isFinish]);

  const renderCode = () => {
    return codeToType.split("").map((char, index) => {
      let color;
      let bgColor;
      if (index < userInput.length) {
        if (userInput[index] !== char) {
          bgColor = "red"; // 틀린 글자 배경 빨간색
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
    <div className="background">
      <div>
        <p className="hint-text">경과시간 : {currentTime}초</p>
      </div>
      <div className="stroke-box">
        <p className="hint-text">{renderCode()}</p>
        <input
          type="text"
          className="typing-text"
          value={userInput}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}

export default TypingInput;
