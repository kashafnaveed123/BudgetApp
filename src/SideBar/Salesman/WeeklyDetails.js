import React from 'react';
const  WeeklyDetails = () => {
   
  const SalesmanData = [
    {
      name: 'John Doe',
      date: 10000,
      totalSale: 50000,
    },
    {
      name: 'Jane Smith',
      date: 15000,
      totalSale: 75000,
    },
    {
      name: 'Ali Khan',
      date: 12000,
      totalSale: 60000,
    },
    {
      name: 'Sarah Lee',
      date: 90000,
      totalSale: 18000,
    },
    {
      name: 'Mike Brown',
      date: 20000,
      totalSale: 120000,
    },
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto bg-gray-100 rounded-xl shadow-md">
      <h1 className="text-3xl text-center text-blue-600 font-bold mb-8">Weekly Sales
        
      </h1>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-4 border text-left">Salesman Name</th>
            <th className="p-4 border text-left">Total Sale (PKR)</th>
            <th className="p-4 border text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {SalesmanData.map((Salesman, index) => (
            <tr key={index} className="border-t">
              <td className="p-4 border">{Salesman.name}</td>
              <td className="p-4 border">{Salesman.date}</td>
              <td className="p-4 border">{Salesman.totalSale}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeeklyDetails;

