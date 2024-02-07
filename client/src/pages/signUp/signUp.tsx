import React, { useState } from "react";
import Frame from "../../components/frame/frame";
import Logo from "../../assets/svg/Group 1.svg";
import { useNavigate } from "react-router-dom";
import Input from "../../components/input/input";
import Button2 from "../../components/button2/button2";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import signUpData from "./inside";
import cls from "./signUp.module.scss";
import useAuth from "../../hooks/useAuth";
import { axios } from "../../config/axios";
import { wait } from "@testing-library/user-event/dist/utils";
import { log } from "console";

export type FormValues = {
  email?: string;
  code?: string;
  password?: string;
};

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const form = useForm<FormValues>();
  const {} = useAuth();
  const { register, control, handleSubmit } = form;
  const [section, setSection] = useState<keyof typeof signUpData>("email");
  const { name, placeholder, title, type, registerName } = signUpData[section];

  const sendUser = async (email: string, password: string) => {
    let res = await axios.post("auth/register", { password, email });

    document.cookie = "";

    if (res.status === 200) {
      // return res.data.tokens.accessToken;
      return res.data.tokens.accessToken;
    }
  };

  const sendCode = async (code: string, token: "") => {
    let res = await axios.post(
      "auth/code/validate",
      { code },
      {
        headers: {
          Authorization: "Bearer",
        },
      }
    );
  };

  const onSubmit = (data: FormValues) => {
    switch (section) {
      case "email":
        console.log("email", data);
        setSection("password");
        break;
      case "password":
        console.log("password", data);
        sendUser(data.email, data.password);
        setSection("code");
        break;
      case "code":
        console.log("code", data);
        // sendCode()
        break;
      default:
        break;
    }
  };

  return (
    <div className={cls.wrapper}>
      <Frame className={cls.frame}>
        <div className={cls.content}>
          <img onClick={() => navigate("/")} src={Logo} alt="" />
          <form onSubmit={handleSubmit(onSubmit)} className={cls.form}>
            <div className="animate__animated animate__fadeInDown ">
              <h3>{title}</h3>
              <Input
                defaultValue={""}
                className={cls.input}
                placeholder={placeholder}
                type={type}
                name={name}
                register={register(registerName)}
              />
            </div>

            <Button2 type="submit">Sign up</Button2>
          </form>
          <DevTool control={control} placement="top-left" />

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
