import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

function ResultDialog({ speed, onClose }) {
  const [animationClass, setAnimationClass] = useState("dialog-enter");

  const handleClose = () => {
    setAnimationClass("dialog-exit"); // exit 애니메이션 설정
    setTimeout(onClose, 300); // 애니메이션 종료 후 onClose 호출
  };

  // Enter 키로 다이얼로그 닫기
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleClose();
    }
  };

  // 다이얼로그가 열리면 뒤의 요소와 상호작용을 막기 위해 포커스를 다이얼로그로만 제한
  useEffect(() => {
    // 다이얼로그 열리면 해당 다이얼로그 요소에 포커스를 주기
    const dialog = document.querySelector(".result-dialog");
    if (dialog) {
      dialog.focus();
    }
  }, []);

  return (
    <div
      className={`result-dialog ${animationClass}`}
      tabIndex={-1} // 다이얼로그 내부에서만 포커스가 가능하도록 설정
      onKeyDown={handleKeyDown} // 키보드 입력 처리
    >
      <p className="text">
        타수: <strong>{speed}</strong>
      </p>
      <button onClick={handleClose} className="dialog-button">
        닫기
      </button>
    </div>
  );
}

ResultDialog.propTypes = {
  accuracy: PropTypes.string.isRequired,
  speed: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ResultDialog;
