import { Route, Routes } from "react-router-dom";
import Main from "./pages/main/main";
import { Suspense } from "react";
import "./assets/base.scss";
import Questions from "./pages/questions/questions";
import Question from "./pages/question/question";

function App(): JSX.Element {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/:questions" element={<Questions />} />
        <Route path="/:questions/:question" element={<Question />} />
      </Routes>
    </Suspense>
  );
}

export default App;
