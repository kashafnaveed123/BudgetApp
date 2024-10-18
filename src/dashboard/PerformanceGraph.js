import React, { useEffect, useState } from 'react';
import { db } from '../SideBar/config/Firebase'; // Your Firebase config
import { collection, onSnapshot } from 'firebase/firestore';

const SalesmanPerformance = () => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const loadGoogleCharts = () => {
      const script = document.createElement('script');
      script.src = 'https://www.gstatic.com/charts/loader.js';
      script.onload = () => {
        window.google.charts.load('current', { packages: ['corechart'] });
        window.google.charts.setOnLoadCallback(drawChart);
      };
      document.body.appendChild(script);
    };

    // Fetch sales data from Firebase 'invoices' collection
    const fetchSalesData = () => {
      const invoicesCollectionRef = collection(db, 'invoices'); // Assuming 'invoices' collection in Firebase
      onSnapshot(invoicesCollectionRef, (snapshot) => {
        const sales = snapshot.docs.map((doc) => {
          const data = doc.data();
          // Sum up the total from each invoice's items
          const totalSales = data.items.reduce((sum, item) => sum + (item.total || 0), 0);
          return {
            time: data.time || 'Unknown Time', // Time of invoice
            totalSales: totalSales,            // Total sales from all items in the invoice
          };
        });
        setSalesData(sales);
      });
    };

    const drawChart = () => {
      const chartDiv = document.getElementById('Salesman_sales_over_time_chart_div');
      if (!chartDiv || !salesData.length) return;

      const data = new window.google.visualization.DataTable();
      data.addColumn('string', 'Time');
      data.addColumn('number', 'Total Sales');

      // Calculate cumulative sales over time
      let cumulativeSales = 0;
      const chartRows = salesData.map((sale) => {
        cumulativeSales += sale.totalSales; // Add sales to cumulative amount
        return [sale.time, cumulativeSales]; // Return time and cumulative sales
      });

      data.addRows(chartRows);

      const options = {
        title: 'Salesman Sales Over Time (Including Losses)',
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
      // Cleanup if needed
    };
  }, [salesData]);

  return (
    <div>
      <div id="Salesman_sales_over_time_chart_div" style={{ width: '100%', height: '100%' }}></div>
    </div>
  );
};

export default SalesmanPerformance;

