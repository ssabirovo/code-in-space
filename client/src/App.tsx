import { Route, Routes } from "react-router-dom";
import Main from "./pages/main/main";
import Questions from "./pages/questions/questions";
import Question from "./pages/question/question";
import Workshop from "./pages/workshop/workshop";
import Login from "./pages/signUp/signUp";
import "./assets/base.scss";
import SignUp from "./pages/signUp/signUp";
import SignIn from "./pages/signIn/signIn";

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/:questions" element={<Questions />} />
      <Route path="/:questions/:question" element={<Question />} />
      <Route path="/workshop" element={<Workshop />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/signIn" element={<SignIn />} />
    </Routes>
  );
}

export default App;
