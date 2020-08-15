import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Products from "./Products";
import Shoe from "./Shoe";
import dummyAPI from "./dummyAPI";

import "./App.css";

function App() {
  const [shoes, setShoes] = useState(dummyAPI);
  return (
    <Router>
      <Switch>
        <Route path="/home" exact>
          <Products shoes={shoes} />
        </Route>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/:id">
          <Shoe shoes={shoes} setShoes={setShoes} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
