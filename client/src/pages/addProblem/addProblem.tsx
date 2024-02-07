import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Sidebar from "../../components/sidebar/sidebar";
import cx from "classnames";
import { casesData, inputsData } from "./inside";
import { useState } from "react";
import Icon from "../../assets/icons/icons";
import "animate.css";
import cls from "./addProblem.module.scss";
import Button2 from "../../components/button2/button2";

const AddProblem = () => {
  const [cases, setCases] = useState(casesData);

  function handleAction(action: "+" | "-", id?: number) {
    switch (action) {
      case "+":
        setCases((cases) => [
          ...cases,
          { input: "", output: "", id: Math.random() },
        ]);
        break;
      case "-":
        setCases((cases) => [...cases.filter((item, itemId) => itemId !== id)]);
        break;
    }
  }

  return (
    <div className={cls.wrapper}>
      <Sidebar />
      <div className={cls.content}>
        <h2>Add Problem</h2>
        <form>
          {inputsData.map(({ label, isSelect }) =>
            !isSelect ? (
              <TextField
                key={label}
                className={cx(
                  cls.input,
                  "animate__animated animate__fadeInDown"
                )}
                id="outlined-basic"
                label={label}
                variant="outlined"
              />
            ) : (
              <FormControl
                key={label}
                fullWidth
                className={cx(
                  cls.input,
                  "animate__animated animate__fadeInDown"
                )}
              >
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label={label}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            )
          )}

          {cases.map(({ input, output, id }, i) => (
            <div
              className={cx(cls.case, "animate__animated animate__fadeInDown")}
              key={`${id}`}
            >
              <div className={cls.title}>
                <p>Case {i + 1}</p>
                <Icon
                  name="Minus"
                  size={24}
                  onClick={() => handleAction("-", i)}
                />
              </div>
              <div className={cls.cases}>
                <TextField
                  className={cx(cls.input, cls.inputCase)}
                  id="outlined-basic"
                  label={"Input"}
                  variant="outlined"
                  defaultValue={input}
                />
                <TextField
                  className={cx(cls.input, cls.inputCase)}
                  id="outlined-basic"
                  label={"Output"}
                  variant="outlined"
                  defaultValue={output}
                />
              </div>
            </div>
          ))}

          <Button2 type="button" onClick={() => handleAction("+")}>
            Add case
          </Button2>
        </form>
      </div>
    </div>
  );
};

export default AddProblem;
