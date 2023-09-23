import Icon from "../../assets/icons/icons";
import Input from "../../components/input/input";
import Sidebar from "../../components/sidebar/sidebar";
import { useNavigate } from "react-router-dom";
import { problemsList } from "./inside";
import BasicModal from "./modalContent/content";
import cls from "./problems.module.scss";

function Problems() {
  const navigate = useNavigate();
  return (
    <div className={cls.wrapper}>
      <Sidebar />
      <div className={cls.content}>
        <div className={cls.header}>
          <div className={cls.search}>
            <Input placeholder="Problem title" />
            <div>
              <Icon name="Search" size={30} />
            </div>
          </div>
          <button onClick={() => navigate(`/main`)} className={cls.addBtn}>
            Add
          </button>
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
