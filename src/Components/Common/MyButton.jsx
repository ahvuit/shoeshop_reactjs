import React from "react";
import { Button } from "antd";

function MyButton(props) {
  const { type, size, onClick, disabled, children, bgColor, color } = props;
  return (
    <Button
      style={{ background: bgColor, color: color }}
      type={type}
      size={size}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
}

export default MyButton;
