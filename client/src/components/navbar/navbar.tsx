import React from "react";
import cls from "./navbar.module.scss";
import Logo from "../../assets/svg/Group 1.svg";
import Button from "../button/button";
import { useNavigate } from "react-router-dom";

interface NavProps {}

const Navbar: React.FC<NavProps> = () => {
  const navigate = useNavigate();
  return (
    <div className={cls.navbar}>
      <img
        onClick={() => navigate("/")}
        src={Logo}
        alt=""
        className={cls.logo}
      />
      <div className={cls.auth}>
        <Button onClick={()=>navigate("/signIn")} content="Login" planet="YellowPlanet" />
      </div>
    </div>
  );
};

export default Navbar;
