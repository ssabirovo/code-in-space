import React from "react";
import cx from "classnames";
import cls from "./input.module.scss";

interface NavProps {
  placeholder?: string;
  className?: string;
  name?: string;
  type?: string;
}

const Input: React.FC<NavProps> = ({ placeholder, className, name, type }) => {
  return (
    <input
      type={type}
      name={name}
      className={cx(cls.wrapper, className)}
      placeholder={placeholder}
    />
  );
};

export default Input;
