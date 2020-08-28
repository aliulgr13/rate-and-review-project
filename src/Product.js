import React, { useState } from "react";
import { Avatar, Button, Grid, Paper, Typography } from "@material-ui/core/";
import Rating from "@material-ui/lab/Rating";
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
import { computeAverageStar } from "./utils/helpers";
import styled from "styled-components";

const StyledPaper = styled(Paper)`
  margin-top: 50px;
  padding: 50px;
`;

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
          <StyledHeader secondary>Product Details</StyledHeader>
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
                <Rating
                  value={computeAverageStar(productReviews)}
                  precision={0.5}
                  readOnly
                  size="large"
                />
                <TotalReviewsContainer>
                  ({productReviews.length})
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
                  <StyledPaper key={review.reviewId}>
                    <AvatarContainer>
                      <Avatar src="/broken-image.jpg" />
                      <span>{review.name}</span>
                    </AvatarContainer>
                    <Rating value={review.star} readOnly size="small" />
                    <Typography variant="body2" color="textSecondary">
                      Reviewed on {review.time.toLocaleString()}
                    </Typography>
                    <Typography variant="h5">{review.comment}</Typography>
                  </StyledPaper>
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
