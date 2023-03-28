import "./assets/base.scss";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/main/main";
import { Suspense } from "react";

function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </Suspense>
  );
}

export default App;
