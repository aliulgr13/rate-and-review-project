import React from "react";
import ReactStars from "react-rating-stars-component";

function StarRates({ rater, rating }) {
  return (
    <div className="stars">
      <ReactStars
        count={5}
        edit={false}
        value={rating}
        size={37}
        activeColor="#ffd700"
      />
      <span style={{ paddingTop: "5px" }}>({rater})</span>
    </div>
  );
}

export default StarRates;
