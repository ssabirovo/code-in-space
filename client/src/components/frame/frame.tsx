import React, { Children } from "react";
import cls from "./frame.module.scss";
import Icon from "../../assets/icons/icons";

interface NavProps {
  children?: JSX.Element;
}

const Frame: React.FC<NavProps> = ({ children }) => {
  return (
    <div className={cls.wrapper}>
      <div className={cls.none}>1</div>
      <div className={cls.container}>
        <div className={cls.nav}>
          <Icon name="RedPlanet" />
          <Icon name="YellowPlanet" />
          <Icon name="GreenPlanet" />
        </div>
        <div className={cls.content}>{children}</div>
      </div>
    </div>
  );
};

export default Frame;
