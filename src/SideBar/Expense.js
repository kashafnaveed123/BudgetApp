import React, { useState, useEffect } from 'react';
import { db } from './config/Firebase'; // Ensure correct path
import { collection, getDocs, addDoc, updateDoc, doc, setDoc, getDoc } from 'firebase/firestore';

const ExpenseTracker = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [monthlyTotal, setMonthlyTotal] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ description: '', amount: '' });

  // Fetch total sales from invoices when the component mounts
  useEffect(() => {
    const fetchTotalSales = async () => {
      try {
        const invoicesCollection = collection(db, 'invoices');
        const invoiceSnapshot = await getDocs(invoicesCollection);
        
        const total = invoiceSnapshot.docs.reduce((acc, doc) => acc + (doc.data().total || 0), 0);
        setTotalSales(total);
      } catch (error) {
        console.error("Error fetching total sales:", error);
      }
    };

    fetchTotalSales();
  }, []);

  // Fetch the monthly total amount from Firestore
  const fetchMonthlyTotal = async () => {
    const monthYear = new Date().toISOString().slice(0, 7); // Format YYYY-MM
    const monthlyExpensesRef = doc(db, 'monthly_expenses', monthYear);
    
    try {
      const monthlyExpensesSnapshot = await getDoc(monthlyExpensesRef); // Use getDoc instead of getDocs
      
      if (monthlyExpensesSnapshot.exists()) {
        setMonthlyTotal(monthlyExpensesSnapshot.data().totalAmount);
      } else {
        setMonthlyTotal(0);
      }
    } catch (error) {
      console.error("Error fetching monthly total:", error);
    }
  };

  useEffect(() => {
    fetchMonthlyTotal();
  }, []);

  const addMonthlyTotal = async () => {
    const monthYear = new Date().toISOString().slice(0, 7); // Format YYYY-MM
    const monthlyExpensesRef = doc(db, 'monthly_expenses', monthYear);

    // Create or update the document for the current month
    await setDoc(monthlyExpensesRef, {
      totalAmount: totalAmount,
      monthYear: monthYear
    }, { merge: true }); // Use merge to update existing document or create new

    // Fetch the updated monthly total
    fetchMonthlyTotal();
  };

  const addExpense = async (e) => {
    e.preventDefault();
    if (!newExpense.description || !newExpense.amount) {
      alert('Please fill in both fields.');
      return;
    }

    const expense = {
      description: newExpense.description,
      amount: parseFloat(newExpense.amount),
      createdAt: new Date().toISOString()
    };

    // Add expense to Firestore
    await addDoc(collection(db, 'expenses'), expense);

    // Update local state
    setExpenses([...expenses, expense]);
    setNewExpense({ description: '', amount: '' });

    // Update monthly total and profit/loss
    updateMonthlyTotal(expense.amount);
  };

  const updateMonthlyTotal = (expenseAmount) => {
    const newTotal = monthlyTotal - expenseAmount;
    setMonthlyTotal(newTotal);
  };

  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  const remainingAmount = totalAmount - totalSales - totalExpenses;
  const profit = totalSales - totalExpenses;

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-md">
      <h1 className="text-2xl font-bold mb-4">Expense Tracker</h1>

      <div className="mb-8">
        <label className="block mb-2">Total Amount for the Month:</label>
        <input
          type="number"
          value={totalAmount}
          onChange={(e) => setTotalAmount(Number(e.target.value))}
          className="border border-gray-300 rounded p-2 mr-2"
        />
        <button onClick={addMonthlyTotal} className="bg-blue-500 text-white px-4 py-2 rounded">
          Set Total Amount
        </button>
      </div>

      <div className="mb-8">
        <label className="block mb-2">Total Sales from Invoices:</label>
        <input
          type="number"
          value={totalSales}
          readOnly
          className="border border-gray-300 rounded p-2 mr-2"
        />
      </div>

      <form onSubmit={addExpense} className="mb-8">
        <input
          type="text"
          placeholder="Expense Description"
          value={newExpense.description}
          onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
          className="border border-gray-300 rounded p-2 mr-2"
        />
        <input
          type="number"
          placeholder="Expense Amount"
          value={newExpense.amount}
          onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
          className="border border-gray-300 rounded p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Expense
        </button>
      </form>

      {expenses.length > 0 ? (
        <table className="min-w-full table-auto border-collapse border border-gray-400 mb-4">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2">Description</th>
              <th className="border border-gray-400 px-4 py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={index}>
                <td className="border border-gray-400 px-4 py-2">{expense.description}</td>
                <td className="border border-gray-400 px-4 py-2">{expense.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No expenses added yet.</p>
      )}

      <div className="font-bold mb-4">
        <p>Total Expenses: {totalExpenses.toFixed(2)}</p>
        <p>Total Sales: {totalSales.toFixed(2)}</p>
        <p>Profit: {profit.toFixed(2)}</p>
        <p>Remaining Amount: {remainingAmount.toFixed(2)}</p>
        {/* <p>Monthly Total Set: {monthlyTotal.toFixed(2)}</p> */}
      </div>
    </div>
  );
};

export default ExpenseTracker;
