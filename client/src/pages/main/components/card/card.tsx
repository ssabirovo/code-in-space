import React from "react";
import cls from "./card.module.scss";
import Icon from "../../../../assets/icons/icons";
import { useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface CardProps {
  title: string;
  description: string;
  onClick?: () => void;
}

export const bgColorsData = [
  "--card-shadow-none",
  "--card-shadow-blue",
  "--card-shadow-red",
  "--card-shadow-yellow",
  "--card-shadow-green",
  "--card-shadow-purple",
  "--card-shadow-pink",
];

const Card: React.FC<CardProps> = ({ title, description, onClick }) => {
  const [color, setColor] = useState<number>(0);
  const navigate = useNavigate();

  const handleMouse: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    let random = Math.floor(Math.random() * bgColorsData.length);
    setColor(random !== 0 ? random : 1);
  };

  return (
    <div
      onClick={() => navigate(`/${title}`)}
      style={{
        boxShadow: `0px 0px 34px var(${bgColorsData[color]})`,
      }}
      className={cls.card}
      onMouseEnter={(e) => handleMouse(e)}
      onMouseLeave={() => {
        setColor(0);
      }}
    >
      <div className={cls.nav}>
        <Icon name="RedPlanet" />
        <Icon name="YellowPlanet" />
        <Icon name="GreenPlanet" />
      </div>
      <div className={cls.content}>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Card;
