import React from "react";
import Card from "../../assets/icons/List/card";
import Icons from "../../assets/icons";
import cls from "./sidebar.module.scss";
import { Links } from "./inside";

interface AboutMeProps {}

const AboutMe: React.FC<AboutMeProps> = () => (
  <div className={cls.wrapper}>
    {Links.map(({ link, iconName }) => (
      <a href={link}>{<Icons name={iconName} />}</a>
    ))}
  </div>
);

export default AboutMe;
