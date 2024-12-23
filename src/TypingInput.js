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

      // 자소 단위로 정확도 및 타수 계산
      const correctJamoCount = userInput
        .split("")
        .reduce((count, char, index) => {
          const targetJamo = splitHangulToJamo(codeToType[index]);
          console.log(targetJamo);
          const inputJamo = splitHangulToJamo(char);
          return (
            count + targetJamo.filter((jamo, i) => jamo === inputJamo[i]).length
          );
        }, 0);

      const totalJamo = countJamo(codeToType);
      console.log(totalJamo);
      const inputJamo = countJamo(userInput);

      setAccuracy(((correctJamoCount / totalJamo) * 100).toFixed(1));
      setSpeed(((inputJamo * 60) / takenTime).toFixed(1));

      setIsFinish(true);
      setIsDialogOpen(true);
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
          onClose={() => {
            setIsDialogOpen(false);
            handleResetClick();
          }}
        />
      )}
    </>
  );
}

function splitHangulToJamo(char) {
  const HANGUL_START = 0xac00;
  const HANGUL_END = 0xd7a3;

  const CHO = [
    "ㄱ",
    "ㄲ",
    "ㄴ",
    "ㄷ",
    "ㄸ",
    "ㄹ",
    "ㅁ",
    "ㅂ",
    "ㅃ",
    "ㅅ",
    "ㅆ",
    "ㅇ",
    "ㅈ",
    "ㅉ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
  ];
  const JUNG = [
    "ㅏ",
    "ㅐ",
    "ㅑ",
    "ㅒ",
    "ㅓ",
    "ㅔ",
    "ㅕ",
    "ㅖ",
    "ㅗ",
    "ㅘ",
    "ㅙ",
    "ㅚ",
    "ㅛ",
    "ㅜ",
    "ㅝ",
    "ㅞ",
    "ㅟ",
    "ㅠ",
    "ㅡ",
    "ㅢ",
    "ㅣ",
  ];
  const JONG = [
    "",
    "ㄱ",
    "ㄲ",
    "ㄳ",
    "ㄴ",
    "ㄵ",
    "ㄶ",
    "ㄷ",
    "ㄹ",
    "ㄺ",
    "ㄻ",
    "ㄼ",
    "ㄽ",
    "ㄾ",
    "ㄿ",
    "ㅀ",
    "ㅁ",
    "ㅂ",
    "ㅄ",
    "ㅅ",
    "ㅆ",
    "ㅇ",
    "ㅈ",
    "ㅊ",
    "ㅋ",
    "ㅌ",
    "ㅍ",
    "ㅎ",
  ];

  // 한글 범위 내에 있는 문자일 경우
  if (
    char >= String.fromCharCode(HANGUL_START) &&
    char <= String.fromCharCode(HANGUL_END)
  ) {
    const code = char.charCodeAt(0) - HANGUL_START;
    const cho = Math.floor(code / (21 * 28)); // 초성
    const jung = Math.floor((code % (21 * 28)) / 28); // 중성
    const jong = code % 28; // 종성

    return [CHO[cho], JUNG[jung], JONG[jong]].filter(Boolean); // 종성이 없으면 제외
  }

  // 한글이 아닌 경우 그대로 반환
  return [char];
}

function countJamo(text) {
  return text
    .split("")
    .reduce((count, char) => count + splitHangulToJamo(char).length, 0);
}

export default TypingInput;
