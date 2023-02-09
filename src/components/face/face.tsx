import React from "react";
import Photo from "../../assets/images/face.png";
import cls from "./nav.module.scss";

interface NavProps {}

const Face: React.FC<NavProps> = () => (
  <div className={cls.face}>
    <img src="https://files.fm/thumb_show.php?i=4qt9g49rf" alt="" />
  </div>
);

export default Face;
