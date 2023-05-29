import React from "react";
import Navbar from "../../components/navbar/navbar";
import cls from "./question.module.scss";
import Icon from "../../assets/icons/icons";
import { useNavigate, useParams } from "react-router-dom";
import CodeEditor from "@uiw/react-textarea-code-editor";

interface MainProps {}

const Question: React.FC<MainProps> = () => {
  const navigate = useNavigate();
  const { question, questions } = useParams();
  const values = `function ${question} (a) {\n  return "";\n}`;

  console.log(question, questions);

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
            <div className={cls.address}>
              <p
                className={cls.questions}
                onClick={() => navigate(`/${questions}`)}
              >
                {questions}
              </p>
              <i className="fa-solid fa-caret-right"></i>
              <p>{question}</p>
            </div>
            <p>
              Given a string name, e.g. "Bob", return a greeting of the form
              "Hello Bob!".
            </p>
            <div className={cls.examples}>
              <p> helloName("Bob") → "Hello Bob!"</p>
              <p>helloName("Bob") → "Hello Bob!"</p>
              <p>helloName("Bob") → "Hello Bob!"</p>
            </div>
            <button className={cls.solve}>Run</button>
            <div className={cls.coding}>
              <CodeEditor
                className={cls.textarea}
                language="js"
                data-color-mode="dark"
                value={values}
                padding={20}
              />
              <table className={cls.table}>
                <thead>
                  <th>Test -Expected</th>
                  <th>Yours</th>
                </thead>
                <tr>
                  <td>monkeyTrouble(true, true) → true</td>
                  <td className={cls.iconRight}>
                    true {<i className="fa-solid fa-check"></i>}
                  </td>
                </tr>
                <tr>
                  <td>doubleChar("Hi-There") → "HHii--TThheerree"</td>
                  <td className={cls.iconWrong}>
                    HHii--TThheerree{" "}
                    {<i className="fa-solid fa-check iconWrong"></i>}
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Question;
