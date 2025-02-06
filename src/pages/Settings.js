import React, { useState } from "react";
import { FaAngleRight } from "react-icons/fa"; // 글쓰기, 필기 느낌
import { FaVolumeDown, FaVolumeUp } from "react-icons/fa";
import IconLabel from "../components/IconLabel";
import { useSound } from "../contexts/SoundContext";

function Settings() {
  const [soundIsOpen, setSoundIsOpen] = useState(false);
  const { volume, setVolume, typingSound, setTypingSound } = useSound();

  const handleSoundMenuClick = () => {
    setSoundIsOpen(!soundIsOpen);
  };

  const handleVolumeChange = (ev) => {
    setVolume(ev.target.value);
  };

  const handleTypingSoundButtonClick = (ev) => {
    const soundName = ev.target.getAttribute("data-typingSound");
    setTypingSound(soundName);
  };

  return (
    <div className="setting-menu-wrap">
      <div className="setting-menu" onClick={handleSoundMenuClick}>
        <FaAngleRight
          className={`setting-arrow ${soundIsOpen ? "rotate" : ""}`}
          size={28}
        />
        <h1 className="test">
          <strong>Sound</strong>
        </h1>
      </div>

      <div className={`menu-content ${soundIsOpen ? "open" : ""}`}>
        <div className="section">
          <IconLabel
            icon={FaVolumeDown}
            labelText="소리 크기"
            description="음향 효과 크기 변경"
            className="icon-label"
          />
          <div className="range-container">
            <div style={{ color: "white" }}>{volume}</div>
            <input
              type="range"
              min={0}
              max={10}
              step={0.5}
              value={volume}
              onChange={handleVolumeChange}
              style={{
                width: "80%",
                appearance: "none", // 기본 스타일을 제거
                backgroundColor: "#ddd", // 트랙 색상
                height: "8px", // 트랙 높이
                borderRadius: "5px", // 트랙의 둥근 모서리
                marginRight: "3vw",
              }}
            />
          </div>
        </div>

        <div className="section">
          <IconLabel
            icon={FaVolumeUp}
            labelText="타자 소리"
            description="키 입력 시, 재생될 짧은 소리 선택"
          />
          <div className="buttons">
            <button
              className={`single-button ${
                typingSound === "off" ? "active" : ""
              }`}
              onClick={handleTypingSoundButtonClick}
              data-typingSound="off"
            >
              없음
            </button>
            <button
              className={`single-button ${
                typingSound === "au_keyboard.wav" ? "active" : ""
              }`}
              onClick={handleTypingSoundButtonClick}
              data-typingSound="au_keyboard.wav"
            >
              키보드
            </button>
            <button
              className={`single-button ${
                typingSound === "au_waterdrop.mp3" ? "active" : ""
              }`}
              onClick={handleTypingSoundButtonClick}
              data-typingSound="au_waterdrop.mp3"
            >
              물방울
            </button>
            <button
              className={`single-button ${
                typingSound === "au_cat.mp3" ? "active" : ""
              }`}
              onClick={handleTypingSoundButtonClick}
              data-typingSound="au_cat.mp3"
            >
              고양이
            </button>
            {/* <button
              className={`single-button ${
                typingSound === "au_tong.mp3" ? "active" : ""
              }`}
              onClick={handleTypingSoundButtonClick}
              data-typingSound="au_tong.mp3"
            >
              통
            </button> */}
            <button
              className={`single-button ${
                typingSound === "au_swing.mp3" ? "active" : ""
              }`}
              onClick={handleTypingSoundButtonClick}
              data-typingSound="au_swing.mp3"
            >
              모래
            </button>
          </div>
        </div>
        {/* <IconLabel
          icon={FaVolumeMute}
          labelText="에러 소리"
          description="잘못된 키 입력 시, 재생될 짧은 소리 선택"
        /> */}
      </div>

      {/* <div className="setting-menu">
        <FaAngleRight className="setting-arrow" size={28} />
        <h1>
          <strong>Theme</strong>
        </h1>
      </div> */}
    </div>
  );
}

export default Settings;
