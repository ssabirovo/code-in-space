import React from "react";
import cx from "classnames";
import cls from "./button2.module.scss";

interface ButtonProps {
  content: string;
  onClick?: () => void;
  className?: string;
}

const Button2: React.FC<ButtonProps> = ({ content, onClick, className }) => {
  return (
    <button onClick={onClick} className={cx(cls.button, className)}>
      {content}
    </button>
  );
};

export default Button2;
