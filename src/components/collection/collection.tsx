import React from "react";
import Card from "../card";
import cls from "./collection.module.scss";

import html from "../../assets/svg/html.svg";
import css from "../../assets/svg/css.svg";
import js from "../../assets/svg/js.svg";
import ts from "../../assets/svg/ts.svg";
import react from "../../assets/svg/react.svg";
import bootstrap from "../../assets/svg/bootstrap.svg";
import ant from "../../assets/svg/ant.svg";
import git from "../../assets/svg/git.svg";
import { data } from "../../pages/more-projects/inside";
import { type } from "os";

const images = { html, css, js, ts, react, bootstrap, ant, git };



interface IProjects {
  bgColor: string;
  color: string;
  title: string;
  imgUrl: string;
  borderColor: string;
}

interface CollectionProps {
  technologies: (keyof typeof images)[];
  projects: IProjects;
}

const Collection: React.FC<CollectionProps> = ({ projects, technologies }) => (
  <div className={cls.wrapper}>
    <div className={cls.technologies}>
      {technologies.map((item) => (
        <img key={item} src={images[item]} alt={item} />
      ))}
    </div>
    <div className={cls.projects}>
      {data.map(({ bgColor, color, title, borderColor, imgUrl }, idx) => (
        <Card
          bgColor={bgColor}
          color={color}
          title={title}
          imgUrl={imgUrl}
          borderColor={borderColor}
        />
      ))}
    </div>
  </div>
);

export default Collection;
