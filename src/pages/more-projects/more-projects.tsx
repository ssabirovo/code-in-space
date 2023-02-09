import React from "react";
import cls from "./more-projects.module.scss";
import Logo from "../../assets/svg/logo.svg";
import { Collection, Links, Sidebar } from "../../components";
import { data } from "./inside";

interface MainProps {}

const MoreProjects: React.FC<MainProps> = () => {
  return (
    <div className={cls.main}>
      <Sidebar />
      <div className={cls.middle}>
        <div className={cls.rerr}>
          {data.map((item) => (
            <div className={cls.section}>
              <Collection projects={item} technologies={["ts"]} />
            </div>
          ))}
        </div>
      </div>
      <Links />
    </div>
  );
};

export default MoreProjects;
