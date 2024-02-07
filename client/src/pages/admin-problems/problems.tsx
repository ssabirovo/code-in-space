import Icon from "../../assets/icons/icons";
import Input from "../../components/input/input";
import Sidebar from "../../components/sidebar/sidebar";
import { useNavigate } from "react-router-dom";
import { problemsList } from "./inside";
import BasicModal from "./modalContent/content";
import Button2 from "../../components/button2/button2";
import cls from "./problems.module.scss";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { log } from "console";

function Problems() {
  const navigate = useNavigate();
  const form = useForm();
  const { register, control } = form;

  return (
    <div className={cls.wrapper}>
      <Sidebar />
      <div className={cls.content}>
        <div className={cls.header}>
          <form className={cls.search}>
            <Input
              placeholder="Problem title"
              type="searchInput"
              register={register("searchInput")}
            />
            <button type="submit">
              <Icon name="Search" size={30} />
            </button>
          </form>
          <DevTool control={control} />

          <Button2
            onClick={() => navigate(`/admin/addProblem`)}
            className={cls.addBtn}
          >
            Add
          </Button2>
        </div>

        <table className={cls.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th className={cls.actions}>Action</th>
            </tr>
          </thead>
          <tbody>
            {problemsList.map(({ category, title }) => (
              <tr
                key={title}
                className={cls.tr}
                // onClick={() => navigate(`/${category}/${title}`)}
              >
                <td>{title}</td>
                <td>{category}</td>
                <td className={cls.actions}>
                  <Icon
                    className={cls.pen}
                    name="Pen"
                    size={10}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <BasicModal
                    Button={
                      <Icon className={cls.trash} name="Trash" size={10} />
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Problems;
