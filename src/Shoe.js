import React, { useState } from "react";
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
import { v4 as uuidv4 } from "uuid";

import Modal from "./component/Modal";

function Shoe({ shoes, setShoes }) {
  let { id } = useParams();
  let history = useHistory();

  const [newComment, newSetComment] = useState("");
  const [newStar, newSetStar] = useState("");
  const [open, setOpen] = React.useState(false);
  const [userName, setUserName] = useState("");
  const [selectedShoe, setSelectedShoe] = useState(
    shoes.find((shoe) => {
      return shoe.id === +id;
    })
  );
  const [averageStarNumb, setAverageStarNumb] = useState(
    selectedShoe.averageStar
  );

  const ratingChanged = (newRating) => {
    setOpen(true);
    newSetStar(newRating);
  };
  const averageStar = (selectedShoe) => {
    let totalStar = 0;
    selectedShoe.map((review) => {
      return (totalStar += review.star);
    });
    setAverageStarNumb(Math.round(totalStar / selectedShoe.length));
    return Math.round(totalStar / selectedShoe.length);
  };
  const sendReview = () => {
    const newReview = {
      id: uuidv4(),
      name: userName,
      comment: newComment,
      star: newStar,
      time: new Date(),
    };
    newSetComment("");

    let reviewedShoe = { ...selectedShoe };
    reviewedShoe.reviews.push(newReview);
    reviewedShoe.averageStar = averageStar(reviewedShoe.reviews);
    setSelectedShoe(reviewedShoe);
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
      <Modal open={open} setOpen={setOpen} setUserName={setUserName} />
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
            <div style={{ width: "90%", paddingRight: "50px" }}>
              <ReactStars
                count={5}
                value={averageStarNumb}
                onChange={ratingChanged}
                size={70}
                emptyIcon={<i className="far fa-star"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffd700"
              />
              <TextField
                id="outlined-full-width"
                label="Write a Costumer Review"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                variant="outlined"
                value={newComment}
                onChange={(e) => {
                  newSetComment(e.target.value);
                }}
              />
              <Button
                fullWidth
                variant="contained"
                size="medium"
                color="primary"
                onClick={sendReview}
              >
                Send Review
              </Button>
            </div>
            <div className="rewiews">
              {selectedShoe.reviews.map((review) => (
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
              ))}
            </div>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Shoe;
