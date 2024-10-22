import React, { useState, useEffect } from "react";
import { db } from './SideBar/config/Firebase'; // Import Firebase setup
import { collection, getDocs, updateDoc, doc, addDoc } from 'firebase/firestore';
import logo from './dashboard/logo.png';

const Invoice = () => {
  const [predefinedItems, setPredefinedItems] = useState([]); // Load items (spices) from Firebase
  const [salesmen, setSalesmen] = useState([]); // Load salesmen from Firebase
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [salesman, setSalesman] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // Search term for spices
  const [invoiceDetails, setInvoiceDetails] = useState({
    customerName: "",
    shopName: "",
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString()
  });

  // Fetch salesmen and spices from Firebase when the component mounts
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
        price: doc.data().price || 0 // Assume price is in Firebase, otherwise default to 0
      }));
      setPredefinedItems(itemsArray);
    };

    fetchSalesmen();
    fetchItems();
  }, []);

  // Filter the spices based on the search term
  const filteredItems = predefinedItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add selected items to the invoice list
  const addSelectedItems = () => {
    const itemsToAdd = selectedItems.filter(selectedItem => {
      const availableItem = predefinedItems.find(item => item.name === selectedItem.name);
      return availableItem && selectedItem.quantity <= availableItem.quantity; // Check if selected quantity is available
    });

    if (itemsToAdd.length === 0) {
      alert("Selected item quantities exceed available stock.");
      return;
    }

    setItems([...items, ...itemsToAdd]);
    setSelectedItems([]); // Clear selected items
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

  // Calculate subtotal
  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.total, 0);
  };

  // Check stock availability
  const areItemsInStock = () => {
    for (let item of items) {
      const availableItem = predefinedItems.find(i => i.id === item.id);
      if (!availableItem || item.quantity > availableItem.quantity) {
        alert(`Not enough stock for ${item.name}`);
        return false; // Return false if any item is out of stock
      }
    }
    return true; // All items are in stock
  };

  // Update Firebase after an item is added to the invoice (deduct the quantity)
  const updateBudget = async () => {
    for (let item of items) {
      const itemDoc = doc(db, "spices", item.id);
      const availableItem = predefinedItems.find(i => i.id === item.id);
      const newQuantity = availableItem.quantity - item.quantity; // Subtract sold quantity from available quantity

      if (newQuantity >= 0) {
        await updateDoc(itemDoc, { quantity: newQuantity }); // Update Firebase with new quantity
      } else {
        alert(`Not enough stock for ${item.name}`); // Notify if stock is insufficient
      }
    }
  };

  // Save invoice data to Firebase
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
      await addDoc(collection(db, "invoices"), invoiceData); // Save invoice to the "invoices" collection
      alert("Invoice saved successfully.");
    } catch (error) {
      console.error("Error saving invoice: ", error);
    }
  };

  // Handle print and save actions
  const handlePrint = async () => {
    if (!areItemsInStock()) {
      return; // If items are not in stock, stop further execution
    }

    await updateBudget(); // Update the budget in Firebase
    await saveInvoiceToFirebase(); // Save invoice to Firebase
    window.print(); // Print the invoice
    resetForm(); // Clear inputs after printing
  };

  // Reset form after print
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
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-md">
      {/* Invoice Header */}
      <div className="text-center mb-8">
        <img src={logo} width='20%' alt="NS Traders" className="mx-auto mb-4 " />
        <h1 className="text-2xl font-bold">NS Traders</h1>
        <p>Your trust is our beleive</p>
        <p>Address:Jaranwala Road,Faisalabad</p>
        <p>Phone no. : Naveed: 03086779747 | Sarwar:03008983848</p>
        <div className="flex justify-between mt-4">
          <div>
            <label>Date: {invoiceDetails.date}</label>
            <br />
            <label>Time: {invoiceDetails.time}</label>
          </div>
          <div className="no-print">
            <label> Customer Name</label>
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

      {/* Display Salesman, Customer Name, and Shop Name */}
      {salesman && invoiceDetails.customerName && invoiceDetails.shopName && (
        <div className="text-center mb-8 print-heading">
          <p className="text-md font-bold">Salesman:{salesman} </p>
          <p className="text-md">Customer name: {invoiceDetails.customerName} </p>
          <p className="text-md"> Customer Shop name:{invoiceDetails.shopName}   </p>
        </div>
      )}

      {/* Multi-Select for Adding Items */}
      <div className="mb-4 no-print">
        <label className="block font-bold">Select</label>
        {/* Search input for spices */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search item"
          className="border border-gray-300 rounded p-2 mb-2 w-full"
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
          className="mt-2 bg-blue-500 text-white rounded p-2"
        >
          Add selected items
        </button>
      </div>

      {/* Invoice Table */}
      <div className="no-print">
        <table className="w-full text-center table-auto border border-collapse border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 p-2">Seriel no.</th>
              <th className="border border-gray-300 p-2">Item Name</th>
              <th className="border border-gray-300 p-2">Quantity</th>
              <th className="border border-gray-300 p-2">Price</th>
              <th className="border border-gray-300 p-2">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">{index + 1}</td>
                <td className="border border-gray-300 p-2">{item.name}</td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    min="1"
                    max={predefinedItems.find((i) => i.name === item.name)?.quantity}
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(index, "quantity", parseInt(e.target.value))
                    }
                    className="border border-gray-300 rounded p-1 w-full"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    min="0"
                    value={item.price}
                    onChange={(e) =>
                      handleItemChange(index, "price", parseFloat(e.target.value))
                    }
                    className="border border-gray-300 rounded p-1 w-full"
                  />
                </td>
                <td className="border border-gray-300 p-2">{item.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Invoice Summary and Actions */}
      <div className="mt-4 no-print">
        <h2 className="font-bold">Total amount: {calculateSubtotal()}</h2>
        <button
          onClick={handlePrint}
          className="mt-2 bg-green-500 text-white rounded p-2"
        >
          Print invoice
        </button>
      </div>
    </div>
  );
};

export default Invoice;
