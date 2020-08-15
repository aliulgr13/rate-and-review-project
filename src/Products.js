import React from "react";
import AddStar from "./component/AddStar";
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

function Products({ shoes }) {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography className="header" variant="h3" color="primary">
            SHOES
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container justify="space-around">
            {shoes &&
              shoes.map((shoe) => (
                <Grid key={shoe.name} item>
                  <Link to={`/${shoe.id}`}>
                    <Card className="card">
                      <CardHeader title={shoe.name} subheader={shoe.sport} />
                      <CardMedia
                        className="media"
                        image={shoe.img}
                        title={shoe.name}
                      />
                      <CardContent className="content">
                        <Typography variant="body1" color="textPrimary">
                          {shoe.price}
                        </Typography>
                        <AddStar
                          rater={shoe.reviews.length}
                          rating={shoe.averageStar}
                        />
                      </CardContent>
                      <CardActions disableSpacing className="actions">
                        <Button
                          fullWidth
                          variant="contained"
                          size="medium"
                          color="primary"
                        >
                          Rate
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
