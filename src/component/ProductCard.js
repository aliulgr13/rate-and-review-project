import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@material-ui/core/";
import { Link } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import React from "react";
import { StarsContainer, TotalReviewsContainer } from "../styled";
import { computeAverageStar } from "../utils/helpers";

function ProductCard({ shoe, reviews }) {
  const productReviews = reviews.filter(
    (review) => review.productId === shoe.id
  );

  return (
    <Card className="card">
      <CardHeader title={shoe.name} subheader={shoe.subtitle} />
      <CardMedia className="media" image={shoe.img} title={shoe.name} />
      <CardContent className="content">
        <Typography variant="body1" color="textPrimary" gutterBottom>
          {shoe.price}
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
      </CardContent>
      <Link to={`/${shoe.id}`}>
        <CardActions disableSpacing>
          <Button fullWidth variant="contained" size="medium" color="primary">
            Details
          </Button>
        </CardActions>
      </Link>
    </Card>
  );
}

export default ProductCard;
