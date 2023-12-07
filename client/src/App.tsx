import { Route, Routes } from "react-router-dom";
import Main from "./pages/main/main";
import Questions from "./pages/questions/questions";
import Question from "./pages/question/question";
import Workshop from "./pages/workshop/workshop";
import SignUp from "./pages/signUp/signUp";
import SignIn from "./pages/signIn/signIn";
import useAuth from "./hooks/useAuth";
import Problems from "./pages/admin-problems/problems";
import "./assets/base.scss";
import AddProblem from "./pages/addProblem/addProblem";

function App(): JSX.Element {
  const { user, loading } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/:questions" element={<Questions />} />
      <Route path="/:questions/:question" element={<Question />} />
      <Route path="/workshop" element={<Workshop />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/admin/problems" element={<Problems />} />
      <Route path="/admin/addProblem" element={<AddProblem />} />
    </Routes>
  );
}

export default App;
