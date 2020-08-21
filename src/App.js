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
  const averageStarCalculator = (id) => {
    const productReviews = reviews.filter((review) => review.productId === +id);
    const totalRates = productReviews.reduce((acc, cur) => {
      return acc + cur.star;
    }, 0);
    return {
      averageRate:
        productReviews.length === 0
          ? 0
          : Math.round((totalRates / productReviews.length) * 10) / 10,
      totalReviews: productReviews.length,
    };
  };
  const addReview = (newReview) => {
    setReviews([...reviews, newReview]);
  };

  return (
    <Router>
      <Switch>
        <Route path="/home" exact>
          <Products
            shoeList={shoeList}
            averageStarCalculator={averageStarCalculator}
          />
        </Route>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/:id">
          <Product
            averageStarCalculator={averageStarCalculator}
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
