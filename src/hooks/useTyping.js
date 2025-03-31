import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useSound } from "../contexts/SoundContext";

const useTyping = (getRandomDocument, selectedText) => {
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState("");
  const [isFinish, setIsFinish] = useState(false);
  const [beforeSpeed, setBeforeSpeed] = useState("0");
  const [currentTime, setCurrentTime] = useState("0");
  const [accuracy, setAccuracy] = useState("");
  const [speed, setSpeed] = useState("0");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
      if (wrongSoundContextRef.current.gainNode) {
        wrongSoundContextRef.current.gainNode.disconnect();
      }

      const source = wrongSoundContextRef.current.createBufferSource();
      source.buffer = wrongSoundBufferRef.current;

      const gainNode = wrongSoundContextRef.current.createGain();
      gainNode.gain.value = volume;
      source.connect(gainNode);
      gainNode.connect(wrongSoundContextRef.current.destination);

      source.start(wrongSoundContextRef.current.currentTime);

      wrongSoundContextRef.current.gainNode = gainNode;
    }

    setWrongInput(true);
  }, [volume, wrongInput]);

  const stopBackgroundMusic = () => {
    if (backgroundMusicSourceRef.current) {
      backgroundMusicSourceRef.current.stop();
      backgroundMusicSourceRef.current.disconnect();
      backgroundMusicSourceRef.current = null;
    }
  };

  const handleResetClick = () => {
    setBeforeSpeed(speed);

    setAccuracy("");
    setIsFinish(false);
    setUserInput("");
    setCurrentTime("0");
    setSpeed("0");
    setStartTime("");
    setIsDialogOpen(false);

    document.getElementById("userInput").focus();
  };

  const handleGetScriptClick = async () => {
    const randomDoc = await getRandomDocument();
    if (randomDoc && randomDoc.script) {
      setCodeToType(randomDoc.script);
    }
  };

  useEffect(() => {
    if (backgroundMusicVolume < 0.1 || backgroundMusic === "off") return;

    if (backgroundMusicContextRef.current) {
      backgroundMusicContextRef.current.close();
    }

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

        stopBackgroundMusic();

        const source = backgroundMusicContextRef.current.createBufferSource();
        source.buffer = backgroundMusicBufferRef.current;
        source.loop = true;

        const gainNode = backgroundMusicContextRef.current.createGain();
        gainNode.gain.value = backgroundMusicVolume;

        source.connect(gainNode);
        gainNode.connect(backgroundMusicContextRef.current.destination);

        source.start(0);
        backgroundMusicSourceRef.current = source;
      });

    return () => {
      stopBackgroundMusic();
    };
  }, [backgroundMusicVolume, backgroundMusic]);

  useEffect(() => {
    if (volume < 0.1 || typingSound === "off") return;

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
    if (volume < 0.1 || wrongSound === "off") return;

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

  const renderCodeMemo = useMemo(() => {
    return codeToType.split("").map((char, index) => {
      const isWrong = index < userInput.length - 1 && userInput[index] !== char;

      if (isWrong && !wrongInput) {
        handleWrongSound();
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
  }, [codeToType, handleWrongSound, userInput, wrongInput]);

  return {
    userInput,
    accuracy,
    speed,
    isFinish,
    isDialogOpen,
    handleInputChange,
    handleResetClick,
    handleGetScriptClick,
    renderCodeMemo,
  };
};

export default useTyping;
