import React, { useRef } from "react";
import Navbar from "../../components/navbar/navbar";
import Icon from "../../assets/icons/icons";
import { useNavigate, useParams } from "react-router-dom";
import ReactCodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { draculaInit } from "@uiw/codemirror-theme-dracula";
import cls from "./question.module.scss";

interface MainProps {}

let array = ["abc hi ho", "ABChi hi", "hihi"];

let newArr: any = [];

const Question: React.FC<MainProps> = () => {
  const navigate = useNavigate();
  const { question, questions } = useParams();
  const codeArea = useRef<HTMLTextAreaElement>(null);
  const values = `function ${question} (a) { \n return "";\n}\n`;

  const runCode = () => {
    try {
      let neaw: any = ["af", "afaf", "sfaf"];
      array.map((arr) => neaw.push(eval(`(${codeArea.current?.value})`)(arr)));

      newArr = neaw;
      console.log(newArr);
    } catch (error) {
      console.log(error);
    }
  };

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
            <button onClick={() => runCode()} className={cls.solve}>
              Run
            </button>
            <div className={cls.coding}>
              <div className={cls.textarea}>
                <ReactCodeMirror
                  height="100%"
                  value={values}
                  theme={draculaInit({
                    settings: {
                      background: "#1A2332",
                      gutterBackground: "#1A2332",
                      lineHighlight: "#1A2332",
                    },
                  })}
                  extensions={[javascript()]}
                />
              </div>

              <table className={cls.table}>
                <thead>
                  <tr>
                    <th>Test -Expected</th>
                    <th>Yours</th>
                  </tr>
                </thead>
                <tbody>
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
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Question;
