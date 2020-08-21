import React, { useState } from "react";
import { Avatar, Button, Grid, Paper, Typography } from "@material-ui/core/";
import ReactStars from "react-rating-stars-component";
import { Link, useParams } from "react-router-dom";
import RateReview from "./component/RateReview";

import {
  AvatarContainer,
  Divider,
  RateAndReview,
  ReviewsContainer,
  SizedImage,
  StarsContainer,
  StyledHeader,
  TotalReviewsContainer,
} from "./styled";

function Product({ shoeList, reviews, addReview, averageStarCalculator }) {
  const { id } = useParams();
  const [openReview, setOpenReview] = useState(false);
  const selectedShoe = shoeList.find((shoe) => {
    return shoe.id === +id;
  });
  const productReviews = reviews.filter((review) => review.productId === +id);
  const sendReview = (newReview) => {
    addReview(newReview);
  };
  return (
    <>
      <Grid container spacing={4} justify="center" alignItems="flex-end">
        <Grid item xs={8}>
          <StyledHeader secondary> Review the Product</StyledHeader>
        </Grid>
        <Grid item container xs={12} direction="row" justify="space-around">
          <Grid item container md={2} xs={1} justify="flex-end">
            <Link to={"/home"}>
              <Button
                variant="outlined"
                size="medium"
                color="secondary"
                onClick={() => setOpenReview(false)}
              >
                Home
              </Button>
            </Link>
          </Grid>
          <Grid item container md={5} xs={11} justify="center">
            <SizedImage src={selectedShoe.img} alt={selectedShoe.name} />
          </Grid>
          <Grid
            item
            container
            md={5}
            xs={12}
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            <div>
              <Typography variant="h4" gutterBottom color="primary">
                {selectedShoe.name}
              </Typography>
              <Typography variant="h5" gutterBottom color="textSecondary">
                {selectedShoe.subtitle}
              </Typography>
              <Typography variant="body1" color="textPrimary">
                {selectedShoe.price}
              </Typography>
              <StarsContainer>
                <ReactStars
                  count={5}
                  edit={false}
                  isHalf={true}
                  value={averageStarCalculator(id).averageRate}
                  size={37}
                  activeColor="#ffd700"
                />
                <TotalReviewsContainer>
                  ({averageStarCalculator(id).totalReviews})
                </TotalReviewsContainer>
              </StarsContainer>
              <a href="#rate">
                <Button
                  fullWidth
                  variant="contained"
                  size="medium"
                  color="primary"
                  onClick={() => setOpenReview(true)}
                >
                  Write a Costumer Review
                </Button>
              </a>
            </div>
            <ReviewsContainer>
              <Typography variant="h5" gutterBottom color="textPrimary">
                Costumer Reviews
              </Typography>
              <Divider />
              {productReviews.length > 0 ? (
                productReviews.map((review) => (
                  <Paper className="paper" key={review.reviewId}>
                    <AvatarContainer>
                      <Avatar src="/broken-image.jpg" />
                      <span>{review.name}</span>
                    </AvatarContainer>

                    <ReactStars
                      count={5}
                      edit={false}
                      isHalf={true}
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
            </ReviewsContainer>
          </Grid>
          <Grid item container md={8} xs={12} justify="center">
            <RateAndReview openReview={openReview} id="rate">
              <Button
                className="buttonGoProduct"
                variant="outlined"
                size="medium"
                color="secondary"
                onClick={() => setOpenReview(false)}
              >
                Go Product
              </Button>
              <Typography variant="h4" gutterBottom color="primary">
                Review this product
              </Typography>
              <Typography variant="h5" gutterBottom color="textSecondary">
                Share your thoughts with other customers
              </Typography>
              <RateReview
                sendReview={sendReview}
                id={id}
                setOpenReview={setOpenReview}
              />
            </RateAndReview>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Product;
