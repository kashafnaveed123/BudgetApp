import React from 'react';
import { Chart } from "react-google-charts";
import SideNav from '../dashboard/SideNav';

function Profit() {
  const data = [
    ["Days", "Sales", "Expenses"],
    ["January", 7, 9],
    ["Febrary", 12, 8],
    ["March", 7, 10],
    ["April", 15, 14],
    ["May", 1, 2],
    ["June", 22, 20],
    ["July", 13, 19],
    ["August", 13, 19],
    ["September", 13, 19],
    ["October", 13, 19],
    ["November", 13, 19],
    ["December", 13, 19],
  ];

  const options = {
    title: "Company's Yearly Performance",
    curveType: "function",
    legend: { position: "bottom" },
    vAxis: {
      title: "Days",
      ticks: [0, 5, 10, 15, 20, 24],
      format: '',
    },
  };

  return (
    <div className="flex h-screen">
      <SideNav />
      <div className="flex-grow flex items-center justify-center">
        <Chart
          chartType="LineChart"
          width="800px"
          height="400px"
          data={data}
          options={options}
        />
      </div>
    </div>
  );
}

export default Profit;
