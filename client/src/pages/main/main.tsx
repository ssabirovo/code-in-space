import React from "react";
import Navbar from "../../components/navbar/navbar";
import cls from "./main.module.scss";

interface MainProps {}

const Main: React.FC<MainProps> = () => (
  <div className={cls.main}>
    <Navbar />
    <div className={cls.header}>
      <div className={cls.title}>
        <h1>Let’s code in space</h1>
        <p>
          Created for learning. Designed with love. Made for improve knowledge.
          Welcome to the platform coders love
        </p>
      </div>
    </div>
  </div>
);

export default Main;
