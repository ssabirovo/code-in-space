import React, { useState } from "react";
import Icons from "../../assets/icons";
import cx from "classnames";
import * as List from "../../assets/icons/List";
import cls from "./button2.module.scss";

interface ButtonProps {
  content: string;
  onClick?: () => void;
  planet: keyof typeof List;
  className?: string;
  active?: boolean;
}

const Button2: React.FC<ButtonProps> = ({
  content,
  onClick,
  planet,
  className,
  active,
}) => {
  return (
    <button
      onClick={onClick}
      className={cx(cls.button, `${active && cls.active}`, className)}
    >
      {content}
    </button>
  );
};

export default Button2;
