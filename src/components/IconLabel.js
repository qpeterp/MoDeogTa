import React from "react";

function IconLabel({ icon: Icon, labelText, description }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Icon size={20} color="#747474" />
        <p className="setting-label">{labelText}</p>
      </div>
      <p className="setting-description">{description}</p>
    </div>
  );
}

export default IconLabel;
