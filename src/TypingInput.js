import React, { useState, useEffect, useRef } from "react";
import IconButton from "./components/DeaugTaButton";
import { FaRedo, FaRandom } from "react-icons/fa";
import ResultDialog from "./components/ResultDialog";
import gsap from "gsap"; // 애니메이션 적용
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

// TODO : 타자 기록, 최대 타수,

function TypingInput({ selectedText }) {
  const [codeToType, setCodeToType] = useState(
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
    if (e.nativeEvent.inputType === "insertLineBreak" || e.key === "Enter") {
      setUserInput((prev) => prev + " ");
    } else {
      setUserInput(e.target.value);
    }

    if (!startTime) {
      setStartTime(new Date().getTime());
    }

    // 커서 위치에서 효과 생성
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const { selectionStart } = textarea;

      // 커서 위치 계산
      const { x, y } = calculateCursorPosition(textarea, selectionStart);

      // Dust Effect 생성
      createDustEffect(x, y);
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

  const handleGetScriptClick = async () => {
    const randomDoc = await getRandomDocument(); // 비동기 호출
    if (randomDoc && randomDoc.script) {
      setCodeToType(randomDoc.script); // script 필드를 codeToType에 할당
    }
  };

  useEffect(() => {
    if (userInput.length > codeToType.length) {
      const endTime = new Date().getTime();
      const takenTime = (endTime - startTime) / 1000;

      // 자소 단위로 정확도 및 타수 계산
      const correctJamoCount = userInput
        .split("")
        .reduce((count, char, index) => {
          const targetJamo = splitHangulToJamo(codeToType[index]);
          const inputJamo = splitHangulToJamo(char);
          return (
            count + targetJamo.filter((jamo, i) => jamo === inputJamo[i]).length
          );
        }, 0);

      const totalJamo = countJamo(codeToType);
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

  // textarea에 자동으로 포커스를 주기
  useEffect(() => {
    if (!isFinish && textareaRef.current) {
      textareaRef.current.focus(); // 코드가 업데이트된 후에 포커스를 줌
      setUserInput("");
    }
  }, [codeToType, isFinish]); // codeToType 또는 isFinish가 변경될 때마다 포커스

  useEffect(() => {
    if (startTime && !isFinish) {
      const inputJamo = countJamo(userInput);
      setSpeed(((inputJamo * 60) / currentTime).toFixed(1)); // 실시간 타자 속도 계산
    }
  }, [userInput, currentTime, startTime, isFinish]); // userInput, currentTime 변경 시 실시간으로 speed 업데이

  // selectedText가 변경되면 codeToType을 업데이트
  useEffect(() => {
    if (selectedText) {
      setCodeToType(selectedText); // selectedText를 codeToType에 할당
    }
  }, [selectedText]);

  const renderCode = () => {
    return codeToType.split("").map((char, index) => {
      let color;
      let bgColor;
      if (index < userInput.length - 1) {
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

  // ================================================================================
  // ================================================================================

  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      console.log(`textareaHeight : ${textareaRef.current.scrollHeight}`);
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [userInput]); // userInput이 변경될 때마다 높이 조정

  const createDustEffect = (x, y) => {
    const particles = [];

    for (let i = 0; i < 20; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.position = "absolute";
      particle.style.width = "5px";
      particle.style.height = "5px";
      particle.style.backgroundColor = "yellow";
      particle.style.borderRadius = "50%";
      particle.style.pointerEvents = "none";
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      document.body.appendChild(particle);
      particles.push(particle);

      gsap.to(particle, {
        duration: 1,
        x: Math.random() * 120 - 25, // 좌우로 퍼짐
        y: Math.random() * 120, // 아래로 떨어짐
        opacity: 0,
        scale: 0.5, // 파티클 크기 감소
        ease: "bounce.out", // 바운스 효과 적용
        stagger: 0.5, // 파티클들이 조금씩 튀어나가게 설정
        onComplete: () => particle.remove(), // 애니메이션 종료 후 제거
      });
    }
  };

  const calculateCursorPosition = (textarea, selectionStart) => {
    const rect = textarea.getBoundingClientRect();

    const computedStyle = window.getComputedStyle(textarea);
    const charWidth = parseFloat(computedStyle.fontSize) * 0.7;
    const lineHeight =
      parseFloat(computedStyle.lineHeight) ||
      parseFloat(computedStyle.fontSize) * 1.2;

    const textareaWidth = rect.width;
    const charsPerLine = Math.floor(textareaWidth / charWidth);

    const col = selectionStart % charsPerLine;
    const row = Math.floor(selectionStart / charsPerLine);

    const x = rect.left + window.scrollX + col * charWidth;
    const y = rect.top + window.scrollY + row * lineHeight;

    return { x, y };
  };

  return (
    <>
      <div>
        <p className="text">경과시간 : {currentTime}초</p>
        <p className="text">타수 : {speed}</p>
      </div>
      <div className="stroke-box">
        <p className="text hint-text">{renderCode()}</p>
        <textarea
          ref={textareaRef} // ref를 제대로 연결
          id="userInput"
          type="text"
          className="typing-text"
          value={userInput}
          onChange={handleInputChange}
          onPaste={(e) => e.preventDefault()} // 붙여넣기 금지
          autoComplete="off"
          spellCheck="false"
          readOnly={isFinish}
        />
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <IconButton icon={<FaRedo />} onClick={handleResetClick} />
        <IconButton icon={<FaRandom />} onClick={handleGetScriptClick} />
      </div>
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

// TODO :: User - Create typingScript
// async function addData() {
//   try {
//     const docRef = await addDoc(collection(db, "typingScript"), {
//       script:
//         "타자연습하다 보니 문득 롤 초창기부터 지금까지 현역으로 달려온 페이커가 새삼 대단하다고 느껴지네",
//     });
//     console.log("Document written with ID: ", docRef.id);
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// }

async function getRandomDocument() {
  try {
    const querySnapshot = await getDocs(collection(db, "typingScript"));
    const docs = [];

    querySnapshot.forEach((doc) => {
      docs.push({ id: doc.id, ...doc.data() });
    });

    if (docs.length === 0) {
      console.log("No documents found in the collection.");
      return null;
    }

    // 랜덤으로 하나의 문서 선택
    const randomDoc = docs[Math.floor(Math.random() * docs.length)];
    console.log(`Random Document: ${JSON.stringify(randomDoc)}`);
    return randomDoc;
  } catch (error) {
    console.error("Error fetching documents: ", error);
  }
}

export default TypingInput;
