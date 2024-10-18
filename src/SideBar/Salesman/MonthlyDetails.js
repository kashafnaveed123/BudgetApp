import React, { useState, useEffect } from 'react';
import { db } from '../config/Firebase';
import { collection, getDocs } from 'firebase/firestore';

const MonthlySales = () => {
  const [monthlySalesData, setMonthlySalesData] = useState([]);

  useEffect(() => {
    const fetchMonthlySales = async () => {
      const monthlySalesSnapshot = await getDocs(collection(db, 'monthlySales'));
      const salesArray = [];

      for (const monthDoc of monthlySalesSnapshot.docs) {
        const weekSales = [];
        const weekCollections = await monthDoc.ref.listCollections(); // Await collections

        for (const weekCollection of weekCollections) {
          const weekSnapshot = await getDocs(weekCollection);
          const weekData = [];

          weekSnapshot.forEach((weekDoc) => {
            weekData.push({ id: weekDoc.id, ...weekDoc.data() });
          });

          weekSales.push({ weekId: weekCollection.id, invoices: weekData });
        }

        salesArray.push({ monthId: monthDoc.id, weekSales });
      }

      setMonthlySalesData(salesArray);
    };

    fetchMonthlySales();
  }, []);

  // Function to determine the current week ID
  const getCurrentWeekId = () => {
    const currentDate = new Date();
    const weekNumber = Math.ceil(currentDate.getDate() / 7); // Calculates current week of the month
    return `week-${weekNumber}`;
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-gray-100 rounded-xl shadow-md">
      <h1 className="text-3xl text-center text-blue-600 font-bold mb-8">Monthly Sales</h1>
      {monthlySalesData.map((month, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-2xl text-blue-500">{month.monthId}</h2>
          {month.weekSales.map((week, weekIndex) => (
            <div key={weekIndex} className="mt-4">
              <h3 className="text-xl text-gray-700">
                {week.weekId} {week.weekId === getCurrentWeekId() ? '(Current Week)' : ''}
              </h3>
              {week.invoices.length > 0 ? (
                week.invoices.map((invoice, invoiceIndex) => (
                  <div key={invoiceIndex} className="p-4 border border-gray-300 rounded-md bg-white mb-2">
                    <p><strong>Invoice ID:</strong> {invoice.id}</p>
                    <p><strong>Customer Name:</strong> {invoice.customerName}</p>
                    <p><strong>Shop Name:</strong> {invoice.shopName}</p>
                    <p><strong>Date:</strong> {new Date(invoice.date.seconds * 1000).toLocaleDateString()}</p>
                    <p><strong>Total:</strong> {invoice.total} PKR</p>
                  </div>
                ))
              ) : (
                <p>No invoices for this week.</p>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MonthlySales;
