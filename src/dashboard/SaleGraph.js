import React, { useEffect, useState } from 'react';
import { db } from '../SideBar/config/Firebase'; // import your Firebase config
import { collection, onSnapshot } from 'firebase/firestore';

const TodaySale = () => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    // Load Google Charts script
    const loadGoogleCharts = () => {
      const script = document.createElement('script');
      script.src = 'https://www.gstatic.com/charts/loader.js';
      script.onload = () => {
        window.google.charts.load('current', { packages: ['corechart'] });
        window.google.charts.setOnLoadCallback(drawChart);
      };
      document.body.appendChild(script);
    };

    // Fetch sales data (prices) from the 'invoices' collection in Firebase
    const fetchSalesData = () => {
      const invoicesCollectionRef = collection(db, 'invoices'); // Reference to the 'invoices' collection
      onSnapshot(invoicesCollectionRef, (snapshot) => {
        const sales = snapshot.docs.map((doc) => {
          const data = doc.data();
          
          // Sum the total prices from all items in the 'items' array
          const totalAmount = data.items.reduce((sum, item) => sum + item.total, 0);
          
          return {
            time: data.time || 'Unknown Time', // Time from the invoice
            totalAmount,                       // Summed up total price from all items
          };
        });
        setSalesData(sales);
      });
    };

    // Draw the chart with updated data
    const drawChart = () => {
      const chartDiv = document.getElementById('sales_chart_div');
      if (!chartDiv || !salesData.length) return;

      const data = new window.google.visualization.DataTable();
      data.addColumn('string', 'Time');
      data.addColumn('number', 'Total Sales');

      // Map the sales data to rows for the chart
      const chartRows = salesData.map((sale) => [sale.time, sale.totalAmount]);
      data.addRows(chartRows);

      const options = {
        title: 'Daily Sales Over Time',
        width: 300,
        height: 250,
        hAxis: { title: 'Time' },
        vAxis: { title: 'Total Sales (PKR)' },
        legend: { position: 'none' },
        pointSize: 5,
        titleTextStyle: {
          fontSize: 16,
          bold: true,
          color: '#333',
        },
      };

      const chart = new window.google.visualization.LineChart(chartDiv);
      chart.draw(data, options);
    };

    loadGoogleCharts();
    fetchSalesData(); // Fetch data initially

    return () => {
      // Cleanup function if needed
    };
  }, [salesData]); // Re-draw chart when salesData updates

  return (
    <div>
      <div id="sales_chart_div" style={{ width: '100%', height: '100%' }}></div>
    </div>
  );
};

export default TodaySale;




