import React, { useEffect, useState, useCallback } from 'react';
import { db } from '../SideBar/config/Firebase'; // Your Firebase config
import { collection, onSnapshot } from 'firebase/firestore';

const CompanyPerformance = () => {
  const [performanceData, setPerformanceData] = useState([]);
  const [viewType, setViewType] = useState('weekly'); // Default view is 'weekly'

  // Fetch performance data from Firestore
  const fetchPerformanceData = useCallback(() => {
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
  }, []);

  // Function to draw the chart
  const drawChart = useCallback(() => {
    const chartDiv = document.getElementById('company_performance_chart_div');
    if (!chartDiv || !performanceData.length) return;

    const data = new window.google.visualization.DataTable();
    data.addColumn('string', 'Date');
    data.addColumn('number', 'Total Performance');

    // Process data based on view type (weekly or monthly)
    const processedData = performanceData.reduce((acc, item) => {
      const date = new Date(item.date);
      const period = viewType === 'weekly'
        ? `${date.getFullYear()}-${date.getMonth() + 1}-W${getISOWeek(date)}`  // Weekly format
        : `${date.getFullYear()}-${date.getMonth() + 1}`;  // Monthly format

      if (!acc[period]) {
        acc[period] = 0;
      }
      acc[period] += item.totalPerformance; // Aggregate performance
      return acc;
    }, {});

    // Convert the processed data to an array format for Google Charts
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
  }, [performanceData, viewType]);

  // Get the ISO week number for weekly aggregation
  const getISOWeek = (date) => {
    const tempDate = new Date(date.getFullYear(), 0, 1);
    const weekNumber = Math.ceil((((date - tempDate) / 86400000) + tempDate.getDay() + 1) / 7);
    return weekNumber;
  };

  // Load Google Charts and set up chart rendering
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

    loadGoogleCharts();
    fetchPerformanceData();

    // Cleanup if needed (e.g., remove the script if necessary)
    return () => {
      const existingScript = document.querySelector('script[src="https://www.gstatic.com/charts/loader.js"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, [fetchPerformanceData, drawChart]);

  // Trigger chart drawing when performance data or view type changes
  useEffect(() => {
    if (window.google) {
      drawChart();  // Draw chart when performanceData or viewType changes
    }
  }, [performanceData, viewType, drawChart]);

  return (
    <div>
      <div>
        <button 
          onClick={() => setViewType('weekly')} 
          className={`mr-2 ${viewType === 'weekly' ? 'font-bold' : ''}`}
        >
          Weekly
        </button>
        <button 
          onClick={() => setViewType('monthly')} 
          className={`mr-2 ${viewType === 'monthly' ? 'font-bold' : ''}`}
        >
          Monthly
        </button>
      </div>
      <div id="company_performance_chart_div" style={{ width: '100%', height: '100%' }}></div>
    </div>
  );
};

export default CompanyPerformance;
