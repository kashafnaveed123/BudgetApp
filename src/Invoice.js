import React, { useState, useEffect } from "react";
import { db } from './SideBar/config/Firebase'; // Import Firebase setup
import { collection, getDocs, updateDoc, doc, addDoc } from 'firebase/firestore';
import logo from './dashboard/logo.png';

const Invoice = () => {
  const [predefinedItems, setPredefinedItems] = useState([]);
  const [salesmen, setSalesmen] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [salesman, setSalesman] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [invoiceDetails, setInvoiceDetails] = useState({
    customerName: "",
    shopName: "",
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString()
  });

  useEffect(() => {
    const fetchSalesmen = async () => {
      const querySnapshot = await getDocs(collection(db, "salesmen"));
      const salesmenArray = querySnapshot.docs.map(doc => ({
        id: doc.id, 
        firstName: doc.data().firstName,
        lastName: doc.data().lastName
      }));
      setSalesmen(salesmenArray);
    };

    const fetchItems = async () => {
      const querySnapshot = await getDocs(collection(db, "spices"));
      const itemsArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        quantity: doc.data().quantity,
        price: doc.data().price || 0
      }));
      setPredefinedItems(itemsArray);
    };

    fetchSalesmen();
    fetchItems();
  }, []);

  const filteredItems = predefinedItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addSelectedItems = () => {
    const itemsToAdd = selectedItems.filter(selectedItem => {
      const availableItem = predefinedItems.find(item => item.name === selectedItem.name);
      return availableItem && selectedItem.quantity <= availableItem.quantity;
    });

    if (itemsToAdd.length === 0) {
      alert("Selected item quantities exceed available stock.");
      return;
    }

    setItems([...items, ...itemsToAdd]);
    setSelectedItems([]);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    if (field === "quantity" || field === "price") {
      newItems[index].total = newItems[index].quantity * newItems[index].price;
    }
    setItems(newItems);
  };

  const handleSelectItem = (item) => {
    if (!selectedItems.find((i) => i.name === item.name)) {
      setSelectedItems([...selectedItems, { ...item, quantity: 1, total: item.price }]);
    } else {
      setSelectedItems(selectedItems.filter((i) => i.name !== item.name));
    }
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.total, 0);
  };

  const areItemsInStock = () => {
    for (let item of items) {
      const availableItem = predefinedItems.find(i => i.id === item.id);
      if (!availableItem || item.quantity > availableItem.quantity) {
        alert(`Not enough stock for ${item.name}`);
        return false;
      }
    }
    return true;
  };

  const updateBudget = async () => {
    for (let item of items) {
      const itemDoc = doc(db, "spices", item.id);
      const availableItem = predefinedItems.find(i => i.id === item.id);
      const newQuantity = availableItem.quantity - item.quantity;

      if (newQuantity >= 0) {
        await updateDoc(itemDoc, { quantity: newQuantity });
      } else {
        alert(`Not enough stock for ${item.name}`);
      }
    }
  };

  const saveInvoiceToFirebase = async () => {
    const invoiceData = {
      customerName: invoiceDetails.customerName,
      shopName: invoiceDetails.shopName,
      date: invoiceDetails.date,
      time: invoiceDetails.time,
      salesman: salesman,
      items: items,
      total: calculateSubtotal()
    };

    try {
      await addDoc(collection(db, "invoices"), invoiceData);
      alert("Invoice saved successfully.");
    } catch (error) {
      console.error("Error saving invoice: ", error);
    }
  };

  const handlePrint = async () => {
    if (!areItemsInStock()) {
      return;
    }

    await updateBudget();
    await saveInvoiceToFirebase();
    window.print();
    resetForm();
  };

  const resetForm = () => {
    setInvoiceDetails({
      customerName: "",
      shopName: "",
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString()
    });
    setSalesman("");
    setItems([]);
    setSelectedItems([]);
  };

  return (
    <div className="p-2 max-w-xl mx-auto bg-white shadow-md">
      {/* Invoice Header */}
      <div className="text-center mb-8">
        <img src={logo} width='20%' alt="NS Traders" className="mx-auto mb-4 " />
        <h1 className="text-2xl font-bold">NS Traders</h1>
        <p>Your trust is our belief</p>
        <p>Address: Jaranwala Road, Faisalabad</p>
        <p>Phone no. : Naveed: 03086779747 | Sarwar: 03008983848</p>
        <div className="flex justify-between mt-4">
          <div>
            <label>Date: {invoiceDetails.date}</label>
            <br />
            <label>Time: {invoiceDetails.time}</label>
          </div>
          <div className="no-print">
            <label>Customer Name</label>
            <input
              type="text"
              value={invoiceDetails.customerName}
              onChange={(e) =>
                setInvoiceDetails({
                  ...invoiceDetails,
                  customerName: e.target.value
                })
              }
              className="border border-gray-300 rounded p-2 mb-2 w-full"
              placeholder="کسٹمر کا نام درج کریں"
            />
            <label>Customer's shop name:</label>
            <input
              type="text"
              value={invoiceDetails.shopName}
              onChange={(e) =>
                setInvoiceDetails({
                  ...invoiceDetails,
                  shopName: e.target.value
                })
              }
              className="border border-gray-300 rounded p-2 w-full"
              placeholder="Shop name"
            />
          </div>
        </div>

        {/* Salesman Dropdown */}
        <div className="mt-4 no-print">
          <label>Select Salesman</label>
          <select
            value={salesman}
            onChange={(e) => setSalesman(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
          >
            <option value="">Select Salesman</option>
            {salesmen.map((salesman) => (
              <option key={salesman.id} value={`${salesman.firstName} ${salesman.lastName}`}>
                {salesman.firstName} {salesman.lastName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {salesman && invoiceDetails.customerName && invoiceDetails.shopName && (
        <div className="text-center mb-8 print-heading">
          <p className="text-md font-bold">Salesman: {salesman}</p>
          <p className="text-md">Customer name: {invoiceDetails.customerName}</p>
          <p className="text-md">Customer Shop name: {invoiceDetails.shopName}</p>
        </div>
      )}

      {/* Multi-Select for Adding Items */}
      <div className="mb-4 no-print">
        <label className="block font-bold">Select</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search item"
          className="border  border-gray-300 rounded p-2 mb-2 w-full"
        />
        <div className="border border-gray-300 rounded p-2 w-full">
          {filteredItems.map((item, index) => (
            <label key={index} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={selectedItems.some(selectedItem => selectedItem.name === item.name)}
                onChange={() => handleSelectItem(item)}
                className="mr-2"
              />
              {item.name} ( Available: {item.quantity})
            </label>
          ))}
        </div>
        <button
          onClick={addSelectedItems}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Add Items
        </button>
      </div>

      {/* Invoice Table */}
      {items.length > 0 && (
        <table className="min-w-full  border-collapse border border-gray-400 print-table">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2">Item</th>
              <th className="border border-gray-400 px-4 py-2">Price</th>
              <th className="border border-gray-400 px-4 py-2">Quantity</th>
              <th className="border border-gray-400 px-4 py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-400 px-2 py-2 w-48">{item.name}</td>
                <td className="border border-gray-400  px-2  py-2">
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) => handleItemChange(index, "price", e.target.value)}
                    className="border border-gray-300 rounded p-2 w-3/4"
                  />
                </td>
                <td className="border border-gray-400 px-2 py-2">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                    className="border border-gray-300 rounded p-2 w-3/4"
                  />
                </td>
                <td className="border border-gray-400 px-2 py-2">{item.total}</td>
              </tr>
            ))}
            <tr>
              <td colSpan="3" className="border border-gray-400 px-4 py-2 font-bold">Subtotal</td>
              <td className="border border-gray-400 px-4 py-2">{calculateSubtotal()}</td>
            </tr>
          </tbody>
        </table>
      )}
      {/* Print Button */}
      <div className="mt-8">
        <button
          onClick={handlePrint}
          className="bg-blue-500 text-white px-4 py-2 rounded no-print"
        >
          Print Invoice
        </button>
      </div>
    </div>
  );
};

export default Invoice;
