import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const OrderStatusChart = () => {
  // Mock data for order statuses
  const orderStatusData = {
    pending: 15,
    shipped: 30,
    delivered: 50,
  };

  const data = {
    labels: Object.keys(orderStatusData),
    datasets: [
      {
        data: Object.values(orderStatusData),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // Colors for each status
      },
    ],
  };

  return (
    <div className="order-status-chart">
      <h2>Order Status</h2>
      <Doughnut data={data} />
    </div>
  );
};

export default OrderStatusChart;
