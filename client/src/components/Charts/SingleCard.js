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
            width: 320,
            height: 170,
            pt: 0.5,
            pb: 0.5,
            borderRadius: "12px",
            border: "1px solid #E6E9EE",
            backgroundColor: "#fee7cb",
          }}
        >
          {/* <div className={SingleCards.box1}> */}
          <Box
            sx={{
              borderLeft: "8px solid",
              height: "100%",
              borderRadius: 2,
              borderLeftColor: "#368681",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                p: 2,
                ml: 2,
                color: "#4D342B",
              }}
            >
              قيمة الطلب الإجمالي
            </Typography>
            <Typography
              variant="body1"
              sx={{
                p: 2,
                ml: 2,
                fontWeight: "600",
                fontSize: "20px",
                color: "#368681",
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

export const CardBalanceTwo = (data) => {
  const { totalRevenueToday } = data;
  return (
    <>
      <div className={SingleCards.main}>
        <Paper
          variant="outlined"
          sx={{
            width: 320,
            height: 170,
            pt: 0.5,
            pb: 0.5,
            borderRadius: "12px",
            border: "1px solid #E6E9EE",
            backgroundColor: "#fee7cb",
          }}
        >
          {/* <div className={SingleCards.box1}> */}
          <Box
            sx={{
              borderLeft: "8px solid",
              height: "100%",
              borderRadius: 2,
              borderLeftColor: "#368681",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                p: 2,
                ml: 2,
                color: "#4D342B",
              }}
            >
              مجموع الأرباح في اليوم
            </Typography>
            <Typography
              variant="body1"
              sx={{
                p: 2,
                ml: 2,
                fontWeight: "600",
                fontSize: "20px",
                color: "#368681",
              }}
            >
              {totalRevenueToday}$
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
            width: 320,
            height: 170,
            pt: 0.5,
            pb: 0.5,
            borderRadius: "12px",
            border: "1px solid #E6E9EE",
            backgroundColor: "#fee7cb",
          }}
        >
          {/* <div className={SingleCards.box1}> */}
          <Box
            sx={{
              borderLeft: "8px solid",
              height: "100%",
              borderRadius: 2,
              borderLeftColor: "#368681",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                p: 2,
                ml: 2,
                color: "#4D342B",
              }}
            >
              إجمالي المستخدمين
            </Typography>
            <Typography
              variant="body1"
              sx={{
                p: 2,
                ml: 2,
                fontWeight: "600",
                fontSize: "20px",
                color: "#368681",
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
  const {totalProducts} = product
  return (
    <>
      <div className={SingleCards.main}>
        <Paper
          variant="outlined"
          sx={{
            width: 320,
            height: 170,
            pt: 0.5,
            pb: 0.5,
            borderRadius: "12px",
            border: "1px solid #E6E9EE",
            backgroundColor: "#fee7cb",
          }}
        >
          {/* <div className={SingleCards.box1}> */}
          <Box
            sx={{
              borderLeft: "8px solid",
              height: "100%",
              borderRadius: 2,
              borderLeftColor: "#368681",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                p: 2,
                ml: 2,
                color: "#4D342B",
              }}
            >
              إجمالي المنتجات
            </Typography>
            <Typography
              variant="body1"
              sx={{
                p: 2,
                ml: 2,
                fontWeight: "600",
                fontSize: "20px",
                color: "#368681",
              }}
            >
              {totalProducts !== null ? `${totalProducts} منتجات` : "Loading..."}
            </Typography>
          </Box>
          {/* </div> */}
        </Paper>
      </div>
    </>
  );
};
