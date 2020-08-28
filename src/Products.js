import { Grid } from "@material-ui/core/";
import React from "react";
import ProductCard from "./component/ProductCard";
import { StyledHeader } from "./styled";

function Products({ shoeList, reviews }) {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <StyledHeader>Products</StyledHeader>
        </Grid>
        <Grid item xs={12}>
          <Grid container justify="space-around">
            {shoeList &&
              shoeList.map((shoe) => (
                <Grid key={shoe.name} item>
                  <ProductCard shoe={shoe} reviews={reviews} />
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Products;
