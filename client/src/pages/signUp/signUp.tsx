import React from "react";
import Frame from "../../components/frame/frame";
import Logo from "../../assets/svg/Group 1.svg";
import { useNavigate } from "react-router-dom";
import Input from "../../components/input/input";
import Button2 from "../../components/button2/button2";
import cls from "./signUp.module.scss";

interface MainProps {}

const SignUp: React.FC<MainProps> = () => {
  const navigate = useNavigate();

  return (
    <div className={cls.wrapper}>
      <Frame className={cls.frame}>
        <div className={cls.content}>
          <img onClick={() => navigate("/")} src={Logo} alt="" />
          <div className={cls.form}>
            <h3>Sign up to C I S</h3>
            <Input placeholder="Email" name="email" type="email" />
            <Button2 content="Sign up" />
          </div>
          <span className="d-flex gap-2">
            <b>Already have an account?{"  "} </b>
            <p onClick={() => navigate("/signIn")}> Sign in</p>
          </span>
        </div>
      </Frame>
    </div>
  );
};

export default SignUp;
