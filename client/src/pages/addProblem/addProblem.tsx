import Sidebar from "../../components/sidebar/sidebar";
import cls from "./addProblem.module.scss";

type Props = {};

const AddProblem = () => {
  return (
    <div className={cls.wrapper}>
      <Sidebar />
      <div className={cls.content}>
        <h2>Add Problem</h2>
        <div>
          <label htmlFor=""></label>
          <input type="text" />
        </div>
      </div>
    </div>
  );
};

export default AddProblem;
