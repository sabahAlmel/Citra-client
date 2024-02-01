import React from 'react'
import { Paper, Typography, Box } from '@mui/material'
import SingleCards from "./SingleCards.module.css"

const CardBalance = () => {
  return (
    <>
    <div className={SingleCards.main}>
    <Paper 
        variant='outlined' 
        sx={{ 
            width: 320, 
            height: 170,pt: 0.5, 
            pb: 0.5, borderRadius: '12px', 
            border: '1px solid #E6E9EE', 
            backgroundColor:  '#fee7cb'
        }}>
    {/* <div className={SingleCards.box1}> */}
      <Box 
        sx={{ 
            borderLeft: '8px solid', 
            height: '100%', 
            borderRadius: 2, 
            borderLeftColor: "#368681"
            
        }}>
        <Typography 
            variant='h6' 
            sx={{ 
                p: 2, 
                ml: 2, 
                color: "#4D342B"
                }} >
                    {/* {title} */}
                    Revenue
                    {/* الربح */}
        </Typography>
        <Typography 
            variant='body1' 
            sx={{ p: 2, 
            ml: 2, 
            fontWeight: '600', 
            fontSize: '20px' ,
            color: "#368681"

            }}>
                    {/* {unit} {amount} */}
                    unit amount
        </Typography>
      </Box>
      {/* </div> */}
    </Paper>
    </div>
    </>
  )
}

export default CardBalance