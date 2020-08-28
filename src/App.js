import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Products from "./Products";
import Product from "./Product";
import shoeList from "./dummyAPI";
import "./App.css";

function App() {
  const [reviews, setReviews] = useState([]);
  const addReview = (newReview) => {
    setReviews([...reviews, newReview]);
  };

  return (
    <Router>
      <Switch>
        <Route path="/home" exact>
          <Products shoeList={shoeList} reviews={reviews} />
        </Route>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/:id">
          <Product
            shoeList={shoeList}
            reviews={reviews}
            addReview={addReview}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
