import React from "react";
import Navbar from "../../components/navbar/navbar";
import cls from "./main.module.scss";
import Button from "../../components/button/button";
import Card from "./components/card/card";
import { cardData } from "./mainInside";

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
    <div className={cls.questions}>
      <div className={cls.buttons}>
        <Button active planet="Sun" content="JavaScript" />
        <Button planet="BluePlanet" content="Java" />
      </div>
      <div className={cls.cards}>
        {cardData.map(({ title, description }) => (
          <Card key={title} title={title} description={description} />
        ))}
      </div>
    </div>
  </div>
);

export default Main;
