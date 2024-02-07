import React from "react";
import Frame from "../../components/frame/frame";
import Logo from "../../assets/svg/Group 1.svg";
import { useNavigate } from "react-router-dom";
import Input from "../../components/input/input";
import Button2 from "../../components/button2/button2";
import cls from "./signIn.module.scss";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

interface MainProps {}

const SignIn: React.FC<MainProps> = () => {
  const navigate = useNavigate();
  const form = useForm();
  const { register, control } = form;

  return (
    <div className={cls.wrapper}>
      <Frame className={cls.frame}>
        <div className={cls.content}>
          <img onClick={() => navigate("/")} src={Logo} alt="" />
          <form className={cls.form}>
            <h3>Sign in to C I S</h3>
            <Input
              placeholder="Email"
              name="email"
              type="email"
              register={register("email")}
            />
            <Input
              placeholder="Password"
              name="password"
              type="password"
              register={register("password")}
            />
            <Button2>Sign in</Button2>
          </form>
          <DevTool control={control} />
          <span className="d-flex gap-2">
            <b>New to C I S? </b>
            <p onClick={() => navigate("/signUp")}> Create an account.</p>
          </span>
        </div>
      </Frame>
    </div>
  );
};

export default SignIn;
