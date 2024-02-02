import React from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import BarCharts from "./BarCharts.module.css";
import SingleCard from "./SingleCard";
import axios from "axios";
import {CardBalanceOne ,CardBalanceTwo , CardBalanceThree , CardBalanceFour}from '../../components/Charts/SingleCard'
import SourceData from "./SourceData.js";
import { useState , useEffect } from "react";
defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

const BarChart = () => {

  // Fetch line(fetch orders)
  const [orderss, setOrderss] = useState([])
  const [averageOrderValue, setAverageOrderValue] = useState(null);
  const [totalRevenueToday, setTotalRevenueToday] = useState(null);


  useEffect(() => {
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
  }, [])

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




  //fetch Bar(fetch products)
  const [productsArray, setProductsArray] = useState([])
  const [totalProducts, setTotalProducts] = useState(null);

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
        hoverBackgroundColor: ['#368681', '#F1CAB1', '#4D342B'],

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




  //fetch pie(products are already fetched)
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
        backgroundColor: ['#368681', '#F1CAB1', '#4D342B'],
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



  //for card three 
  const [totalUsers, setTotalUsers] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user/getall'); 
        console.log('Response:', response);
        setTotalUsers(response.data.length);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUsers();
  }, []);





  //fetch card one 
  useEffect(() => {
    const totalOrderValue = orderss.reduce((sum, order) => sum + order.totalPrice, 0);
    const averageValue = orderss.length > 0 ? totalOrderValue / orderss.length : 0;
    setAverageOrderValue(averageValue.toFixed(2));
  }, [orderss]);


  //for card two
  useEffect(() => {
    console.log('All Orders:', orderss);

    const calculateTotalRevenueToday = () => {
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);

      console.log('Current Date:', currentDate);

      const ordersToday = orderss.filter((order) => {
        const orderDate = new Date(order.createdAt);

        console.log('Order Date:', orderDate);

        // Check if the order date is on or after the current date
        return orderDate <= currentDate;
      });
      const totalRevenueToday = ordersToday.reduce((total, order) => total + order.totalPrice, 0);
      setTotalRevenueToday(totalRevenueToday);
    };

    // Check if orderss is not empty before calculating
    if (orderss.length > 0) {
      calculateTotalRevenueToday();
    }
  }, [orderss]);

  //for card four 
  useEffect(() => {
    // Calculate total number of products
    const calculateTotalProducts = () => {
      setTotalProducts(productsArray.length);
    };
    calculateTotalProducts();
  }, [productsArray]);





  return (
    <div className={BarCharts.AppChart}>
      
      <div className={BarCharts.cardsWrapper} >
        <CardBalanceOne className={BarCharts.card} averageOrderValue={averageOrderValue}/>
        <CardBalanceTwo className={BarCharts.card} totalRevenueToday={totalRevenueToday}/>
        <CardBalanceThree className={BarCharts.card} totalUsers={totalUsers}/>
        <CardBalanceFour className={BarCharts.card} totalProducts={totalProducts}/>
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
                text: "Monthly Revenue",
              },
            },
          }}
        />
      </div>

      <div className={`${BarCharts.dataCard} ${BarCharts.customerCard}`}>
        <Bar
          data={chartData} options={chartOptions}
  
        />
      </div>

      <div className={`${BarCharts.dataCard} ${BarCharts.categoryCard}`}>
        <Doughnut
          data={pieChartData} options={pieChartOptions}
          
        />
      </div>
    </div>
  );
};

export default BarChart;