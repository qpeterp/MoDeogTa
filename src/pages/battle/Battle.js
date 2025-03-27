import React from "react";
import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { countJamo, splitHangulToJamo } from "../../common/hangulJamo";
import { useSound } from "../../contexts/SoundContext";
import "./Battle.scss";

function Battle() {
  const [codeToType, setCodeToType] = useState("이성은 천재"); // TODO :: 서버에서 받아오는 값 사용.
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState("");
  const [isFinish, setIsFinish] = useState(false);
  const [currentTime, setCurrentTime] = useState("0");
  const [speed, setSpeed] = useState("0");
  const [wrongInput, setWrongInput] = useState(false);

  const timerRef = useRef(null);
  const backgroundMusicContextRef = useRef(null);
  const backgroundMusicBufferRef = useRef(null);
  const backgroundMusicSourceRef = useRef(null);
  const typingSoundContextRef = useRef(null);
  const typingSoundBufferRef = useRef(null);
  const wrongSoundContextRef = useRef(null);
  const wrongSoundBufferRef = useRef(null);
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

  // 대결 시작 시, InputBox에 Focus
  useEffect(() => {
    setUserInput("");
    textareaRef.current.focus();
  }, []);

  useEffect(() => {
    if (startTime && !isFinish) {
      const inputJamo = countJamo(userInput);
      setSpeed(((inputJamo * 50) / currentTime).toFixed(1)); // 실시간 타자 속도 계산
    }
  }, [userInput, currentTime, startTime, isFinish]); // userInput, currentTime 변경 시 실시간으로 speed 업데이

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
            backgroundColor: isWrong ? "red" : "",
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
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [userInput]);

  return (
    <div className="battle-page-wrap">
      <div style={{ color: "white" }}>여기에 바 넣기</div>
      <div className="battle-view-wrap">
        <div className="battle-colume">
          <div className="battle-status-container">
            <p className="text battle-status">경과시간 : {currentTime}초</p>
            <p className="text battle-status">현재타수 : {speed}타</p>
          </div>
          <div className="battle-stroke-box">
            <p className="text hint-text">{renderCodeMemo}</p>
            <textarea
              ref={textareaRef} // ref를 제대로 연결
              id="userInput"
              type="text"
              aria-label="typingText label"
              className="battle-typing-text"
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
        </div>

        <div className="battle-colume">
          <div className="battle-status-container">
            <p className="text battle-status">경과시간 : {currentTime}초</p>
            <p className="text battle-status">현재타수 : {speed}타</p>
          </div>
          <div className="battle-stroke-box">
            <p className="text hint-text">{renderCodeMemo}</p>
            <textarea
              ref={textareaRef} // ref를 제대로 연결
              id="userInput"
              type="text"
              aria-label="typingText label"
              className="battle-typing-text"
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
        </div>
      </div>
    </div>
  );
}

export default Battle;
