import { Route, Routes } from "react-router-dom";
import Main from "./pages/main/main";
import { Suspense } from "react";
import "./assets/base.scss";

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
