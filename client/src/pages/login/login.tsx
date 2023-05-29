import React from "react";
import Frame from "../../components/frame/frame";
import cls from "./login.module.scss";
import Logo from "../../assets/svg/Group 1.svg";
import { useNavigate } from "react-router-dom";

interface MainProps {}

const Login: React.FC<MainProps> = () => {
  const navigate = useNavigate();

  return (
    <div className={cls.wrapper}>
      <Frame className={cls.frame}>
        <div className={cls.content}>
          <img onClick={() => navigate("/")} src={Logo} alt="" />
          <div className={cls.form}>
            <h3>Login to C I S</h3>
            <input name="email" type="email" placeholder="Email" />
            <button>Sign in</button>
          </div>
          <span className="d-flex gap-2">
            <b>Already have an account?{"  "} </b>
            <p onClick={() => navigate("/")}> Sign Up</p>
          </span>
        </div>
      </Frame>
    </div>
  );
};

export default Login;
