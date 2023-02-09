import "./assets/base.scss";
import { Route, Switch, Redirect } from "react-router-dom";

import Main from "./pages/main/main";
import MoreProjects from "./pages/more-projects/more-projects";

function App() {
  return (
    <>
      <Switch>
        <Route exact path={"/"} render={(props) => <Main {...props} />} />
        <Route
          exact
          path={"/projects"}
          render={(props) => <MoreProjects {...props} />}
        />
      </Switch>
    </>
  );
}

export default App;
