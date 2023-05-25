import { Route, Routes } from "react-router-dom";
import Main from "./pages/main/main";
import Questions from "./pages/questions/questions";
import Question from "./pages/question/question";
import Workshop from "./pages/workshop/workshop";
import "./assets/base.scss";

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/:questions" element={<Questions />} />
      <Route path="/:questions/:question" element={<Question />} />
      <Route path="/workshop" element={<Workshop />} />
    </Routes>
  );
}

export default App;
