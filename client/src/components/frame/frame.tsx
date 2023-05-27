import React from "react";
import Icon from "../../assets/icons/icons";
import cx from "classnames";
import cls from "./frame.module.scss";

interface NavProps {
  children?: JSX.Element[] | JSX.Element;
  className?: string;
  onClick?: (e?: React.MouseEvent<HTMLDivElement>) => void;
}

const Frame: React.FC<NavProps> = ({ children, className, onClick }) => {
  return (
    <div className={cx(cls.wrapper, className)} onClick={onClick}>
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
