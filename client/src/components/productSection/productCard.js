import React from 'react';
import { Grid, Typography } from '@mui/material';
import imag from '../../assets/images/image.jpeg'


const ProductCard = () => {
  return (
    <Grid container direction="column" alignItems="center">
     
      <Grid item>
        <img src={imag} alt="Product" style={{ width: '100%', maxWidth: '275px', height: '300px' }} />
      </Grid>

     
      <Grid item>
        <Typography variant="body1" align="center" sx={{marginTop:"20px"}}>
          {'description'}
        </Typography>
      </Grid>

      
      <Grid item>
        <Typography variant="h6" align="center" >
          ${'price'}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ProductCard;
