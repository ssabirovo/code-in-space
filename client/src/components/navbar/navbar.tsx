import React from "react";
import cls from "./navbar.module.scss";
import Logo from "../../assets/svg/Group 1.svg";
import Button from "../button/button";

interface NavProps {}

const Navbar: React.FC<NavProps> = () => (
  <div className={cls.navbar}>
    <img src={Logo} alt="" className={cls.logo} />
    <div className={cls.auth}>
      <Button planet="GreenPlanet" content="Sign Up" />
      <div className={cls.devider}></div>
      <Button content="Sign In" planet="YellowPlanet" />
    </div>
  </div>
);

export default Navbar;
