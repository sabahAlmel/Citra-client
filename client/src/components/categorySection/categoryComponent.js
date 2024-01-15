import React from 'react';
import { Card, CardContent, CardMedia, Button } from '@mui/material';
import image from '../../assets/images/ctra.webp';

const CategoryComponent = () => {
  return (
    <Card
      sx={{
        position: 'relative',
        maxWidth: 375,
        margin: 'auto',
        marginTop: 4,
        height: 260,
        borderRadius:"0",
        transition: 'transform 0.4s',
        '&:hover': {
            transform: 'scale(1.1)',
            zIndex: 2,
          },
          
          
      }}
    >
      <CardMedia
        component="img"
        alt="Background"
        height="100%" 
        image={image}
        sx={{
          objectFit: 'cover',
        }}
      />
      <CardContent>
        <Button
          color="primary"
          sx={{
            width: '80%',
            height: 62,
            margin: '0 auto',
            position: 'absolute',
            top: '80%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: "0",
            backgroundColor: "#FEE7CB",
            color: '#4D342B',
            '&:hover': {
              boxShadow: '0px 0px 10px 3px rgba(0,0,0,0.5)',
              backgroundColor: '#368681',
            },
          }}
        >
          Your Button
        </Button>
      </CardContent>
    </Card>
  );
};

export default CategoryComponent;
