import Icon from "../../assets/icons/icons";
import cls from "./sidebar.module.scss";
import cx from "classnames";

function Sidebar() {
  return (
    <div className={cls.wrapper}>
      <div className={cls.navbar}>
        <Icon name="RedPlanet" />
        <Icon name="YellowPlanet" />
        <Icon name="GreenPlanet" />
      </div>
      <div className={cls.content}>
        <div className={cx(cls.btn, cls["btn-active"])}>
          <i className="fa-solid fa-list-ul"></i>
          <p>Problems</p>
        </div>
        <div className={cls.btn}>
          <i className="fa-solid fa-list-ul"></i>
          <p>Problems</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
