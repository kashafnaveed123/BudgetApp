import React, { useEffect, useState } from 'react';
import { db } from '../SideBar/config/Firebase'; // Import your Firebase config
import { collection, onSnapshot } from 'firebase/firestore';

const TodayLoss = () => {
  const [lossData, setLossData] = useState([]);

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
        const losses = snapshot.docs.map((doc) => {
          const data = doc.data();
          
          // Sum the total prices from all items in the 'items' array
          const totalAmount = data.items.reduce((sum, item) => sum + item.total, 0);
          
          // Assuming you have a way to determine expected sales (replace with actual logic)
          const expectedSales = 1000; // Placeholder for expected sales
          const lossAmount = expectedSales - totalAmount; // Calculate the loss

          return {
            time: data.time || 'Unknown Time', // Time from the invoice
            lossAmount: Math.max(0, lossAmount), // Ensure loss isn't negative
          };
        });
        setLossData(losses);
      });
    };

    // Draw the chart with updated data
    const drawChart = () => {
      const chartDiv = document.getElementById('loss_chart_div');
      if (!chartDiv || !lossData.length) return;

      const data = new window.google.visualization.DataTable();
      data.addColumn('string', 'Time');
      data.addColumn('number', 'Total Loss');

      // Map the loss data to rows for the chart
      const chartRows = lossData.map((loss) => [loss.time, loss.lossAmount]);
      data.addRows(chartRows);

      const options = {
        title: 'Daily Loss Over Time',
        width: 300,
        height: 250,
        hAxis: { title: 'Time' },
        vAxis: { title: 'Total Loss (PKR)' },
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
  }, [lossData]); // Re-draw chart when lossData updates

  return (
    <div>
      <div id="loss_chart_div" style={{ width: '100%', height: '100%' }}></div>
    </div>
  );
};

export default TodayLoss;


