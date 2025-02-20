import React, { useState } from "react";
import { FaAngleRight } from "react-icons/fa"; // 글쓰기, 필기 느낌
import { FaVolumeDown, FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import IconLabel from "../components/IconLabel";
import { useSound } from "../contexts/SoundContext";
import "./Settings.scss";

function Settings() {
  const [soundIsOpen, setSoundIsOpen] = useState(false);
  const [themeIsOpen, setThemeIsOpen] = useState(false);

  const {
    volume,
    setVolume,
    backgroundMusicVolume,
    setBackgroundMusicVolume,
    typingSound,
    setTypingSound,
    wrongSound,
    setWrongSound,
    backgroundMusic,
    setBackgroundMusic,
  } = useSound();

  // 소리 관련
  const handleSoundMenuClick = () => {
    setSoundIsOpen(!soundIsOpen);
  };

  const handleVolumeChange = (ev) => {
    setVolume(ev.target.value);
  };

  const handleBackgroundMusicVolumeChange = (ev) => {
    setBackgroundMusicVolume(ev.target.value);
  };

  const handleTypingSoundButtonClick = (ev) => {
    const soundName = ev.target.getAttribute("data-typingSound");
    setTypingSound(soundName);
  };

  const handleWrongSoundButtonClick = (ev) => {
    const soundName = ev.target.getAttribute("data-wrongSound");
    setWrongSound(soundName);
  };

  const handleBackgroundMusicButtonClick = (ev) => {
    const soundName = ev.target.getAttribute("data-music");
    setBackgroundMusic(soundName);
  };

  // 테마 관련
  const handleThemeMenuClick = () => {
    setThemeIsOpen(!themeIsOpen);
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
            labelText="타자소리 음량"
            description="타자소리 음량을 변경합니다. 0 ~ 1 까지의 범위 중에서 원하는 음량을 드래그 or 클릭하여 선택하세요."
            className="icon-label"
          />
          <div className="range-container">
            <div style={{ color: "white" }}>{volume}</div>
            <input
              type="range"
              min={0}
              max={1}
              step={0.1}
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
            labelText="타자소리"
            description="키 입력 시, 재생될 짧은 소리를 선택하세요."
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

        <div className="section">
          <IconLabel
            icon={FaVolumeMute}
            labelText="에러소리"
            description="잘못된 키 입력 시, 재생될 짧은 소리를 선택하세요."
          />
          <div className="buttons">
            <button
              className={`single-button ${
                wrongSound === "off" ? "active" : ""
              }`}
              onClick={handleWrongSoundButtonClick}
              data-wrongSound="off"
            >
              없음
            </button>
            <button
              className={`single-button ${
                wrongSound === "au_damage.mp3" ? "active" : ""
              }`}
              onClick={handleWrongSoundButtonClick}
              data-wrongSound="au_damage.mp3"
            >
              데미지
            </button>
            <button
              className={`single-button ${
                wrongSound === "au_tong.mp3" ? "active" : ""
              }`}
              onClick={handleWrongSoundButtonClick}
              data-wrongSound="au_tong.mp3"
            >
              통
            </button>
          </div>
        </div>
        <div className="section" style={{ marginTop: "5vh" }}>
          <IconLabel
            icon={FaVolumeDown}
            labelText="배경음악 음량"
            description="배경음악 음량을 변경합니다. 0 ~ 1 까지의 범위 중에서 원하는 음량을 드래그 or 클릭하여 선택하세요."
            className="icon-label"
          />
          <div className="range-container">
            <div style={{ color: "white" }}>{backgroundMusicVolume}</div>
            <input
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={backgroundMusicVolume}
              onChange={handleBackgroundMusicVolumeChange}
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
            labelText="배경음악"
            description="하루 온종일 재생될 배경음악을 선택하세요."
          />
          <div className="buttons">
            <button
              className={`single-button ${
                backgroundMusic === "off" ? "active" : ""
              }`}
              onClick={handleBackgroundMusicButtonClick}
              data-music="off"
            >
              없음
            </button>
            <button
              className={`single-button ${
                backgroundMusic === "au_rain.mp3" ? "active" : ""
              }`}
              onClick={handleBackgroundMusicButtonClick}
              data-music="au_rain.mp3"
            >
              빗소리
            </button>
            <button
              className={`single-button ${
                backgroundMusic === "au_jazz.mp3" ? "active" : ""
              }`}
              onClick={handleBackgroundMusicButtonClick}
              data-music="au_jazz.mp3"
            >
              재즈
            </button>
            <button
              className={`single-button ${
                backgroundMusic === "au_lastboss.mp3" ? "active" : ""
              }`}
              onClick={handleBackgroundMusicButtonClick}
              data-music="au_lastboss.mp3"
            >
              마지막
            </button>
            <button
              className={`single-button ${
                backgroundMusic === "au_dream.mp3" ? "active" : ""
              }`}
              onClick={handleBackgroundMusicButtonClick}
              data-music="au_dream.mp3"
            >
              망각
            </button>
            <button
              className={`single-button ${
                backgroundMusic === "au_doubt.mp3" ? "active" : ""
              }`}
              onClick={handleBackgroundMusicButtonClick}
              data-music="au_doubt.mp3"
            >
              여유만만
            </button>
          </div>
        </div>
      </div>

      <div className="setting-menu" onClick={handleThemeMenuClick}>
        <FaAngleRight
          className={`setting-arrow ${themeIsOpen ? "rotate" : ""}`}
          size={28}
        />
        <h1 className="test">
          <strong>Theme</strong>
        </h1>
      </div>
      <div className={`menu-content ${themeIsOpen ? "open" : ""}`}>
        <div className="section">
          <IconLabel
            icon={FaVolumeUp}
            labelText="테마"
            description="타자연습 사이트의 색상을 변경합니다."
          />

          <div className="buttons">
            <button
              className={`single-button ${
                backgroundMusic === "off" ? "active" : ""
              }`}
              onClick={handleBackgroundMusicButtonClick}
              data-music="off"
            >
              없음
            </button>
            <button
              className={`single-button ${
                backgroundMusic === "au_rain.mp3" ? "active" : ""
              }`}
              onClick={handleBackgroundMusicButtonClick}
              data-music="au_rain.mp3"
            >
              빗소리
            </button>
            <button
              className={`single-button ${
                backgroundMusic === "au_jazz.mp3" ? "active" : ""
              }`}
              onClick={handleBackgroundMusicButtonClick}
              data-music="au_jazz.mp3"
            >
              재즈
            </button>
            <button
              className={`single-button ${
                backgroundMusic === "au_lastboss.mp3" ? "active" : ""
              }`}
              onClick={handleBackgroundMusicButtonClick}
              data-music="au_lastboss.mp3"
            >
              마지막
            </button>
            <button
              className={`single-button ${
                backgroundMusic === "au_dream.mp3" ? "active" : ""
              }`}
              onClick={handleBackgroundMusicButtonClick}
              data-music="au_dream.mp3"
            >
              망각
            </button>
            <button
              className={`single-button ${
                backgroundMusic === "au_doubt.mp3" ? "active" : ""
              }`}
              onClick={handleBackgroundMusicButtonClick}
              data-music="au_doubt.mp3"
            >
              여유만만
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
