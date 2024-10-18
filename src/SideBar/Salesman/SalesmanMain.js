import React from 'react';
import { useNavigate } from 'react-router-dom';
const SalesmanMain = () => {
  const navigate=useNavigate()
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-8">Salesman Management</h1>

      <div className="flex space-x-4">
        <button
          onClick={()=>navigate('/SalesmanDetails')}
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
         See Salesman Details
        </button>
        <button
          onClick={()=>navigate('/SalesmanSales')}
          className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
         Salesman's Sale
        </button>
        <button
          onClick={()=>navigate('/AddSalesman')}
          className="px-6 py-3 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
        >
          Add New Salesman
        </button>
      </div>
    </div>
  );
};

export default SalesmanMain;

