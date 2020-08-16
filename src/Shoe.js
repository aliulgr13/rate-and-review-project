import React, { useState } from "react";
import RateReview from "./component/RateReview";
import ReactStars from "react-rating-stars-component";
import {
  Button,
  Typography,
  Grid,
  TextField,
  Paper,
  Avatar,
} from "@material-ui/core/";
import { useParams, useHistory } from "react-router-dom";

function Shoe({ shoes, setShoes }) {
  let { id } = useParams();
  let history = useHistory();

  const [selectedShoe, setSelectedShoe] = useState(
    shoes.find((shoe) => {
      return shoe.id === +id;
    })
  );
  const averageStar = (selectedShoe) => {
    let totalStar = 0;
    selectedShoe.map((review) => {
      return (totalStar += review.star);
    });
    return Math.round(totalStar / selectedShoe.length);
  };
  const sendReview = (newReview) => {
    setSelectedShoe({
      ...selectedShoe,
      reviews: [...selectedShoe.reviews, newReview],
    });

    let newShoes = [...shoes];
    let ratedShoes = newShoes.map((shoe) => {
      if (shoe.id === +id) {
        shoe = selectedShoe;
      }
      return shoe;
    });
    setShoes(ratedShoes);
    console.log(selectedShoe);
    console.log(shoes);
  };

  function handleClick() {
    history.push("/home");
  }
  return (
    <>
      <Grid container spacing={4} justify="center" alignItems="flex-end">
        <Grid>
          <Button
            variant="outlined"
            size="medium"
            color="secondary"
            onClick={handleClick}
          >
            Home
          </Button>
        </Grid>
        <Grid item xs={8}>
          <Typography className="header" variant="h3" color="primary">
            {selectedShoe.name}
          </Typography>
          <Typography className="header" variant="h5" color="secondary">
            Review this product
          </Typography>
        </Grid>
        <Grid item container xs={12} direction="row" justify="space-around">
          <Grid item container md={6} xs={12} justify="center">
            <img
              className="shoeImg"
              src={selectedShoe.img}
              alt={selectedShoe.name}
            />
          </Grid>
          <Grid
            item
            container
            md={6}
            xs={12}
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            <RateReview selectedShoe={selectedShoe} sendReview={sendReview} />
            <div className="rewiews">
              {selectedShoe.reviews.length > 0 ? (
                selectedShoe.reviews.map((review) => (
                  <Paper
                    style={{ marginTop: "20px", padding: "10px" }}
                    key={review.id}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Avatar src="/broken-image.jpg" />
                      <span style={{ paddingLeft: "20px" }}>{review.name}</span>
                    </div>

                    <ReactStars
                      count={5}
                      edit={false}
                      value={review.star}
                      size={20}
                      activeColor="#ffd700"
                    />
                    <Typography variant="body2" color="textSecondary">
                      Reviewed on {review.time.toLocaleString()}
                    </Typography>
                    <Typography variant="h5">{review.comment}</Typography>
                  </Paper>
                ))
              ) : (
                <Typography variant="body2" color="textSecondary">
                  There is no review yet
                </Typography>
              )}
            </div>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Shoe;
