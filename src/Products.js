import React from "react";
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
import Rating from "@material-ui/lab/Rating";
import { Link } from "react-router-dom";
import {
  StarsContainer,
  StyledHeader,
  TotalReviewsContainer,
  ButtonEditable,
} from "./styled";
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
                        <Typography
                          variant="body1"
                          color="textPrimary"
                          gutterBottom
                        >
                          {shoe.price}
                        </Typography>
                        <StarsContainer>
                          <Rating
                            value={averageStarCalculator(shoe.id).averageRate}
                            precision={0.5}
                            readOnly
                            size="large"
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
