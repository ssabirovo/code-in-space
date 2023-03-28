import React from "react";
import cls from "./navbar.module.scss";
import Logo from "../../assets/svg/Group 1.svg";

interface NavProps {}

const Navbar: React.FC<NavProps> = () => (
  <div className={cls.navbar}>
    <img src={Logo} alt="" />
    <div className={cls.auth}>
      <p>Sign In</p>
      <div></div>
      <p>Sign Up</p>
    </div>
  </div>
);

export default Navbar;
