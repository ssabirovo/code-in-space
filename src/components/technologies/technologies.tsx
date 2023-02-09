import React from "react";

import cls from "./technologies.module.scss";

import html from "../../assets/svg/html.svg";
import css from "../../assets/svg/css.svg";
import js from "../../assets/svg/js.svg";
import ts from "../../assets/svg/ts.svg";
import react from "../../assets/svg/react.svg";
import bootstrap from "../../assets/svg/bootstrap.svg";
import ant from "../../assets/svg/ant.svg";
import git from "../../assets/svg/git.svg";

interface TechnologiesItem {}

const items = [html, css, js, ts, react, bootstrap, ant, git];

const Technologies: React.FC<TechnologiesItem> = () => (
  <div className={cls.wrapper}>
    <div className={cls.technologies}>
      <div className={cls.title}>Technologies</div>
      <div className={cls["technology-box"]}>
        {items.map((item) => (
          <div className={cls.technology}>
            <img className={cls.img} src={item} alt="" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Technologies;
