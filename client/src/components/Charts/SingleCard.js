import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import SingleCards from "./SingleCards.module.css";

export const CardBalanceOne = (props) => {
  const { averageOrderValue } = props;

  return (
    <>
      <div className={SingleCards.main}>
        <Paper
          variant="outlined"
          sx={{
            width: "100%",
            // height: 170, pt: 0.5,
            height: "100%",
            pb: 0.5,
            borderRadius: "12px",
            border: "1px solid #E6E9EE",
            backgroundColor: "white",
            boxShadow: "15px 10px 8px rgba(54, 134, 129, 0.1)",
          }}
        >
          {/* <div className={SingleCards.box1}> */}
          <Box
            sx={{
              borderRight: "8px solid #368681",
              // borderBottom: '8px solid',
              height: "100%",
              borderRadius: 2,

              // borderBottomColor: "gray",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <Typography
              variant="p"
              sx={{
                ml: 2,
                color: "#4D342B",
                fontSize: "1.3rem",
                textAlign: "center",
              }}
            >
              قيمة الطلب الإجمالي
            </Typography>
            <Typography
              variant="p"
              sx={{
                ml: 2,
                fontWeight: "600",
                fontSize: "20px",
                color: "#368681",
                textAlign: "center",
              }}
            >
              {averageOrderValue !== null
                ? `${averageOrderValue}`
                : "Loading..."}
            </Typography>
          </Box>
          {/* </div> */}
        </Paper>
      </div>
    </>
  );
};

export const CardBalanceTwo = (revenue) => {
  const { totalRevenueToday } = revenue;
  return (
    <>
      <div className={SingleCards.main}>
        <Paper
          variant="outlined"
          sx={{
            width: "100%",
            // height: 170, pt: 0.5,
            height: "100%",
            pb: 0.5,
            borderRadius: "12px",
            border: "1px solid #E6E9EE",
            backgroundColor: "white",
            boxShadow: "15px 10px 8px rgba(54, 134, 129, 0.1)",
          }}
        >
          {/* <div className={SingleCards.box1}> */}
          <Box
            sx={{
              borderRight: "8px solid #368681",
              // borderBottom: '8px solid',
              height: "100%",
              borderRadius: 2,

              // borderBottomColor: "gray",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <Typography
              variant="p"
              sx={{
                ml: 2,
                color: "#4D342B",
                fontSize: "1.3rem",
                textAlign: "center",
              }}
            >
              إجمالي الربح اليومي
            </Typography>
            <Typography
              variant="p"
              sx={{
                ml: 2,
                fontWeight: "600",
                fontSize: "20px",
                color: "#368681",
                textAlign: "center",
              }}
            >
              {totalRevenueToday !== null
                ? ` $ ${totalRevenueToday} `
                : "Loading..."}
            </Typography>
          </Box>
          {/* </div> */}
        </Paper>
      </div>
    </>
  );
};

export const CardBalanceThree = (users) => {
  const { totalUsers } = users;
  return (
    <>
      <div className={SingleCards.main}>
        <Paper
          variant="outlined"
          sx={{
            width: "100%",
            // height: 170, pt: 0.5,
            height: "100%",
            pb: 0.5,
            borderRadius: "12px",
            border: "1px solid #E6E9EE",
            backgroundColor: "white",
            boxShadow: "15px 10px 8px rgba(54, 134, 129, 0.1)",
          }}
        >
          {/* <div className={SingleCards.box1}> */}
          <Box
            sx={{
              borderRight: "8px solid #368681",
              // borderBottom: '8px solid',
              height: "100%",
              borderRadius: 2,

              // borderBottomColor: "gray",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <Typography
              variant="p"
              sx={{
                ml: 2,
                color: "#4D342B",
                fontSize: "1.3rem",
                textAlign: "center",
              }}
            >
              إجمالي المستخدمين
            </Typography>
            <Typography
              variant="p"
              sx={{
                ml: 2,
                fontWeight: "600",
                fontSize: "20px",
                color: "#368681",
                textAlign: "center",
              }}
            >
              {totalUsers !== null ? `${totalUsers} مستخدم` : "Loading..."}
            </Typography>
          </Box>
        </Paper>
      </div>
    </>
  );
};

export const CardBalanceFour = (product) => {
  const { totalProducts } = product;
  return (
    <>
      <div className={SingleCards.main}>
        <Paper
          variant="outlined"
          sx={{
            width: "100%",
            // height: 170, pt: 0.5,
            height: "100%",
            pb: 0.5,
            borderRadius: "12px",
            border: "1px solid #E6E9EE",
            backgroundColor: "white",
            boxShadow: "15px 10px 8px rgba(54, 134, 129, 0.1)",
          }}
        >
          {/* <div className={SingleCards.box1}> */}
          <Box
            sx={{
              borderRight: "8px solid #368681",
              // borderBottom: '8px solid',
              height: "100%",
              borderRadius: 2,

              // borderBottomColor: "gray",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <Typography
              variant="p"
              sx={{
                ml: 2,
                color: "#4D342B",
                fontSize: "1.3rem",
                textAlign: "center",
              }}
            >
              إجمالي المنتجات
            </Typography>
            <Typography
              variant="p"
              sx={{
                ml: 2,
                fontWeight: "600",
                fontSize: "20px",
                color: "#368681",
                textAlign: "center",
              }}
            >
              {totalProducts !== null
                ? `${totalProducts} منتجات`
                : "Loading..."}
            </Typography>
          </Box>
          {/* </div> */}
        </Paper>
      </div>
    </>
  );
};
