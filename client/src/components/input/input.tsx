import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import cx from "classnames";
import cls from "./input.module.scss";

interface InpitProps extends React.InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegisterReturn;
}

const Input: React.FC<InpitProps> = (props) => {
  const { className, register } = props;
  return (
    <input {...props} className={cx(cls.wrapper, className)} {...register} />
  );
};

export default Input;
