import React from "react";
import ReactStars from "react-rating-stars-component";
import {
  Button,
  Typography,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Grid,
} from "@material-ui/core/";
import { Link } from "react-router-dom";
import { StarsContainer, StyledHeader, TotalReviewsContainer } from "./styled";
function Products({ shoeList, averageStarCalculator }) {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <StyledHeader>Shoes</StyledHeader>
        </Grid>
        <Grid item xs={12}>
          <Grid container justify="space-around">
            {shoeList &&
              shoeList.map((shoe) => (
                <Grid key={shoe.name} item>
                  <Link to={`/${shoe.id}`}>
                    <Card className="card">
                      <CardHeader title={shoe.name} subheader={shoe.subtitle} />
                      <CardMedia
                        className="media"
                        image={shoe.img}
                        title={shoe.name}
                      />
                      <CardContent className="content">
                        <Typography variant="body1" color="textPrimary">
                          {shoe.price}
                        </Typography>
                        <StarsContainer>
                          <ReactStars
                            count={5}
                            edit={false}
                            isHalf={true}
                            value={averageStarCalculator(shoe.id).averageRate}
                            size={37}
                            activeColor="#ffd700"
                          />
                          <TotalReviewsContainer>
                            ({averageStarCalculator(shoe.id).totalReviews})
                          </TotalReviewsContainer>
                        </StarsContainer>
                      </CardContent>
                      <CardActions disableSpacing className="actions">
                        <Button
                          fullWidth
                          variant="contained"
                          size="medium"
                          color="primary"
                        >
                          Details
                        </Button>
                      </CardActions>
                    </Card>
                  </Link>
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Products;
