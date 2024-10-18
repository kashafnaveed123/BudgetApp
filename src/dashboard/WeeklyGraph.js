import React, { useEffect, useState } from 'react';
import { db } from '../SideBar/config/Firebase'; // Your Firebase config
import { collection, onSnapshot } from 'firebase/firestore';

const CompanyPerformance = () => {
  const [performanceData, setPerformanceData] = useState([]);
  const [viewType, setViewType] = useState('weekly'); // Default view is 'weekly'

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

    const fetchPerformanceData = () => {
      const invoicesCollectionRef = collection(db, 'invoices');
      onSnapshot(invoicesCollectionRef, (snapshot) => {
        const performance = snapshot.docs.map((doc) => {
          const data = doc.data();
          const totalPerformance = data.items.reduce((sum, item) => sum + (item.total || 0), 0);
          return {
            date: data.date || new Date(), // Assuming date field exists in your data
            totalPerformance,
          };
        });
        setPerformanceData(performance);
      });
    };

    loadGoogleCharts();
    fetchPerformanceData();

    return () => {
      // Cleanup if needed
    };
  }, []);

  const drawChart = () => {
    const chartDiv = document.getElementById('company_performance_chart_div');
    if (!chartDiv || !performanceData.length) return;

    const data = new window.google.visualization.DataTable();
    data.addColumn('string', 'Date');
    data.addColumn('number', 'Total Performance');

    // Process data based on view type
    const processedData = performanceData.reduce((acc, item) => {
      const date = new Date(item.date);
      const period = viewType === 'weekly' ? 
        `${date.getFullYear()}-${date.getMonth() + 1}-W${getISOWeek(date)}` : // Weekly format
        `${date.getFullYear()}-${date.getMonth() + 1}`; // Monthly format

      if (!acc[period]) {
        acc[period] = 0;
      }
      acc[period] += item.totalPerformance; // Aggregate performance
      return acc;
    }, {});

    // Convert to array for Google Charts
    const chartRows = Object.entries(processedData).map(([key, value]) => [key, value]);
    data.addRows(chartRows);

    const options = {
      title: `Company Performance (${viewType.charAt(0).toUpperCase() + viewType.slice(1)})`,
      width: 700,
      height: 250,
      hAxis: { title: 'Date' },
      vAxis: { title: 'Total Performance (PKR)' },
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

  const getISOWeek = (date) => {
    const firstThursday = new Date(date.getFullYear(), 0, 1);
    const weekNumber = Math.ceil((((date - firstThursday) / 86400000) + firstThursday.getDay() + 1) / 7);
    return weekNumber;
  };

  // Call drawChart when performanceData or viewType changes
  useEffect(() => {
    drawChart();
  }, [performanceData, viewType]);

  return (
    <div>
      <div>
        <button onClick={() => setViewType('weekly')} className={`mr-2 ${viewType === 'weekly' ? 'font-bold' : ''}`}>
          Weekly
        </button>
        <button onClick={() => setViewType('monthly')} className={`mr-2 ${viewType === 'monthly' ? 'font-bold' : ''}`}>
          Monthly
        </button>
      </div>
      <div id="company_performance_chart_div" style={{ width: '100%', height: '100%' }}></div>
    </div>
  );
};

export default CompanyPerformance;
