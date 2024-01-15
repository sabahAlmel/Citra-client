import React from 'react';
import { Grid, Typography } from '@mui/material';
import CategoryComponent from '../categorySection/categoryComponent.js'


const CategorySection = () => {
  const rows = [3, 3, 2];

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} style={{ textAlign: 'center', marginBottom: '20px' }}>
        <Typography variant="h6">All Categories</Typography>
      </Grid>
      {rows.map((numCards, rowIndex) => (
        <Grid container spacing={1} key={rowIndex} justifyContent="center">
          {Array.from({ length: numCards }).map((_, cardIndex) => (
            <Grid item xs={8} sm={6} md={4} key={cardIndex}>
              <CategoryComponent />
            </Grid>
          ))}
        </Grid>
      ))}
    </Grid>
  );
};

export default CategorySection;