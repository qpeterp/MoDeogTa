import React from "react";
import PropTypes from "prop-types";

function IconButton({ icon, label, onClick }) {
  return (
    <button onClick={onClick} className="reset-button">
      {icon && (
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </span>
      )}
      {label && <span>{label}</span>}
    </button>
  );
}

IconButton.propTypes = {
  icon: PropTypes.element, // React 요소로 아이콘을 전달
  label: PropTypes.string, // 텍스트 레이블
  onClick: PropTypes.func.isRequired,
};

export default IconButton;
