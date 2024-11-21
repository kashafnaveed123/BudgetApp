import React, { useState, useEffect } from "react";
import { db } from "../config/Firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

const SalesmanProgress = () => {
  const [salesmanData, setSalesmanData] = useState([]);
  const [selectedSalesman, setSelectedSalesman] = useState(null);
  const [expandedSales, setExpandedSales] = useState({});

  // Fetch invoice data from Firebase
  useEffect(() => {
    const fetchData = async () => {
      const invoicesSnapshot = await getDocs(collection(db, "invoices"));
      const invoicesArray = invoicesSnapshot.docs.map((doc) => ({
        id: doc.id, // Include the ID of each invoice
        ...doc.data(),
      }));

      // Group invoices by salesman
      const groupedData = invoicesArray.reduce((acc, invoice) => {
        const { salesman, customerName, shopName, date, total, items } =
          invoice;

        if (!acc[salesman]) {
          acc[salesman] = {
            salesman,
            sales: [],
            totalSales: 0,
          };
        }

        acc[salesman].sales.push({
          id: invoice.id, // Include the invoice ID for each sale
          customerName,
          shopName,
          date,
          total,
          items,
        });

        acc[salesman].totalSales += total;

        return acc;
      }, {});

      setSalesmanData(Object.values(groupedData));
    };

    fetchData();
  }, []);

  // Handle edit functionality for price and quantity
  const handleEditItem = (saleId, itemIndex) => {
    const newPrice = parseFloat(prompt("Enter new price:"));
    const newQuantity = parseInt(prompt("Enter new quantity:"));

    if (!isNaN(newPrice) && !isNaN(newQuantity)) {
      const updatedSalesmanData = salesmanData.map((salesman) => {
        const updatedSales = salesman.sales.map((sale) => {
          if (sale.id === saleId) {
            const updatedItems = sale.items.map((item, i) => {
              if (i === itemIndex) {
                const updatedTotal = newPrice * newQuantity; // Calculate total for the item
                return {
                  ...item,
                  price: newPrice,
                  quantity: newQuantity,
                  total: updatedTotal,
                };
              }
              return item;
            });

            // Recalculate the total for the sale (sum of all item totals)
            const newSaleTotal = updatedItems.reduce(
              (acc, item) => acc + item.total,
              0
            );

            return { ...sale, items: updatedItems, total: newSaleTotal };
          }
          return sale;
        });

        // Recalculate total sales for the salesman
        const newTotalSales = updatedSales.reduce(
          (acc, sale) => acc + sale.total,
          0
        );

        return { ...salesman, sales: updatedSales, totalSales: newTotalSales };
      });

      setSalesmanData(updatedSalesmanData);

      // Update Firebase
      const invoiceRef = doc(db, "invoices", saleId);
      const updatedSale = updatedSalesmanData
        .find((s) => s.sales.some((sale) => sale.id === saleId))
        .sales.find((sale) => sale.id === saleId);

      updateDoc(invoiceRef, {
        items: updatedSale.items,
        total: updatedSale.total, // Update the total for the invoice
      });
    } else {
      alert("Invalid input. Please enter valid numbers.");
    }
  };

  // Handle delete functionality for a specific item
  const handleDeleteItem = async (saleId, itemIndex) => {
    const updatedSalesmanData = salesmanData.map((salesman) => {
      const updatedSales = salesman.sales.map((sale) => {
        if (sale.id === saleId) {
          const itemToDelete = sale.items[itemIndex].total; // Save the total of the item to delete
          const updatedItems = sale.items.filter((_, i) => i !== itemIndex);

          // If no items are left, set the total to 0
          const updatedTotal =
            updatedItems.length === 0
              ? 0
              : updatedItems.reduce((acc, item) => acc + item.total, 0);

          // Subtract the item's total from the salesman's total sales
          const updatedSalesmanTotalSales = salesman.totalSales - itemToDelete;

          return {
            ...sale,
            items: updatedItems,
            total: updatedTotal,
            salesmanTotalSales: updatedSalesmanTotalSales,
          };
        }
        return sale;
      });

      // Recalculate total sales for the salesman
      const newTotalSales = updatedSales.reduce(
        (acc, sale) => acc + sale.total,
        0
      );

      return { ...salesman, sales: updatedSales, totalSales: newTotalSales };
    });

    setSalesmanData(updatedSalesmanData);

    // Update Firebase
    const invoiceRef = doc(db, "invoices", saleId);
    const updatedSale = updatedSalesmanData
      .find((s) => s.sales.some((sale) => sale.id === saleId))
      .sales.find((sale) => sale.id === saleId);

    await updateDoc(invoiceRef, {
      items: updatedSale.items,
      total: updatedSale.total, // Update the total for the invoice
    });
  };

  const toggleExpandSale = (saleIndex) => {
    setExpandedSales((prev) => ({ ...prev, [saleIndex]: !prev[saleIndex] }));
  };

  const handleSalesmanClick = (salesman) => {
    setSelectedSalesman((prev) =>
      prev && prev.salesman === salesman.salesman ? null : salesman
    );
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-gray-100 rounded-xl shadow-md">
      <h1 className="text-3xl text-center text-blue-600 font-bold mb-8">
        Salesman Sales
      </h1>

      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-4 border text-left">Salesman Name</th>
            <th className="p-4 border text-left">Total Sale (PKR)</th>
          </tr>
        </thead>
        <tbody>
          {salesmanData.map((salesman, index) => (
            <React.Fragment key={index}>
              <tr
                className="border-t bg-gray-100 cursor-pointer"
                onClick={() => handleSalesmanClick(salesman)}
              >
                <td className="p-4 border font-bold text-blue-600 hover:underline">
                  {salesman.salesman || "--"}
                </td>
                <td className="p-4 border">{salesman.totalSales || "--"}</td>
              </tr>

              {selectedSalesman &&
                selectedSalesman.salesman === salesman.salesman && (
                  <tr>
                    <td colSpan="2">
                      <table className="min-w-full mt-4 bg-white border border-gray-300 rounded-lg shadow-lg">
                        <thead className="bg-gray-200">
                          <tr>
                            <th className="p-4 border text-left">
                              Customer Name
                            </th>
                            <th className="p-4 border text-left">
                              Customer Shop
                            </th>
                            <th className="p-4 border text-left">Date</th>
                            <th className="p-4 border text-left">
                              Price (PKR)
                            </th>
                            <th className="p-4 border text-left">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {salesman.sales.map((sale, saleIndex) => (
                            <React.Fragment key={saleIndex}>
                              <tr className="border-t">
                                <td className="p-4 border">
                                  {sale.customerName || "--"}
                                </td>
                                <td className="p-4 border">
                                  {sale.shopName || "--"}
                                </td>
                                <td className="p-4 border">
                                  {sale.date || "--"}
                                </td>
                                <td className="p-4 border">
                                  {sale.total || "--"}
                                </td>
                                <td className="p-4 border">
                                  <button
                                    onClick={() => toggleExpandSale(saleIndex)}
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                                  >
                                    {expandedSales[saleIndex]
                                      ? "Hide Details"
                                      : "See More"}
                                  </button>
                                </td>
                              </tr>

                              {expandedSales[saleIndex] && (
                                <tr>
                                  <td colSpan="5" className="border-t">
                                    <table className="min-w-full bg-gray-50">
                                      <thead>
                                        <tr>
                                          <th className="p-4 border text-left">
                                            Item Name
                                          </th>
                                          <th className="p-4 border text-left">
                                            Price
                                          </th>
                                          <th className="p-4 border text-left">
                                            Quantity
                                          </th>
                                          <th className="p-4 border text-left">
                                            Total
                                          </th>
                                          <th className="p-4 border text-left">
                                            Actions
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {sale.items.length === 0 ? (
                                          <tr>
                                            <td
                                              colSpan="5"
                                              className="text-center p-4"
                                            >
                                              No items left.
                                            </td>
                                          </tr>
                                        ) : (
                                          sale.items.map((item, itemIndex) => (
                                            <tr key={itemIndex}>
                                              <td className="p-4 border">
                                                {item.name || "--"}
                                              </td>
                                              <td className="p-4 border">
                                                {item.price || "--"}
                                              </td>
                                              <td className="p-4 border">
                                                {item.quantity || "--"}
                                              </td>
                                              <td className="p-4 border">
                                                {item.total || "--"}
                                              </td>
                                              <td className="p-4 border">
                                                <button
                                                  onClick={() =>
                                                    handleEditItem(
                                                      sale.id,
                                                      itemIndex
                                                    )
                                                  }
                                                  className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                                                >
                                                  Edit
                                                </button>
                                                <button
                                                  onClick={() =>
                                                    handleDeleteItem(
                                                      sale.id,
                                                      itemIndex
                                                    )
                                                  }
                                                  className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                                                >
                                                  Delete
                                                </button>
                                              </td>
                                            </tr>
                                          ))
                                        )}
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesmanProgress;








// import React, { useState, useEffect } from "react";
// import { db } from "../config/Firebase";
// import { collection, getDocs, updateDoc, doc, increment } from "firebase/firestore";

// const SalesmanProgress = () => {
//   const [salesmanData, setSalesmanData] = useState([]);
//   const [expandedSales, setExpandedSales] = useState({});
//   const [selectedSalesman, setSelectedSalesman] = useState(null);  // Define selectedSalesman state

//   useEffect(() => {
//     const fetchData = async () => {
//       const invoicesSnapshot = await getDocs(collection(db, "invoices"));
//       const invoicesArray = invoicesSnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));

//       const groupedData = invoicesArray.reduce((acc, invoice) => {
//         const { salesman, customerName, shopName, date, total, items } = invoice;

//         if (!acc[salesman]) {
//           acc[salesman] = {
//             salesman,
//             sales: [],
//             totalSales: 0,
//           };
//         }

//         acc[salesman].sales.push({
//           id: invoice.id,
//           customerName,
//           shopName,
//           date,
//           total,
//           items,
//         });

//         acc[salesman].totalSales += total;

//         return acc;
//       }, {});

//       setSalesmanData(Object.values(groupedData));
//     };

//     fetchData();
//   }, []);

//   const handleSalesmanClick = (salesman) => {
//     setSelectedSalesman((prev) => (prev === salesman ? null : salesman)); // Toggle selection
//   };

//   const handleEditItem = async (saleId, itemIndex) => {
//     const newPrice = parseFloat(prompt("Enter new price:"));
//     const newQuantity = parseInt(prompt("Enter new quantity:"));

//     if (!isNaN(newPrice) && !isNaN(newQuantity)) {
//       const saleToEdit = salesmanData
//         .flatMap((salesman) => salesman.sales)
//         .find((sale) => sale.id === saleId);

//       if (saleToEdit) {
//         const updatedItem = { ...saleToEdit.items[itemIndex] };
//         const quantityDiff = newQuantity - updatedItem.quantity;
//         const newTotal = newPrice * newQuantity;

//         // Update the stock
//         const stockRef = doc(db, "stock", updatedItem.name); // Assume stock item name matches
//         await updateDoc(stockRef, {
//           quantity: increment(-quantityDiff),
//         });

//         // Update the invoice
//         updatedItem.price = newPrice;
//         updatedItem.quantity = newQuantity;
//         updatedItem.total = newTotal;

//         const updatedItems = [...saleToEdit.items];
//         updatedItems[itemIndex] = updatedItem;

//         const invoiceRef = doc(db, "invoices", saleId);
//         await updateDoc(invoiceRef, {
//           items: updatedItems,
//           total: updatedItems.reduce((sum, item) => sum + item.total, 0),
//         });

//         // Update UI
//         setSalesmanData((prevData) => {
//           return prevData.map((salesman) => ({
//             ...salesman,
//             sales: salesman.sales.map((sale) =>
//               sale.id === saleId
//                 ? {
//                     ...sale,
//                     items: updatedItems,
//                     total: updatedItems.reduce((sum, item) => sum + item.total, 0),
//                   }
//                 : sale
//             ),
//           }));
//         });
//       }
//     } else {
//       alert("Invalid input. Please enter valid numbers.");
//     }
//   };

//   const handleDeleteItem = async (saleId, itemIndex) => {
//     const saleToDelete = salesmanData
//       .flatMap((salesman) => salesman.sales)
//       .find((sale) => sale.id === saleId);

//     if (saleToDelete) {
//       const deletedItem = saleToDelete.items[itemIndex];
//       const updatedItems = saleToDelete.items.filter((_, i) => i !== itemIndex);

//       // Update stock
//       const stockRef = doc(db, "stock", deletedItem.name);
//       await updateDoc(stockRef, {
//         quantity: increment(deletedItem.quantity),
//       });

//       // Update Firebase
//       const invoiceRef = doc(db, "invoices", saleId);
//       await updateDoc(invoiceRef, {
//         items: updatedItems,
//         total: updatedItems.reduce((sum, item) => sum + item.total, 0),
//       });

//       // Update UI
//       setSalesmanData((prevData) => {
//         return prevData.map((salesman) => ({
//           ...salesman,
//           sales: salesman.sales.map((sale) =>
//             sale.id === saleId
//               ? {
//                   ...sale,
//                   items: updatedItems,
//                   total: updatedItems.reduce((sum, item) => sum + item.total, 0),
//                 }
//               : sale
//           ),
//         }));
//       });
//     }
//   };

//   const toggleExpandSale = (saleIndex) => {
//     setExpandedSales((prev) => ({ ...prev, [saleIndex]: !prev[saleIndex] }));
//   };

//   return (
//     <div className="p-8 max-w-4xl mx-auto bg-gray-100 rounded-xl shadow-md">
//       <h1 className="text-3xl text-center text-blue-600 font-bold mb-8">
//         Salesman Sales
//       </h1>

//       <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
//         <thead className="bg-gray-200">
//           <tr>
//             <th className="p-4 border text-left">Salesman Name</th>
//             <th className="p-4 border text-left">Total Sale (PKR)</th>
//           </tr>
//         </thead>
//         <tbody>
//           {salesmanData.map((salesman, index) => (
//             <React.Fragment key={index}>
//               <tr
//                 className="border-t bg-gray-100 cursor-pointer"
//                 onClick={() => handleSalesmanClick(salesman)}
//               >
//                 <td className="p-4 border font-bold text-blue-600 hover:underline">
//                   {salesman.salesman || "--"}
//                 </td>
//                 <td className="p-4 border">{salesman.totalSales || "--"}</td>
//               </tr>

//               {selectedSalesman === salesman && (
//                 <tr>
//                   <td colSpan="2">
//                     <table className="min-w-full mt-4 bg-white border border-gray-300 rounded-lg shadow-lg">
//                       <thead className="bg-gray-200">
//                         <tr>
//                           <th className="p-4 border text-left">
//                             Customer Name
//                           </th>
//                           <th className="p-4 border text-left">
//                             Customer Shop
//                           </th>
//                           <th className="p-4 border text-left">Date</th>
//                           <th className="p-4 border text-left">
//                             Price (PKR)
//                           </th>
//                           <th className="p-4 border text-left">Actions</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {salesman.sales.map((sale, saleIndex) => (
//                           <React.Fragment key={saleIndex}>
//                             <tr className="border-t">
//                               <td className="p-4 border">
//                                 {sale.customerName || "--"}
//                               </td>
//                               <td className="p-4 border">
//                                 {sale.shopName || "--"}
//                               </td>
//                               <td className="p-4 border">{sale.date || "--"}</td>
//                               <td className="p-4 border">{sale.total || "--"}</td>
//                               <td className="p-4 border">
//                                 <button
//                                   onClick={() => toggleExpandSale(saleIndex)}
//                                   className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
//                                 >
//                                   {expandedSales[saleIndex]
//                                     ? "Hide Details"
//                                     : "See More"}
//                                 </button>
//                               </td>
//                             </tr>

//                             {expandedSales[saleIndex] && (
//                               <tr>
//                                 <td colSpan="5" className="border-t">
//                                   <table className="min-w-full bg-gray-50">
//                                     <thead>
//                                       <tr>
//                                         <th className="p-4 border text-left">
//                                           Item Name
//                                         </th>
//                                         <th className="p-4 border text-left">
//                                           Price
//                                         </th>
//                                         <th className="p-4 border text-left">
//                                           Quantity
//                                         </th>
//                                         <th className="p-4 border text-left">
//                                           Total
//                                         </th>
//                                         <th className="p-4 border text-left">
//                                           Actions
//                                         </th>
//                                       </tr>
//                                     </thead>
//                                     <tbody>
//                                       {sale.items.length === 0 ? (
//                                         <tr>
//                                           <td
//                                             colSpan="5"
//                                             className="text-center p-4"
//                                           >
//                                             No items left.
//                                           </td>
//                                         </tr>
//                                       ) : (
//                                         sale.items.map((item, itemIndex) => (
//                                           <tr key={itemIndex}>
//                                             <td className="p-4 border">
//                                               {item.name || "--"}
//                                             </td>
//                                             <td className="p-4 border">
//                                               {item.price || "--"}
//                                             </td>
//                                             <td className="p-4 border">
//                                               {item.quantity || "--"}
//                                             </td>
//                                             <td className="p-4 border">
//                                               {item.total || "--"}
//                                             </td>
//                                             <td className="p-4 border">
//                                               <button
//                                                 onClick={() =>
//                                                   handleEditItem(sale.id, itemIndex)
//                                                 }
//                                                 className="mr-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
//                                               >
//                                                 Edit
//                                               </button>
//                                               <button
//                                                 onClick={() =>
//                                                   handleDeleteItem(sale.id, itemIndex)
//                                                 }
//                                                 className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//                                               >
//                                                 Delete
//                                               </button>
//                                             </td>
//                                           </tr>
//                                         ))
//                                       )}
//                                     </tbody>
//                                   </table>
//                                 </td>
//                               </tr>
//                             )}
//                           </React.Fragment>
//                         ))}
//                       </tbody>
//                     </table>
//                   </td>
//                 </tr>
//               )}
//             </React.Fragment>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default SalesmanProgress;
