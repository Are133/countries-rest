import "./App.css";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Details from "./pages/Details";

function App() {
  return (
    <div className="header">
      <Switch>
        <Route path="/details">
          <Details />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
