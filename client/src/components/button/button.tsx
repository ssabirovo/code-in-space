import React, { useState } from "react";
import Icons from "../../assets/icons";
import cls from "./button.module.scss";
import cx from "classnames";
import * as List from "../../assets/icons/List";

interface ButtonProps {
  content: string;
  onClick?: () => void;
  planet: keyof typeof List;
  className?: string;
  active?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  content,
  onClick,
  planet,
  className,
  active,
}) => {
  return (
    <div
      onClick={onClick}
      className={cx(cls.button, `${active && cls.active}`, className)}
    >
      <p>{content}</p>
      <Icons name={planet} />
    </div>
  );
};

export default Button;
