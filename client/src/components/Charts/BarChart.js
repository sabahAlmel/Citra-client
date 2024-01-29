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

import React from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import BarCharts from "./BarCharts.module.css"


import BarData from "./BarData.js";
import SourceData from "./SourceData.js";


defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

const BarChart = () => {

  const [barData, setBarData] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [productData, setProductData] = useState([]);

  return (
    <div className={BarCharts.App}>
      <p className={BarCharts.title1}>OverView</p>
 <div className={`${BarCharts.dataCard} ${BarCharts.revenueCard}`}>
        <Line
          data={{
            labels: BarData.map((data) => data.label),
            datasets: [
              {
                label: "Revenue",
                data: BarData.map((data) => data.revenue),
                backgroundColor: "#368681",
                borderColor: "#368681",
              },
              {
                label: "Cost",
                data: BarData.map((data) => data.cost),
                backgroundColor: "#4D342B",
                borderColor: "#4D342B",
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
                text: "Monthly Revenue & Cost",
              },
            },
          }}
        />
      </div>

      <div className={`${BarCharts.dataCard} ${BarCharts.customerCard}`}>
        <Bar
          data={{
            labels: SourceData.map((data) => data.label),
            datasets: [
              {
                label: "Count",
                data: SourceData.map((data) => data.value),
                backgroundColor: [
                  '#368681',
                  "#F1CAB1",
                  "#4D342B",
                ],
                borderRadius: 7,
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                text: "Products",
              },
            },
          }}
        />
      </div>

      {/* <div className={BarCharts.categoryCard}> */}
      <div className={`${BarCharts.dataCard} ${BarCharts.categoryCard}`}>
        <Doughnut
          data={{
            labels: SourceData.map((data) => data.label),
            datasets: [
              {
                label: "Count",
                data: SourceData.map((data) => data.value),
                backgroundColor: [
                  '#368681',
                  "#F1CAB1",
                  "#4D342B",
                ],
                borderColor: [
                  '#368681',
                  "#F1CAB1",
                  "#4D342B",
                ],
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                text: "Orders",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default BarChart;


