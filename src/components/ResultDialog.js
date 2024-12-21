import React, { useState } from "react";
import PropTypes from "prop-types";

function ResultDialog({ accuracy, speed, onClose }) {
  const [animationClass, setAnimationClass] = useState("dialog-enter");

  const handleClose = () => {
    setAnimationClass("dialog-exit"); // exit 애니메이션 설정
    setTimeout(onClose, 300); // 애니메이션 종료 후 onClose 호출
  };

  return (
    <div
      className={`result-dialog ${animationClass}`}
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#202020",
        borderRadius: "10px",
        paddingLeft: "20vw",
        paddingRight: "20vw",
        paddingTop: "20px",
        paddingBottom: "20px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        zIndex: 1000,
      }}
    >
      <h1 className="hint-text">결과</h1>
      <p className="hint-text">
        정확도: <strong>{accuracy}%</strong>
      </p>
      <p className="hint-text">
        타수: <strong>{speed}</strong>
      </p>
      <button
        onClick={handleClose}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
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
