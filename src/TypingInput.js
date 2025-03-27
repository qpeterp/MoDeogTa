import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import IconButton from "./components/DeaugTaButton";
import { FaRedo, FaRandom } from "react-icons/fa";
import ResultDialog from "./components/ResultDialog";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { useSound } from "./contexts/SoundContext";

function TypingInput({ selectedText }) {
  const [codeToType, setCodeToType] = useState(
    "애국가 1. 동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세."
  );
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState("");
  const [isFinish, setIsFinish] = useState(false);
  const [beforeSpeed, setBeforeSpeed] = useState("0");
  const [currentTime, setCurrentTime] = useState("0");
  const [speed, setSpeed] = useState("0");
  const [isDialogOpen, setIsDialogOpen] = useState(false); // dialog 상태 관리
  const [wrongInput, setWrongInput] = useState(false); // 잘못된 입력 상태 추가

  const timerRef = useRef(null); // todo:: 다른 방법 고안
  const backgroundMusicContextRef = useRef(null); // todo:: 다른 방법 고안
  const backgroundMusicBufferRef = useRef(null); // todo:: 다른 방법 고안
  const backgroundMusicSourceRef = useRef(null);
  const typingSoundContextRef = useRef(null); // todo:: 다른 방법 고안
  const typingSoundBufferRef = useRef(null); // todo:: 다른 방법 고안
  const wrongSoundContextRef = useRef(null); // todo:: 다른 방법 고안
  const wrongSoundBufferRef = useRef(null); // todo:: 다른 방법 고안
  const {
    volume,
    backgroundMusicVolume,
    typingSound,
    wrongSound,
    backgroundMusic,
  } = useSound();

  const handleInputChange = (e) => {
    if (e.nativeEvent.inputType === "insertLineBreak" || e.key === "Enter") {
      setUserInput((prev) => prev + " ");
    } else {
      setUserInput(e.target.value);
    }
    setWrongInput(false);

    if (!startTime) {
      setStartTime(new Date().getTime());
    }
  };

  const handleTypingSound = (ev) => {
    if (
      volume === 0 ||
      (ev.key.length !== 1 && ev.key !== "Backspace") ||
      ev.repeat
    ) {
      return;
    }
    if (typingSoundContextRef.current && typingSoundBufferRef.current) {
      const source = typingSoundContextRef.current.createBufferSource();
      source.buffer = typingSoundBufferRef.current;
      const gainNode = typingSoundContextRef.current.createGain();
      gainNode.gain.value = volume;
      source.connect(gainNode);
      gainNode.connect(typingSoundContextRef.current.destination);
      source.start(typingSoundContextRef.current.currentTime);
    }
  };

  const handleWrongSound = useCallback(() => {
    if (volume === 0 || wrongInput) return;

    if (wrongSoundContextRef.current && wrongSoundBufferRef.current) {
      // 이전 gainNode 연결 해제
      if (wrongSoundContextRef.current.gainNode) {
        wrongSoundContextRef.current.gainNode.disconnect();
      }

      const source = wrongSoundContextRef.current.createBufferSource();
      source.buffer = wrongSoundBufferRef.current;

      // 새로운 gainNode 생성
      const gainNode = wrongSoundContextRef.current.createGain();
      gainNode.gain.value = volume;
      source.connect(gainNode);
      gainNode.connect(wrongSoundContextRef.current.destination);

      source.start(wrongSoundContextRef.current.currentTime);

      // 새로운 gainNode를 저장
      wrongSoundContextRef.current.gainNode = gainNode;
    }

    setWrongInput(true);
  }, [volume, wrongInput]);

  // 배경 음악 정지 함수
  const stopBackgroundMusic = () => {
    if (backgroundMusicSourceRef.current) {
      backgroundMusicSourceRef.current.stop();
      backgroundMusicSourceRef.current.disconnect();
      backgroundMusicSourceRef.current = null;
    }
  };

  const handleResetClick = () => {
    setBeforeSpeed(speed);

    setIsFinish(false);
    setUserInput("");
    setCurrentTime("0");
    setSpeed("0");
    setStartTime("");
    setIsDialogOpen(false); // dialog 닫기

    document.getElementById("userInput").focus(); // todo:: 수정
  };

  const handleGetScriptClick = async () => {
    const randomDoc = await getRandomDocument(); // 비동기 호출
    if (randomDoc && randomDoc.script) {
      setCodeToType(randomDoc.script); // script 필드를 codeToType에 할당
    }
  };

  // 배경음악 소리 로드
  useEffect(() => {
    if (backgroundMusicVolume < 0.1 || backgroundMusic === "off") return; // 소리가 꺼져 있으면 로드하지 않음

    // 기존 AudioContext 종료 (있다면)
    if (backgroundMusicContextRef.current) {
      backgroundMusicContextRef.current.close();
    }

    // 새로운 AudioContext 생성
    backgroundMusicContextRef.current = new (window.AudioContext ||
      window.webkitAudioContext)();

    fetch(backgroundMusic)
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) =>
        backgroundMusicContextRef.current.decodeAudioData(arrayBuffer)
      )
      .then((audioBuffer) => {
        backgroundMusicBufferRef.current = audioBuffer;
        if (
          !backgroundMusicBufferRef.current ||
          !backgroundMusicContextRef.current
        )
          return;

        // 기존 소리 정지
        stopBackgroundMusic();

        // 새로운 오디오 소스 생성
        const source = backgroundMusicContextRef.current.createBufferSource();
        source.buffer = backgroundMusicBufferRef.current;
        source.loop = true; // 무한 반복 설정

        const gainNode = backgroundMusicContextRef.current.createGain();
        gainNode.gain.value = backgroundMusicVolume; // 볼륨 설정

        source.connect(gainNode);
        gainNode.connect(backgroundMusicContextRef.current.destination);

        source.start(0);
        backgroundMusicSourceRef.current = source; // 현재 재생 중인 소스를 저장
      });

    return () => {
      stopBackgroundMusic(); // 컴포넌트 언마운트 시 정리
    };
  }, [backgroundMusicVolume, backgroundMusic]);

  // 타이핑 소리 로드
  useEffect(() => {
    if (volume < 0.1 || typingSound === "off") return; // 소리가 꺼져 있으면 로드하지 않음
    // Web Audio API 초기화
    typingSoundContextRef.current = new (window.AudioContext ||
      window.webkitAudioContext)();

    fetch(typingSound)
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) =>
        typingSoundContextRef.current.decodeAudioData(arrayBuffer)
      )
      .then((audioBuffer) => {
        typingSoundBufferRef.current = audioBuffer;
      });
  }, [volume, typingSound]);

  useEffect(() => {
    if (volume < 0.1 || wrongSound === "off") return; // 소리가 꺼져 있으면 로드하지 않음
    // Web Audio API 초기화
    wrongSoundContextRef.current = new (window.AudioContext ||
      window.webkitAudioContext)();

    fetch(wrongSound)
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) =>
        wrongSoundContextRef.current.decodeAudioData(arrayBuffer)
      )
      .then((audioBuffer) => {
        wrongSoundBufferRef.current = audioBuffer;
      });
  }, [volume, wrongSound]);

  useEffect(() => {
    if (userInput.length > codeToType.length && !wrongInput) {
      const endTime = new Date().getTime();
      const takenTime = (endTime - startTime) / 1000;

      const inputJamo = countJamo(userInput);

      setSpeed(((inputJamo * 50) / takenTime).toFixed(1));

      setIsFinish(true);
      setIsDialogOpen(true);
    }
  }, [userInput, codeToType, startTime, wrongInput]);

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
      setSpeed(((inputJamo * 50) / currentTime).toFixed(1)); // 실시간 타자 속도 계산
    }
  }, [userInput, currentTime, startTime, isFinish]); // userInput, currentTime 변경 시 실시간으로 speed 업데이

  // selectedText가 변경되면 codeToType을 업데이트
  useEffect(() => {
    if (selectedText) {
      setCodeToType(selectedText); // selectedText를 codeToType에 할당
    }
  }, [selectedText]);

  const renderCodeMemo = useMemo(() => {
    return codeToType.split("").map((char, index) => {
      const isWrong = index < userInput.length - 1 && userInput[index] !== char;

      if (isWrong && !wrongInput) {
        handleWrongSound(); // 처음 잘못된 입력에서만 소리 재생
      }

      return (
        <span
          key={index}
          style={{
            color: isWrong ? "red" : "",
          }}
        >
          {char}
        </span>
      );
    });
  }, [codeToType, handleWrongSound, userInput, wrongInput]); // 빈 배열을 두면 최초 렌더링 시만 실행됩니다.

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

  return (
    <>
      <div className="status-container">
        <p className="text status">이전타수 : {beforeSpeed}타</p>
        <p className="text status">경과시간 : {currentTime}초</p>
        <p className="text status">현재타수 : {speed}타</p>
      </div>
      <div className="stroke-box">
        <p className="text hint-text">{renderCodeMemo}</p>
        <textarea
          ref={textareaRef} // ref를 제대로 연결
          id="userInput"
          type="text"
          aria-label="typingText label"
          className="typing-text"
          value={userInput}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (!wrongInput) {
              handleTypingSound(e);
            }
          }}
          onPaste={(e) => e.preventDefault()} // 붙여넣기 금지
          autoComplete="off"
          spellCheck="false"
          readOnly={isFinish}
        />
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <IconButton
          className="button"
          icon={<FaRedo />}
          onClick={handleResetClick}
        />
        <IconButton
          className="button"
          icon={<FaRandom />}
          onClick={handleGetScriptClick}
        />
      </div>
      {isDialogOpen && (
        <ResultDialog
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
