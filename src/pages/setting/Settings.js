import React, { useState } from "react";
import { FaAngleRight } from "react-icons/fa"; // 글쓰기, 필기 느낌
import {
  FaVolumeDown,
  FaVolumeUp,
  FaVolumeMute,
  FaSave,
  FaTint,
} from "react-icons/fa";

import IconLabel from "../../components/IconLabel";
import { useSound } from "../../contexts/SoundContext";
import { useTheme } from "../../contexts/ThemeContext";
import "./Settings.scss";

function Settings() {
  const {
    themeColor,
    setThemeColor,
    backgroundUrl,
    setBackgroundUrl,
    alpha,
    setAlpha,
    typingStyle,
    setTypingStyle,
  } = useTheme();

  const [soundIsOpen, setSoundIsOpen] = useState(true);
  const [themeIsOpen, setThemeIsOpen] = useState(true);
  const [typingIsOpen, setTypingIsOpen] = useState(true);
  const [tempBackgroundUrl, setTempBackgroundUrl] = useState(backgroundUrl);

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

  const themeColorOptions = [
    { key: "lightning", label: "번개" },
    { key: "rain", label: "소나기" },
    { key: "fire", label: "화재" },
    { key: "nature", label: "자연" },
    { key: "night", label: "밤하늘" },
  ];

  const typingSoundsOptions = [
    { key: "off", label: "없음" },
    { key: "au_keyboard.wav", label: "키보드" },
    { key: "au_waterdrop.mp3", label: "물방울" },
    { key: "au_cat.mp3", label: "고양이" },
    { key: "au_swing.mp3", label: "모래" },
  ];

  const wrongSoundsOptions = [
    { key: "off", label: "없음" },
    { key: "au_damage.mp3", label: "데미지" },
    { key: "au_tong.mp3", label: "통" },
  ];

  const backgroundMusicOptions = [
    { key: "off", label: "없음" },
    { key: "au_rain.mp3", label: "빗소리" },
    { key: "au_jazz.mp3", label: "재즈" },
    { key: "au_lastboss.mp3", label: "마지막" },
    { key: "au_dream.mp3", label: "망각" },
    { key: "au_doubt.mp3", label: "여유만만" },
  ];

  const typingStyleOptions = [
    { key: "basic", label: "기본" },
    { key: "overlapping", label: "덮어쓰기" },
  ];

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

  const handleTypingSoundButtonClick = (typingSound) => {
    setTypingSound(typingSound);
  };

  const handleWrongSoundButtonClick = (wrongSound) => {
    setWrongSound(wrongSound);
  };

  const handleBackgroundMusicButtonClick = (backgorundMusic) => {
    setBackgroundMusic(backgorundMusic);
  };

  // 테마 관련
  const handleThemeMenuClick = () => {
    setThemeIsOpen(!themeIsOpen);
  };

  const handleThemeColorButtonClick = (themeColor) => {
    setThemeColor(themeColor);
  };

  const handleTempBackgroundUrl = (ev) => {
    setTempBackgroundUrl(ev.target.value);
  };

  const handleBackgroundAlphaChange = (ev) => {
    setAlpha(ev.target.value);
  };

  const handleBackgroundUrlButton = () => {
    setBackgroundUrl(tempBackgroundUrl);
  };

  // 타이핑 관련
  const handleTypingMenuClick = () => {
    setTypingIsOpen(!typingIsOpen);
  };

  const handleTypingStyleClick = (typingStyle) => {
    setTypingStyle(typingStyle);
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
          <div className="row-container">
            <div style={{ color: "white" }}>{volume}</div>
            <input
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={volume}
              aria-label="change typingsound volume"
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
          <Buttons
            options={typingSoundsOptions}
            isFlag={typingSound}
            callback={handleTypingSoundButtonClick}
          />
        </div>

        <div className="section">
          <IconLabel
            icon={FaVolumeMute}
            labelText="에러소리"
            description="잘못된 키 입력 시, 재생될 짧은 소리를 선택하세요."
          />
          <Buttons
            options={wrongSoundsOptions}
            isFlag={wrongSound}
            callback={handleWrongSoundButtonClick}
          />
        </div>
        <div className="section" style={{ marginTop: "5vh" }}>
          <IconLabel
            icon={FaVolumeDown}
            labelText="배경음악 음량"
            description="배경음악 음량을 변경합니다. 0 ~ 1 까지의 범위 중에서 원하는 음량을 드래그 or 클릭하여 선택하세요."
            className="icon-label"
          />
          <div className="row-container">
            <div style={{ color: "white" }}>{backgroundMusicVolume}</div>
            <input
              type="range"
              min={0}
              max={1}
              step={0.1}
              aria-label="change background music volume"
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

          <Buttons
            options={backgroundMusicOptions}
            isFlag={backgroundMusic}
            callback={handleBackgroundMusicButtonClick}
          />
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
            labelText="색상"
            description="타자연습 사이트의 색상을 변경합니다."
          />

          <Buttons
            options={themeColorOptions}
            isFlag={themeColor}
            callback={handleThemeColorButtonClick}
          />
        </div>

        <div className="section">
          <IconLabel
            icon={FaVolumeUp}
            labelText="커스텀 배경"
            description="이미지 Url을 작성하여, 원하는 이미지를 사이트 배경화면으로 설정하세요."
          />
          <div className="row-container">
            <input
              className="background-url"
              aria-label="input background image url"
              onChange={handleTempBackgroundUrl}
              value={tempBackgroundUrl}
            />
            <div
              className="background-url-button"
              onClick={handleBackgroundUrlButton}
            >
              <FaSave />
            </div>
          </div>

          <IconLabel
            icon={FaTint}
            labelText="배경 투명도"
            description="배경 투명도를 변경합니다. 0 ~ 1 까지의 범위 중에서 원하는 음량을 드래그 or 클릭하여 선택하세요."
            className="icon-label"
          />
          <div className="row-container">
            <div style={{ color: "white" }}>{alpha}</div>
            <input
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={alpha}
              aria-label="change typingsound volume"
              onChange={handleBackgroundAlphaChange}
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
      </div>

      <div className="setting-menu" onClick={handleTypingMenuClick}>
        <FaAngleRight
          className={`setting-arrow ${typingIsOpen ? "rotate" : ""}`}
          size={28}
        />
        <h1 className="test">
          <strong>Typing Style</strong>
        </h1>
      </div>
      <div className={`menu-content ${typingIsOpen ? "open" : ""}`}>
        <div className="section">
          <IconLabel
            icon={FaVolumeUp}
            labelText="커스텀 타자화면"
            description="타자연습 시, 사용할 타자화면을 변경합니다."
          />
          <Buttons
            options={typingStyleOptions}
            isFlag={typingStyle}
            callback={handleTypingStyleClick}
          />
        </div>
      </div>
    </div>
  );
}

function Buttons({ options, isFlag, callback }) {
  return (
    <div className="buttons">
      {options.map(({ key, label }) => (
        <button
          className={`single-button ${isFlag === key ? "active" : ""}`}
          onClick={() => callback(key)}
          data-theme={key}
          key={key}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default Settings;
