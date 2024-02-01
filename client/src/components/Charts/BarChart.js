// // // import { Chart } from "chart.js";
// // // import { useState } from "react";
// // import { Bar } from "react-chartjs-2";
// // // import {chart as ChartJS} from "chart.js/auto"


// // function BarChart() {
   
// // return(
  
// // )
// // }

// // export default BarChart;

// import React from "react";
// import { Chart as ChartJS, defaults } from "chart.js/auto";
// import { Bar, Doughnut, Line } from "react-chartjs-2";
// import BarData from "./BarData.js"
// import {BarCharts} from"./BarCharts.module.css"
// defaults.maintainAspectRatio = false;
// defaults.responsive = true;

// defaults.plugins.title.display = true;
// defaults.plugins.title.align = "start";
// defaults.plugins.title.font.size = 20;
// defaults.plugins.title.color = "black";


// function BarChart()  {
//     return(
        
//             <div className="App">
//               <div className="dataCard revenueCard">
//                 <Line
//                   data={{
//                     labels: BarData.map((data) => data.label),
//                     datasets: [
//                       {
//                         label: "Revenue",
//                         data: BarData.map((data) => data.revenue),
//                         backgroundColor: "#064FF0",
//                         borderColor: "#064FF0",
//                       },
//                       {
//                         label: "Cost",
//                         data: BarData.map((data) => data.cost),
//                         backgroundColor: "#FF3030",
//                         borderColor: "#FF3030",
//                       },
//                     ],
//                   }}
//                   options={{
//                     elements: {
//                       line: {
//                         tension: 0.5,
//                       },
//                     },
//                     plugins: {
//                       title: {
//                         text: "Monthly Revenue & Cost",
//                       },
//                     },
//                   }}
//                 />
//               </div>
//               </div>
//     )
// }

// export default BarChart;

import React, { useEffect, useState } from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import BarCharts from "./BarCharts.module.css"
import axios from "axios";


import BarData from "./BarData.js";
import SourceData from "./SourceData.js";
import { useQuery } from "react-query";


defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

const BarChart = () => {


  //fetch Line
  const [orderss , setOrderss] = useState([])
  useEffect(()=>{
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/order/all');
        console.log('Response:', response);
         setOrderss(response.data.orders);
      } catch (error) {
        throw new Error('Error fetching data');
      }
    };
    fetchOrders()
  },[])

  // Group orders by month
const ordersByMonth = orderss.reduce((acc, order) => {
  const month = new Date(order.createdAt).getMonth();
  if (!acc[month]) {
    acc[month] = [];
  }
  acc[month].push(order);
  return acc;
}, {});

// Calculate total price for each month
const monthlyTotals = Object.values(ordersByMonth).map((ordersInMonth) =>
  ordersInMonth.reduce((total, order) => total + order.totalPrice, 0)
);






//fetch Bar
const [productsArray, setProductsArray] = useState([])
useEffect(() => {
const fetchProducts = async () => {
  try {
    const response = await axios.get('http://localhost:5000/product/getall');
    console.log('Response:', response);
    setProductsArray(response.data.products);
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Error fetching products');
  }
};
fetchProducts()
}, [])

 // Preprocess data for the bar chart
 const categoryCounts = productsArray.reduce((acc, product) => {
  const categoryName = product.categoryID.arabicName;

  // Increment count for the category or set it to 1 if not present
  acc[categoryName] = (acc[categoryName] || 0) + 1;

  return acc;
}, {});

const chartData = {
  labels: Object.keys(categoryCounts),
  datasets: [
    {
      label: 'Count',
      data: Object.values(categoryCounts),
      backgroundColor: ['#368681', '#F1CAB1', '#4D342B'],
      borderRadius: 7,
    },
  ],
};

const chartOptions = {
  plugins: {
    title: {
      text: 'Products in Category',
    },
  },
};



//fetch pie
  const subcategoryDistribution = productsArray.reduce((acc, product) => {
    const subcategory = product.subCategoryID;
    if (subcategory && subcategory.arabicName) {
      const subcategoryName = subcategory.arabicName;
      // Increment count for the subcategory or set it to 1 if not present
      acc[subcategoryName] = (acc[subcategoryName] || 0) + 1;
    }
    return acc;
  }, {});
const pieChartData = {
  labels: Object.keys(subcategoryDistribution),
  datasets: [
    {
      data: Object.values(subcategoryDistribution),
      backgroundColor: ['#368681', '#F1CAB1', '#4D342B'], // Add more colors as needed
      hoverBackgroundColor: ['#368681', '#F1CAB1', '#4D342B'],
    },
  ],
};
const pieChartOptions = {
  plugins: {
    title: {
      text: 'Products in SubCategory',
    },
  },
};


  return (
    <div className={BarCharts.App}>
 <div className={`${BarCharts.dataCard} ${BarCharts.revenueCard}`}>
 
        <Line
          data={{
            labels: [
              'January', 'February', 'March', 'April', 'May', 'June',
              'July', 'August', 'September', 'October', 'November', 'December',
            ],
            datasets: [
              {
                label: 'Monthly Revenue',
                data: monthlyTotals,
                fill: false,
                borderColor: '#368681',
                backgroundColor: '#368681'
              },
            ],
          }}
          options={{
            elements: {
              line: {
                tension: 0.5,
              },
            },
            plugins: {
              title: {
                text: "Monthly Revenue",
              },
            },
          }}
        />
      </div>



      <div className={`${BarCharts.dataCard} ${BarCharts.customerCard}`}>
      <Bar data={chartData} options={chartOptions} />
      </div>



      {/* <div className={BarCharts.categoryCard}> */}
      <div className={`${BarCharts.dataCard} ${BarCharts.categoryCard}`}>
        <Doughnut
          data={pieChartData} options={pieChartOptions}
        />
      </div>
    </div>
  );
};

export default BarChart;


