import React from "react";
import Navbar from "../../components/navbar/navbar";
import Icon from "../../assets/icons/icons";
import { questionsData } from "./questionsData";
import { useNavigate, useParams } from "react-router-dom";
import cls from "./questions.module.scss";

interface MainProps {}

const Questions: React.FC<MainProps> = () => {
  const navigate = useNavigate();
  const { questions } = useParams();

  return (
    <>
      <Navbar />
      <div className={cls.wrapper}>
        <div className={cls.none}>1</div>
        <div className={cls.container}>
          <div className={cls.nav}>
            <Icon name="RedPlanet" />
            <Icon name="YellowPlanet" />
            <Icon name="GreenPlanet" />
          </div>
          <div className={cls.content}>
            <h3 className={cls.title}>{questions}</h3>
            <p className={cls.description}>
              Simple warmup problems to get started
            </p>
            <div className={cls.questions}>
              {questionsData.map(({ title, checked }) => (
                <p onClick={() => navigate(`/${questions}/${title}`)}>
                  {title}
                  {checked && <i className="fa-solid fa-check"></i>}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Questions;
