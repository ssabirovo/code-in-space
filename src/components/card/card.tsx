import React from "react";
import cls from "./card.module.scss";
import ima from "../../assets/images/screenshot.png";

interface CardProps {
  imgUrl: string;
  title: string;
  bgColor: string;
  color: string;
  borderColor: string;
}

const Card: React.FC<CardProps> = ({
  imgUrl,
  title,
  bgColor,
  color,
  borderColor,
}) => (
  <div
    style={{ backgroundColor: bgColor, border: `1px solid borderColor` }}
    className={cls.wrapper}
  >
    <div>
      <img src={imgUrl} alt="" />
      <p style={{ color: color }} className={cls.title}>
        {title}
      </p>
    </div>
    <div className={cls.hover}>
      <h3>Technology</h3>
    </div>
  </div>
);

export default Card;
