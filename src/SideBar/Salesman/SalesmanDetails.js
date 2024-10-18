import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/Firebase'; // Import Firebase configuration

const SalesmanDetails = () => {
  const [salesmen, setSalesmen] = useState([]);

  // Fetch salesman data from Firebase
  useEffect(() => {
    const fetchSalesmen = async () => {
      const querySnapshot = await getDocs(collection(db, 'salesmen'));
      const salesmenArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(), // Fetch all fields, including sales progress
      }));
      setSalesmen(salesmenArray);
    };

    fetchSalesmen();
  }, []);

  // Delete salesman from Firebase
  const handleDelete = async (salesmanId) => {
    try {
      await deleteDoc(doc(db, 'salesmen', salesmanId));
      setSalesmen(salesmen.filter(salesman => salesman.id !== salesmanId)); // Update the state after deletion
      alert("Salesman deleted successfully!");
    } catch (error) {
      console.error("Error deleting salesman: ", error);
      alert("Error deleting salesman!");
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-gray-100 rounded-xl shadow-md">
      <h1 className="text-3xl text-center text-blue-600 font-bold mb-8">Salesman Data</h1>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-4 border text-left">Salesman Name</th>
            <th className="p-4 border text-left">Address</th>
            <th className="p-4 border text-left">Phone No</th>
            <th className="p-4 border text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {salesmen.map((salesman, index) => (
            <tr key={index} className="border-t">
              <td className="p-4 border">{salesman.firstName} {salesman.lastName}</td>
              <td className="p-4 border">{salesman.address}</td>
              <td className="p-4 border">{salesman.phoneNumber}</td>
              <td className="p-4 border">
                {/* Delete Button */}
                <button 
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" 
                  onClick={() => handleDelete(salesman.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesmanDetails;
