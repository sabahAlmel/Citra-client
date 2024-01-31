import React from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import BarCharts from "./BarCharts.module.css";
import SingleCard from "./SingleCard";
import axios from "axios";
import SourceData from "./SourceData.js";
import { useQuery } from "react-query";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

const BarChart = () => {
  
  // Fetch line
  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/order/all');
      return response.data.orders;
    } catch (error) {
      throw new Error('Error fetching data');
    }
  };

  const { isLoading , data } = useQuery('order' , fetchOrders)

  if (isLoading) {
    return <h2>Loading ...</h2>;
  }
  console.log('Data:', data);

  if (!Array.isArray(data)) {
    console.error('Invalid data structure:', data);
    return <h2>Invalid data structure</h2>;
  }

  // Group orders by month
const ordersByMonth = data.reduce((acc, order) => {
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

  return (
    <div className={BarCharts.AppChart}>
      <div className={BarCharts.cardsWrapper}>
        <SingleCard className={BarCharts.card} />
        <SingleCard className={BarCharts.card} />
        <SingleCard className={BarCharts.card} />
        <SingleCard className={BarCharts.card} />
      </div>
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
                label: "Count 1",
                data: SourceData.map((data) => data.value).slice(0, 8),
                backgroundColor: "#368681",
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

      <div className={`${BarCharts.dataCard} ${BarCharts.categoryCard}`}>
        <Doughnut
          data={{
            labels: SourceData.map((data) => data.label),
            datasets: [
              {
                label: "Count",
                data: SourceData.map((data) => data.value),
                backgroundColor: ["#368681", "#F1CAB1", "#4D342B"],
                borderColor: ["#368681", "#F1CAB1", "#4D342B"],
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
