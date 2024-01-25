import React from "react";
import cx from "classnames";
import cls from "./button2.module.scss";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button2: React.FC<ButtonProps> = (props) => {
  const { children, className } = props;
  return (
    <button {...props} className={cx(cls.button, className)}>
      {children}
    </button>
  );
};

export default Button2;
