// import React, { useState, useEffect } from "react";
// import { db } from "./config/Firebase";
// import {
//   collection,
//   addDoc,
//   getDocs,
//   updateDoc,
//   deleteDoc,
//   doc,
// } from "firebase/firestore";

// const Stock = () => {
//   const [spices, setSpices] = useState([]);
//   const [editingSpice, setEditingSpice] = useState(null);
//   const [newSpice, setNewSpice] = useState({ name: "", quantity: 0 });

//   const spiceOptions = [
//    "Kheermix (145g)(M)",
//     "Pista Kheermix (145g)(M)",
//     "Custurd strawberry(250g)(M)",
//     "Cuturd Mango(250g)(M)",
//     "Cuturd Vanilla(250g)(M)",
//     "Custurd Banana(250g)(M)",
//     "Custurd strawberry(100g)(M)",
//     "Cuturd Mango(100g)(M)",
//     "Cuturd banana(100g)(M)",
//     "Cuturd Vanilla(100g)(M)",
//     "Glucose(100g)(M)",
//     "Anerjel (M)",
//     "Biryani sachet(M)",
//     "Qorma masala sachet (M)",
//     "Karahi Ghosht sachet(M)",
//     "Machli Masala sachet(M)",
//     "Garam masla sachet(M)",
//     "kaali mirch sachet(M)",
//      "Haldi sachet(M)",
//      "Laal Mirch sachet(M)",
//      "Chaat masala sachet(M)",
//     "Murgi masala sachet(M) ",
//     "Dhaniya powder sachet(M)",
//     "Kabli Pulao(50g)(M)",
//     "Special Bombay Biryani(45)(M)",
//     "Biryani(45g)(M)",
//     "Qorma(45g)(M)",
//     "Karahi Gosht masala(45g)(M)",
//      "Achar Gosht masala(45g)(M)",
//      "Brost masala(45g)(M)",
//     "Tikka Boti masala(45g)(M)",
//     "Chicken Tikka masala(45g)(M)",
//     "Haleem masala(45g)(M)",
//     "Murgi masala(45g)(M)",
//     "Machli masala(45g)(M)",
//      "Haldi powder(45g)",
//      "Dhaniya Powder(45g)(M)",
//     "Chaat Masala(45g)(M)",
//     "Fruit Chaat(25g)(M)",
//     "Garam masala(25g)(M)",
//     "Kaali Mirch (25g)(M)",
//      "laal Mirch(45g)(M)",
//     "Adrak Powder(45g)(M)",
//      "lehsan(45g)(M)",
//      "Qasori Meethi(25g)(M)",
//       "Dalia (100g)(M)",
//       "Ispaghol chilka(M)",
//       "Ispaghol Chilka Large Sachet(M)",
//       "Biryani masala large sachet(M)",
//      "Qorma masala large sachet(M)",
//      "Karahi Gosht Masala large sachet(M)",
//      "Achar Gosht Masala large sachet(M)",
//      "Achar Gosht Masala sachet(M)",
//     "Strawberry Custurd sachet(M)",
//     "Mango Custurd sachet(M)",
//     "Banana Custurd sachet(M)",
//     "Vinallia Custurd sachet(M)",
//     "Sawaiya(M)",
//     "Saalan masala(M)",
//      "Laal Mirch(R)",
//     "Dadar Mirch(R)",
//     "Kaali Mirch(R)",
//     "Kaali Mirch Powder(R)",
//     "Haldi (R)",
//      "Dhaniya (R)",
//      "Dhaniya Powder(R)",
//     "Anaar Daana(R)",
//     "Daar Cheeni(R)",
//     "Moti Ilaichi(R)",
//     "Saagu Daana(R)",
//      "Zarda Rang(R)",
//     "Sogi (R)",
//     "Khopra Giri(R)",
//     "Finger Chips(R)",
//     "Rewari(R)",
//     "Zeera(R)",
//     "Loung(R)",
//     "Ispaghol Chilka(R)",
//     "Imli(R)",
//     "Khushk Soonf(R)",
//     "Ajwain(R)",
//      "Meetha Soda(R)",
//     "Nimko(R)",
//     "Meethi soonf(R)",
//     "Chane(R)",
//     "Badaam(R)(20Rs)",
//     "Sabz Ilaichi(R)(20Rs)",
//     "Khajoor(R)(20)",
//     " Nimko(R) (20)",
//     " Qasoori Meethi(R)",
//     " Garam Masala(R)",
//     " Saabat Garam Masala(R)",
//   ];

//   // Fetch spices from Firebase on component mount
//   useEffect(() => {
//     const fetchSpices = async () => {
//       const querySnapshot = await getDocs(collection(db, "spices"));
//       const spicesArray = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setSpices(spicesArray);
//     };
//     fetchSpices();
//   }, []);

//   // Add new spice to Firebase
//   const addSpice = async () => {
//     if (newSpice.name && newSpice.quantity) {
//       const docRef = await addDoc(collection(db, "spices"), newSpice);
//       setSpices([...spices, { ...newSpice, id: docRef.id }]);
//       setNewSpice({ name: "", quantity: 0 });
//     }
//   };

//   // Save edited spice to Firebase
//   const saveSpice = async (spice) => {
//     const spiceDoc = doc(db, "spices", spice.id);
//     await updateDoc(spiceDoc, spice);
//     const updatedSpices = spices.map((s) => (s.id === spice.id ? spice : s));
//     setSpices(updatedSpices);
//     setEditingSpice(null); // Exit edit mode
//   };

//   // Delete spice from Firebase
//   const deleteSpice = async (id) => {
//     await deleteDoc(doc(db, "spices", id));
//     setSpices(spices.filter((s) => s.id !== id));
//   };

//   return (
//     <div className="p-8 max-w-4xl mx-auto bg-white shadow-md">
//       <h1 className="text-2xl font-bold mb-4">Spice Stock Manager</h1>

//       {/* Add New Spice Form */}
//       <div className="mb-4">
//         <h2 className="text-lg font-bold">Add New Spice</h2>
//         <div className="flex items-center space-x-2">
//           {/* Dropdown for spice selection */}
//           <select
//             value={newSpice.name}
//             onChange={(e) => setNewSpice({ ...newSpice, name: e.target.value })}
//             className="border border-gray-300 rounded p-2"
//           >
//             <option value="" disabled>
//               Select Spice
//             </option>
//             {spiceOptions.map((option, index) => (
//               <option key={index} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>
//           <input
//             type="number"
//             placeholder="Quantity"
//             value={newSpice.quantity}
//             onChange={(e) =>
//               setNewSpice({ ...newSpice, quantity: parseFloat(e.target.value) })
//             }
//             className="border border-gray-300 rounded p-2"
//           />
//           <button
//             onClick={addSpice}
//             className="bg-green-500 text-white p-2 rounded"
//           >
//             Add Spice
//           </button>
//         </div>
//       </div>

//       {/* Spice Table */}
//       <table className="table-auto w-full mb-4 border-collapse border">
//         <thead>
//           <tr>
//             <th className="border p-2 text-left">Spice Name</th>
//             <th className="border p-2 text-left">Quantity</th>
//             <th className="border p-2 text-left">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {spices && spices.length > 0 ? (
//             spices.map((spice, index) => {
//               if (!spice) return null; // Skip null or undefined spices

//               return (
//                 <tr key={spice.id || index}>
//                   {editingSpice?.id === spice.id ? (
//                     <>
//                       <td className="border p-2">
//                         <input
//                           type="text"
//                           value={editingSpice.name}
//                           onChange={(e) =>
//                             setEditingSpice({
//                               ...editingSpice,
//                               name: e.target.value,
//                             })
//                           }
//                           className="w-full"
//                         />
//                       </td>
//                       <td className="border p-2">
//                         <input
//                           type="number"
//                           value={editingSpice.quantity}
//                           onChange={(e) =>
//                             setEditingSpice({
//                               ...editingSpice,
//                               quantity: parseFloat(e.target.value),
//                             })
//                           }
//                           className="w-full"
//                         />
//                       </td>
//                       <td className="border p-2">
//                         <button
//                           onClick={() => saveSpice(editingSpice)}
//                           className="bg-blue-500 text-white p-2 rounded"
//                         >
//                           Save
//                         </button>
//                       </td>
//                     </>
//                   ) : (
//                     <>
//                       <td className="border p-2">{spice.name}</td>
//                       <td className="border p-2">{spice.quantity}</td>
//                       <td className="border p-2 flex space-x-2">
//                         <button
//                           onClick={() => setEditingSpice(spice)}
//                           className="bg-yellow-500 text-white p-2 rounded"
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => deleteSpice(spice.id)}
//                           className="bg-red-500 text-white p-2 rounded"
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </>
//                   )}
//                 </tr>
//               );
//             })
//           ) : (
//             <tr>
//               <td colSpan="3" className="text-center p-4">
//                 No spices added yet.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Stock;







// import React, { useState, useEffect } from "react";
// import { db } from "./config/Firebase";
// import {
//   collection,
//   addDoc,
//   getDocs,
//   updateDoc,
//   deleteDoc,
//   doc,
// } from "firebase/firestore";

// const Stock = () => {
//   const [spices, setSpices] = useState([]);
//   const [editingSpice, setEditingSpice] = useState(null);
//   const [newSpice, setNewSpice] = useState({ name: "", quantity: 0 });
//   const [searchQuery, setSearchQuery] = useState(""); // For search functionality

//   const spiceOptions = [
//        "Kheermix (145g)(M)",
//         "Pista Kheermix (145g)(M)",
//         "Custurd strawberry(250g)(M)",
//         "Cuturd Mango(250g)(M)",
//         "Cuturd Vanilla(250g)(M)",
//         "Custurd Banana(250g)(M)",
//         "Custurd strawberry(100g)(M)",
//         "Cuturd Mango(100g)(M)",
//         "Cuturd banana(100g)(M)",
//         "Cuturd Vanilla(100g)(M)",
//         "Glucose(100g)(M)",
//         "Anerjel (M)",
//         "Biryani sachet(M)",
//         "Qorma masala sachet (M)",
//         "Karahi Ghosht sachet(M)",
//         "Machli Masala sachet(M)",
//         "Garam masla sachet(M)",
//         "kaali mirch sachet(M)",
//          "Haldi sachet(M)",
//          "Laal Mirch sachet(M)",
//          "Chaat masala sachet(M)",
//         "Murgi masala sachet(M) ",
//         "Dhaniya powder sachet(M)",
//         "Kabli Pulao(50g)(M)",
//         "Special Bombay Biryani(45)(M)",
//         "Biryani(45g)(M)",
//         "Qorma(45g)(M)",
//         "Karahi Gosht masala(45g)(M)",
//          "Achar Gosht masala(45g)(M)",
//          "Brost masala(45g)(M)",
//         "Tikka Boti masala(45g)(M)",
//         "Chicken Tikka masala(45g)(M)",
//         "Haleem masala(45g)(M)",
//         "Murgi masala(45g)(M)",
//         "Machli masala(45g)(M)",
//          "Haldi powder(45g)",
//          "Dhaniya Powder(45g)(M)",
//         "Chaat Masala(45g)(M)",
//         "Fruit Chaat(25g)(M)",
//         "Garam masala(25g)(M)",
//         "Kaali Mirch (25g)(M)",
//          "laal Mirch(45g)(M)",
//         "Adrak Powder(45g)(M)",
//          "lehsan(45g)(M)",
//          "Qasori Meethi(25g)(M)",
//           "Dalia (100g)(M)",
//           "Ispaghol chilka(M)",
//           "Ispaghol Chilka Large Sachet(M)",
//           "Biryani masala large sachet(M)",
//          "Qorma masala large sachet(M)",
//          "Karahi Gosht Masala large sachet(M)",
//          "Achar Gosht Masala large sachet(M)",
//          "Achar Gosht Masala sachet(M)",
//         "Strawberry Custurd sachet(M)",
//         "Mango Custurd sachet(M)",
//         "Banana Custurd sachet(M)",
//         "Vinallia Custurd sachet(M)",
//         "Sawaiya(M)",
//         "Saalan masala(M)",
//          "Laal Mirch(R)",
//         "Dadar Mirch(R)",
//         "Kaali Mirch(R)",
//         "Kaali Mirch Powder(R)",
//         "Haldi (R)",
//          "Dhaniya (R)",
//          "Dhaniya Powder(R)",
//         "Anaar Daana(R)",
//         "Daar Cheeni(R)",
//         "Moti Ilaichi(R)",
//         "Saagu Daana(R)",
//          "Zarda Rang(R)",
//         "Sogi (R)",
//         "Khopra Giri(R)",
//         "Finger Chips(R)",
//         "Rewari(R)",
//         "Zeera(R)",
//         "Loung(R)",
//         "Ispaghol Chilka(R)",
//         "Imli(R)",
//         "Khushk Soonf(R)",
//         "Ajwain(R)",
//          "Meetha Soda(R)",
//         "Nimko(R)",
//         "Meethi soonf(R)",
//         "Chane(R)",
//         "Badaam(R)(20Rs)",
//         "Sabz Ilaichi(R)(20Rs)",
//         "Khajoor(R)(20)",
//         " Nimko(R) (20)",
//         " Qasoori Meethi(R)",
//         " Garam Masala(R)",
//         " Saabat Garam Masala(R)",
//       ];

//   // Fetch spices from Firebase on component mount
//   useEffect(() => {
//     const fetchSpices = async () => {
//       const querySnapshot = await getDocs(collection(db, "spices"));
//       const spicesArray = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setSpices(spicesArray);
//     };
//     fetchSpices();
//   }, []);

//   // Add new spice to Firebase
//   const addSpice = async () => {
//     if (newSpice.name && newSpice.quantity) {
//       const docRef = await addDoc(collection(db, "spices"), newSpice);
//       setSpices([...spices, { ...newSpice, id: docRef.id }]);
//       setNewSpice({ name: "", quantity: 0 });
//     }
//   };

//   // Save edited spice to Firebase
//   const saveSpice = async (spice) => {
//     const spiceDoc = doc(db, "spices", spice.id);
//     await updateDoc(spiceDoc, spice);
//     const updatedSpices = spices.map((s) => (s.id === spice.id ? spice : s));
//     setSpices(updatedSpices);
//     setEditingSpice(null); // Exit edit mode
//   };

//   // Delete spice from Firebase
//   const deleteSpice = async (id) => {
//     await deleteDoc(doc(db, "spices", id));
//     setSpices(spices.filter((s) => s.id !== id));
//   };

//   // Filter the spices based on the search query
//   const filteredSpices = spiceOptions.filter((spice) =>
//     spice.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="p-8 max-w-4xl mx-auto bg-white shadow-md">
//       <h1 className="text-2xl font-bold mb-4">Spice Stock Manager</h1>

//       {/* Add New Spice Form */}
//       <div className="mb-4">
//         <h2 className="text-lg font-bold">Add New Spice</h2>
//         <div className="flex items-center space-x-2">
//           {/* Search bar for spice selection */}
//           <input
//             type="text"
//             placeholder="Search spices..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="border border-gray-300 rounded p-2"
//           />
//           {/* Dropdown for spice selection */}
//           <select
//             value={newSpice.name}
//             onChange={(e) => setNewSpice({ ...newSpice, name: e.target.value })}
//             className="border border-gray-300 rounded p-2"
//           >
//             <option value="" disabled>
//               Select Spice
//             </option>
//             {filteredSpices.map((option, index) => (
//               <option key={index} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>
//           <input
//             type="number"
//             placeholder="Quantity"
//             value={newSpice.quantity}
//             onChange={(e) =>
//               setNewSpice({ ...newSpice, quantity: parseFloat(e.target.value) })
//             }
//             className="border border-gray-300 rounded p-2"
//           />
//           <button
//             onClick={addSpice}
//             className="bg-green-500 text-white p-2 rounded"
//           >
//             Add Spice
//           </button>
//         </div>
//       </div>

//       {/* Spice Table */}
//       <table className="table-auto w-full mb-4 border-collapse border">
//         <thead>
//           <tr>
//             <th className="border p-2 text-left">Spice Name</th>
//             <th className="border p-2 text-left">Quantity</th>
//             <th className="border p-2 text-left">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {spices && spices.length > 0 ? (
//             spices.map((spice, index) => {
//               if (!spice) return null; // Skip null or undefined spices

//               return (
//                 <tr key={spice.id || index}>
//                   {editingSpice?.id === spice.id ? (
//                     <>
//                       <td className="border p-2">
//                         <input
//                           type="text"
//                           value={editingSpice.name}
//                           onChange={(e) =>
//                             setEditingSpice({
//                               ...editingSpice,
//                               name: e.target.value,
//                             })
//                           }
//                           className="w-full"
//                         />
//                       </td>
//                       <td className="border p-2">
//                         <input
//                           type="number"
//                           value={editingSpice.quantity}
//                           onChange={(e) =>
//                             setEditingSpice({
//                               ...editingSpice,
//                               quantity: parseFloat(e.target.value),
//                             })
//                           }
//                           className="w-full"
//                         />
//                       </td>
//                       <td className="border p-2">
//                         <button
//                           onClick={() => saveSpice(editingSpice)}
//                           className="bg-blue-500 text-white p-2 rounded"
//                         >
//                           Save
//                         </button>
//                       </td>
//                     </>
//                   ) : (
//                     <>
//                       <td className="border p-2">{spice.name}</td>
//                       <td className="border p-2">{spice.quantity}</td>
//                       <td className="border p-2 flex space-x-2">
//                         <button
//                           onClick={() => setEditingSpice(spice)}
//                           className="bg-yellow-500 text-white p-2 rounded"
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => deleteSpice(spice.id)}
//                           className="bg-red-500 text-white p-2 rounded"
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </>
//                   )}
//                 </tr>
//               );
//             })
//           ) : (
//             <tr>
//               <td colSpan="3" className="text-center p-4">
//                 No spices added yet.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Stock;



// import React, { useState, useEffect } from "react";
// import { db } from "./config/Firebase";
// import {
//   collection,
//   addDoc,
//   getDocs,
//   updateDoc,
//   deleteDoc,
//   doc,
// } from "firebase/firestore";

// const Stock = () => {
//   const [spices, setSpices] = useState([]);
//   const [editingSpice, setEditingSpice] = useState(null);
//   const [newSpice, setNewSpice] = useState({ name: "", quantity: 0 });
//   const [searchQuery, setSearchQuery] = useState(""); // For search functionality

  // const spiceOptions = [
  //   "Kheermix (145g)(M)", "Pista Kheermix (145g)(M)", "Custurd strawberry(250g)(M)", "Cuturd Mango(250g)(M)",
  //   "Cuturd Vanilla(250g)(M)", "Custurd Banana(250g)(M)", "Custurd strawberry(100g)(M)", "Cuturd Mango(100g)(M)",
  //   "Cuturd banana(100g)(M)", "Cuturd Vanilla(100g)(M)", "Glucose(100g)(M)", "Anerjel (M)", "Biryani sachet(M)", 
  //   "Qorma masala sachet (M)", "Karahi Ghosht sachet(M)", "Machli Masala sachet(M)", "Garam masla sachet(M)", 
  //   "kaali mirch sachet(M)", "Haldi sachet(M)", "Laal Mirch sachet(M)", "Chaat masala sachet(M)", "Murgi masala sachet(M)", 
  //   "Dhaniya powder sachet(M)", "Kabli Pulao(50g)(M)", "Special Bombay Biryani(45)(M)", "Biryani(45g)(M)", 
  //   "Qorma(45g)(M)", "Karahi Gosht masala(45g)(M)", "Achar Gosht masala(45g)(M)", "Brost masala(45g)(M)", 
  //   "Tikka Boti masala(45g)(M)", "Chicken Tikka masala(45g)(M)", "Haleem masala(45g)(M)", "Murgi masala(45g)(M)", 
  //   "Machli masala(45g)(M)", "Haldi powder(45g)", "Dhaniya Powder(45g)(M)", "Chaat Masala(45g)(M)", "Fruit Chaat(25g)(M)", 
  //   "Garam masala(25g)(M)", "Kaali Mirch (25g)(M)", "laal Mirch(45g)(M)", "Adrak Powder(45g)(M)", "lehsan(45g)(M)", 
  //   "Qasori Meethi(25g)(M)", "Dalia (100g)(M)", "Ispaghol chilka(M)", "Ispaghol Chilka Large Sachet(M)", 
  //   "Biryani masala large sachet(M)", "Qorma masala large sachet(M)", "Karahi Gosht Masala large sachet(M)", 
  //   "Achar Gosht Masala large sachet(M)", "Achar Gosht Masala sachet(M)", "Strawberry Custurd sachet(M)", 
  //   "Mango Custurd sachet(M)", "Banana Custurd sachet(M)", "Vinallia Custurd sachet(M)", "Sawaiya(M)", 
  //   "Saalan masala(M)", "Laal Mirch(R)", "Dadar Mirch(R)", "Kaali Mirch(R)", "Kaali Mirch Powder(R)", "Haldi (R)", 
  //   "Dhaniya (R)", "Dhaniya Powder(R)", "Anaar Daana(R)", "Daar Cheeni(R)", "Moti Ilaichi(R)", "Saagu Daana(R)", 
  //   "Zarda Rang(R)", "Sogi (R)", "Khopra Giri(R)", "Finger Chips(R)", "Rewari(R)", "Zeera(R)", "Loung(R)", 
  //   "Ispaghol Chilka(R)", "Imli(R)", "Khushk Soonf(R)", "Ajwain(R)", "Meetha Soda(R)", "Nimko(R)", "Meethi soonf(R)", 
  //   "Chane(R)", "Badaam(R)(20Rs)", "Sabz Ilaichi(R)(20Rs)", "Khajoor(R)(20)", "Nimko(R) (20)", "Qasoori Meethi(R)", 
  //   "Garam Masala(R)", "Saabat Garam Masala(R)"
  // ];

//   // Fetch spices from Firebase on component mount
//   useEffect(() => {
//     const fetchSpices = async () => {
//       const querySnapshot = await getDocs(collection(db, "spices"));
//       const spicesArray = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setSpices(spicesArray);
//     };
//     fetchSpices();
//   }, []);

//   // Add new spice to Firebase
//   const addSpice = async () => {
//     if (newSpice.name && newSpice.quantity) {
//       const docRef = await addDoc(collection(db, "spices"), newSpice);
//       setSpices([...spices, { ...newSpice, id: docRef.id }]);
//       setNewSpice({ name: "", quantity: 0 });
//     }
//   };

//   // Save edited spice to Firebase
//   const saveSpice = async (spice) => {
//     const spiceDoc = doc(db, "spices", spice.id);
//     await updateDoc(spiceDoc, spice);
//     const updatedSpices = spices.map((s) => (s.id === spice.id ? spice : s));
//     setSpices(updatedSpices);
//     setEditingSpice(null); // Exit edit mode
//   };

//   // Delete spice from Firebase
//   const deleteSpice = async (id) => {
//     await deleteDoc(doc(db, "spices", id));
//     setSpices(spices.filter((s) => s.id !== id));
//   };

//   // Filter spices for dropdown based on search query
//   const filteredSpices = spiceOptions.filter((spice) =>
//     spice.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="p-8 max-w-4xl mx-auto bg-white shadow-md">
//       <h1 className="text-2xl font-bold mb-4">Spice Stock Manager</h1>

//       {/* Add New Spice Form */}
//       <div className="mb-4">
//         <h2 className="text-lg font-bold">Add New Spice</h2>
//         <div className="flex items-center space-x-2">
//           {/* Search bar for spice selection */}
//           <input
//             type="text"
//             placeholder="Search spices..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="border border-gray-300 rounded p-2"
//           />
//           <div className="relative">
//             {/* Dropdown for filtered spice options */}
//             <select
//               value={newSpice.name}
//               onChange={(e) => setNewSpice({ ...newSpice, name: e.target.value })}
//               className="border border-gray-300 rounded p-2 w-full"
//             >
//               <option value="" disabled>
//                 Select Spice
//               </option>
//               {filteredSpices.map((option, index) => (
//                 <option key={index} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>
//             {/* Dropdown list of recommendations */}
//             {filteredSpices.length > 0 && (
//               <ul className="absolute z-10 bg-white border border-gray-300 mt-1 max-h-60 w-full overflow-y-auto">
//                 {filteredSpices.map((option, index) => (
//                   <li
//                     key={index}
//                     className="p-2 hover:bg-gray-200 cursor-pointer"
//                     onClick={() => setNewSpice({ ...newSpice, name: option })}
//                   >
//                     {option}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//           <input
//             type="number"
//             placeholder="Quantity"
//             value={newSpice.quantity}
//             onChange={(e) =>
//               setNewSpice({ ...newSpice, quantity: parseFloat(e.target.value) })
//             }
//             className="border border-gray-300 rounded p-2"
//           />
//           <button
//             onClick={addSpice}
//             className="bg-green-500 text-white p-2 rounded"
//           >
//             Add Spice
//           </button>
//         </div>
//       </div>

//       {/* Spice Table */}
//       <table className="table-auto w-full mb-4 border-collapse border">
//         <thead>
//           <tr>
//             <th className="border p-2 text-left">Spice Name</th>
//             <th className="border p-2 text-left">Quantity</th>
//             <th className="border p-2 text-left">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {spices.map((spice) => (
//             <tr key={spice.id}>
//               <td className="border p-2">
//                 {editingSpice === spice.id ? (
//                   <input
//                     type="text"
//                     value={spice.name}
//                     onChange={(e) =>
//                       setEditingSpice({ ...spice, name: e.target.value })
//                     }
//                   />
//                 ) : (
//                   spice.name
//                 )}
//               </td>
//               <td className="border p-2">
//                 {editingSpice === spice.id ? (
//                   <input
//                     type="number"
//                     value={spice.quantity}
//                     onChange={(e) =>
//                       setEditingSpice({
//                         ...spice,
//                         quantity: parseFloat(e.target.value),
//                       })
//                     }
//                   />
//                 ) : (
//                   spice.quantity
//                 )}
//               </td>
//               <td className="border p-2">
//                 {editingSpice === spice.id ? (
//                   <button
//                     onClick={() => saveSpice(spice)}
//                     className="bg-blue-500 text-white p-2 rounded"
//                   >
//                     Save
//                   </button>
//                 ) : (
//                   <button
//                     onClick={() => setEditingSpice(spice.id)}
//                     className="bg-yellow-500 text-white p-2 rounded"
//                   >
//                     Edit
//                   </button>
//                 )}
//                 <button
//                   onClick={() => deleteSpice(spice.id)}
//                   className="bg-red-500 text-white p-2 rounded ml-2"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Stock;











// import React, { useState, useEffect } from "react";
// import { db } from "./config/Firebase";
// import {
//   collection,
//   addDoc,
//   getDocs,
//   updateDoc,
//   deleteDoc,
//   doc,
// } from "firebase/firestore";

// const Stock = () => {
//   const [spices, setSpices] = useState([]);
//   const [editingSpice, setEditingSpice] = useState(null);
//   const [newSpice, setNewSpice] = useState({ name: "", quantity: 0 });
//   const [searchQuery, setSearchQuery] = useState(""); // For search functionality
//   const [dropdownOpen, setDropdownOpen] = useState(false); // To control dropdown visibility

//   const spiceOptions = [
//     "Kheermix (145g)(M)", "Pista Kheermix (145g)(M)", "Custurd strawberry(250g)(M)", "Cuturd Mango(250g)(M)",
//     "Cuturd Vanilla(250g)(M)", "Custurd Banana(250g)(M)", "Custurd strawberry(100g)(M)", "Cuturd Mango(100g)(M)",
//     "Cuturd banana(100g)(M)", "Cuturd Vanilla(100g)(M)", "Glucose(100g)(M)", "Anerjel (M)", "Biryani sachet(M)", 
//     "Qorma masala sachet (M)", "Karahi Ghosht sachet(M)", "Machli Masala sachet(M)", "Garam masla sachet(M)", 
//     "kaali mirch sachet(M)", "Haldi sachet(M)", "Laal Mirch sachet(M)", "Chaat masala sachet(M)", "Murgi masala sachet(M)", 
//     "Dhaniya powder sachet(M)", "Kabli Pulao(50g)(M)", "Special Bombay Biryani(45)(M)", "Biryani(45g)(M)", 
//     "Qorma(45g)(M)", "Karahi Gosht masala(45g)(M)", "Achar Gosht masala(45g)(M)", "Brost masala(45g)(M)", 
//     "Tikka Boti masala(45g)(M)", "Chicken Tikka masala(45g)(M)", "Haleem masala(45g)(M)", "Murgi masala(45g)(M)", 
//     "Machli masala(45g)(M)", "Haldi powder(45g)", "Dhaniya Powder(45g)(M)", "Chaat Masala(45g)(M)", "Fruit Chaat(25g)(M)", 
//     "Garam masala(25g)(M)", "Kaali Mirch (25g)(M)", "laal Mirch(45g)(M)", "Adrak Powder(45g)(M)", "lehsan(45g)(M)", 
//     "Qasori Meethi(25g)(M)", "Dalia (100g)(M)", "Ispaghol chilka(M)", "Ispaghol Chilka Large Sachet(M)", 
//     "Biryani masala large sachet(M)", "Qorma masala large sachet(M)", "Karahi Gosht Masala large sachet(M)", 
//     "Achar Gosht Masala large sachet(M)", "Achar Gosht Masala sachet(M)", "Strawberry Custurd sachet(M)", 
//     "Mango Custurd sachet(M)", "Banana Custurd sachet(M)", "Vinallia Custurd sachet(M)", "Sawaiya(M)", 
//     "Saalan masala(M)", "Laal Mirch(R)", "Dadar Mirch(R)", "Kaali Mirch(R)", "Kaali Mirch Powder(R)", "Haldi (R)", 
//     "Dhaniya (R)", "Dhaniya Powder(R)", "Anaar Daana(R)", "Daar Cheeni(R)", "Moti Ilaichi(R)", "Saagu Daana(R)", 
//     "Zarda Rang(R)", "Sogi (R)", "Khopra Giri(R)", "Finger Chips(R)", "Rewari(R)", "Zeera(R)", "Loung(R)", 
//     "Ispaghol Chilka(R)", "Imli(R)", "Khushk Soonf(R)", "Ajwain(R)", "Meetha Soda(R)", "Nimko(R)", "Meethi soonf(R)", 
//     "Chane(R)", "Badaam(R)(20Rs)", "Sabz Ilaichi(R)(20Rs)", "Khajoor(R)(20)", "Nimko(R) (20)", "Qasoori Meethi(R)", 
//     "Garam Masala(R)", "Saabat Garam Masala(R)"
//   ];


//   // Fetch spices from Firebase on component mount
//   useEffect(() => {
//     const fetchSpices = async () => {
//       const querySnapshot = await getDocs(collection(db, "spices"));
//       const spicesArray = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setSpices(spicesArray);
//     };
//     fetchSpices();
//   }, []);

//   // Add new spice to Firebase
//   const addSpice = async () => {
//     if (newSpice.name && newSpice.quantity) {
//       const docRef = await addDoc(collection(db, "spices"), newSpice);
//       setSpices([...spices, { ...newSpice, id: docRef.id }]);
//       setNewSpice({ name: "", quantity: 0 });
//       setDropdownOpen(false); // Close dropdown after adding
//     }
//   };

//   // Save edited spice to Firebase
//   const saveSpice = async (spice) => {
//     const spiceDoc = doc(db, "spices", spice.id);
//     await updateDoc(spiceDoc, spice);
//     const updatedSpices = spices.map((s) => (s.id === spice.id ? spice : s));
//     setSpices(updatedSpices);
//     setEditingSpice(null); // Exit edit mode
//   };

//   // Delete spice from Firebase
//   const deleteSpice = async (id) => {
//     await deleteDoc(doc(db, "spices", id));
//     setSpices(spices.filter((s) => s.id !== id));
//   };

//   // Filter spices for dropdown based on search query
//   const filteredSpices = spiceOptions.filter((spice) =>
//     spice.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Toggle dropdown
//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen); // Toggle dropdown visibility
//   };

//   return (
//     <div className="p-8 max-w-4xl mx-auto bg-white shadow-md">
//       <h1 className="text-2xl font-bold mb-4">Spice Stock Manager</h1>

//       {/* Add New Spice Form */}
//       <div className="mb-4">
//         <h2 className="text-lg font-bold">Add New Spice</h2>
//         <div className="flex items-center space-x-2">
//           {/* Search bar for spice selection */}
//           <input
//             type="text"
//             placeholder="Search spices..."
//             value={searchQuery}
//             onChange={(e) => {
//               setSearchQuery(e.target.value);
//               setDropdownOpen(true); // Open dropdown when typing
//             }}
//             className="border border-gray-300 rounded p-2"
//           />
//           <div className="relative">
//             {/* Dropdown for filtered spice options */}
//             <select
//               value={newSpice.name}
//               onChange={(e) => setNewSpice({ ...newSpice, name: e.target.value })}
//               onClick={toggleDropdown} // Toggle dropdown on click
//               className="border border-gray-300 rounded p-2 w-full"
//             >
//               <option value="" disabled>
//                 Select Spice
//               </option>
//               {filteredSpices.map((option, index) => (
//                 <option key={index} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>
//             {/* Dropdown list of recommendations */}
//             {dropdownOpen && filteredSpices.length > 0 && (
//               <ul className="absolute z-10 bg-white border border-gray-300 mt-1 max-h-60 w-full overflow-y-auto">
//                 {filteredSpices.map((option, index) => (
//                   <li
//                     key={index}
//                     className="p-2 hover:bg-gray-200 cursor-pointer"
//                     onClick={() => {
//                       setNewSpice({ ...newSpice, name: option });
//                       setDropdownOpen(false); // Close dropdown on option click
//                     }}
//                   >
//                     {option}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//           <input
//             type="number"
//             placeholder="Quantity"
//             value={newSpice.quantity}
//             onChange={(e) =>
//               setNewSpice({ ...newSpice, quantity: parseFloat(e.target.value) })
//             }
//             className="border border-gray-300 rounded p-2"
//           />
//           <button
//             onClick={addSpice}
//             className="bg-green-500 text-white p-2 rounded"
//           >
//             Add Spice
//           </button>
//         </div>
//       </div>

//       {/* Spice Table */}
//       <table className="table-auto w-full mb-4 border-collapse border">
//         <thead>
//           <tr>
//             <th className="border p-2 text-left">Spice Name</th>
//             <th className="border p-2 text-left">Quantity</th>
//             <th className="border p-2 text-left">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {spices.map((spice) => (
//             <tr key={spice.id}>
//               <td className="border p-2">
//                 {editingSpice === spice.id ? (
//                   <input
//                     type="text"
//                     value={spice.name}
//                     onChange={(e) =>
//                       setEditingSpice({ ...spice, name: e.target.value })
//                     }
//                   />
//                 ) : (
//                   spice.name
//                 )}
//               </td>
//               <td className="border p-2">
//                 {editingSpice === spice.id ? (
//                   <input
//                     type="number"
//                     value={spice.quantity}
//                     onChange={(e) =>
//                       setEditingSpice({
//                         ...spice,
//                         quantity: parseFloat(e.target.value),
//                       })
//                     }
//                   />
//                 ) : (
//                   spice.quantity
//                 )}
//               </td>
//               <td className="border p-2">
//                 {editingSpice === spice.id ? (
//                   <button
//                     onClick={() => saveSpice(spice)}
//                     className="bg-blue-500 text-white p-2 rounded"
//                   >
//                     Save
//                   </button>
//                 ) : (
//                   <button
//                     onClick={() => setEditingSpice(spice.id)}
//                     className="bg-yellow-500 text-white p-2 rounded"
//                   >
//                     Edit
//                   </button>
//                 )}
//                 <button
//                   onClick={() => deleteSpice(spice.id)}
//                   className="bg-red-500 text-white p-2 rounded ml-2"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Stock;






import React, { useState, useEffect } from "react";
import { db } from "./config/Firebase"; // Ensure this is correctly configured
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const Stock = () => {
  const [spices, setSpices] = useState([]);
  const [editingSpice, setEditingSpice] = useState(null);
  const [newSpice, setNewSpice] = useState({ name: "", quantity: 0 });
  const [searchQuery, setSearchQuery] = useState(""); // For search functionality
  const [dropdownOpen, setDropdownOpen] = useState(false); // To control dropdown visibility

  // List of spice options for dropdown
  const spiceOptions = [
    "Kheermix (145g)(M)", "Pista Kheermix (145g)(M)", "Custurd strawberry(250g)(M)", "Cuturd Mango(250g)(M)",
    "Cuturd Vanilla(250g)(M)", "Custurd Banana(250g)(M)", "Custurd strawberry(100g)(M)", "Cuturd Mango(100g)(M)",
    "Cuturd banana(100g)(M)", "Cuturd Vanilla(100g)(M)", "Glucose(100g)(M)", "Anerjel (M)", "Biryani sachet(M)", 
    "Qorma masala sachet (M)", "Karahi Ghosht sachet(M)", "Machli Masala sachet(M)", "Garam masla sachet(M)", 
    "kaali mirch sachet(M)", "Haldi sachet(M)", "Laal Mirch sachet(M)", "Chaat masala sachet(M)", "Murgi masala sachet(M)", 
    "Dhaniya powder sachet(M)", "Kabli Pulao(50g)(M)", "Special Bombay Biryani(45)(M)", "Biryani(45g)(M)", 
    "Qorma(45g)(M)", "Karahi Gosht masala(45g)(M)", "Achar Gosht masala(45g)(M)", "Brost masala(45g)(M)", 
    "Tikka Boti masala(45g)(M)", "Chicken Tikka masala(45g)(M)", "Haleem masala(45g)(M)", "Murgi masala(45g)(M)", 
    "Machli masala(45g)(M)", "Haldi powder(45g)", "Dhaniya Powder(45g)(M)", "Chaat Masala(45g)(M)", "Fruit Chaat(25g)(M)", 
    "Garam masala(25g)(M)", "Kaali Mirch (25g)(M)", "laal Mirch(45g)(M)", "Adrak Powder(45g)(M)", "lehsan(45g)(M)", 
    "Qasori Meethi(25g)(M)", "Dalia (100g)(M)", "Ispaghol chilka(M)", "Ispaghol Chilka Large Sachet(M)", 
    "Biryani masala large sachet(M)", "Qorma masala large sachet(M)", "Karahi Gosht Masala large sachet(M)", 
    "Achar Gosht Masala large sachet(M)", "Achar Gosht Masala sachet(M)", "Strawberry Custurd sachet(M)", 
    "Mango Custurd sachet(M)", "Banana Custurd sachet(M)", "Vinallia Custurd sachet(M)", "Sawaiya(M)", 
    "Saalan masala(M)", "Laal Mirch(R)", "Dadar Mirch(R)", "Kaali Mirch(R)", "Kaali Mirch Powder(R)", "Haldi (R)", 
    "Dhaniya (R)", "Dhaniya Powder(R)", "Anaar Daana(R)", "Daar Cheeni(R)", "Moti Ilaichi(R)", "Saagu Daana(R)", 
    "Zarda Rang(R)", "Sogi (R)", "Khopra Giri(R)", "Finger Chips(R)", "Rewari(R)", "Zeera(R)", "Loung(R)", 
    "Ispaghol Chilka(R)", "Imli(R)", "Khushk Soonf(R)", "Ajwain(R)", "Meetha Soda(R)", "Nimko(R)", "Meethi soonf(R)", 
    "Chane(R)", "Badaam(R)(20Rs)", "Sabz Ilaichi(R)(20Rs)", "Khajoor(R)(20)", "Nimko(R) (20)", "Qasoori Meethi(R)", 
    "Garam Masala(R)", "Saabat Garam Masala(R)"
  ];

  // Fetch spices from Firebase when the component mounts
  useEffect(() => {
    const fetchSpices = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "spices"));
        const spicesArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSpices(spicesArray);
      } catch (error) {
        console.error("Error fetching spices: ", error);
      }
    };
    fetchSpices();
  }, []);

  // Add a new spice to Firebase
  const addSpice = async () => {
    try {
      if (newSpice.name && newSpice.quantity) {
        const docRef = await addDoc(collection(db, "spices"), newSpice);
        setSpices([...spices, { ...newSpice, id: docRef.id }]);
        setNewSpice({ name: "", quantity: 0 });
        setDropdownOpen(false); // Close dropdown after adding
      } else {
        alert("Please enter both a spice name and quantity.");
      }
    } catch (error) {
      console.error("Error adding spice: ", error);
    }
  };

  // Save the edited spice to Firebase
  const saveSpice = async (spice) => {
    try {
      const spiceDoc = doc(db, "spices", spice.id);
      await updateDoc(spiceDoc, spice);
      const updatedSpices = spices.map((s) => (s.id === spice.id ? spice : s));
      setSpices(updatedSpices);
      setEditingSpice(null); // Exit edit mode
    } catch (error) {
      console.error("Error saving spice: ", error);
    }
  };

  // Delete a spice from Firebase
  const deleteSpice = async (id) => {
    try {
      await deleteDoc(doc(db, "spices", id));
      setSpices(spices.filter((s) => s.id !== id));
    } catch (error) {
      console.error("Error deleting spice: ", error);
    }
  };

  // Filter spices for dropdown based on search query
  const filteredSpices = spiceOptions.filter((spice) =>
    spice.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-md">
      <h1 className="text-2xl font-bold mb-4">Spice Stock Manager</h1>

      {/* Add New Spice Form */}
      <div className="mb-4">
        <h2 className="text-lg font-bold">Add New Spice</h2>
        <div className="flex items-center space-x-2">
          {/* Search bar for spice selection */}
          <input
            type="text"
            placeholder="Search spices..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setDropdownOpen(true); // Open dropdown when typing
            }}
            className="border border-gray-300 rounded p-2"
          />
          <div className="relative">
            {/* Dropdown for filtered spice options */}
            <select
              value={newSpice.name}
              onChange={(e) => setNewSpice({ ...newSpice, name: e.target.value })}
              onClick={toggleDropdown}
              className="border border-gray-300 rounded p-2 w-full"
            >
              <option value="" disabled>Select Spice</option>
              {filteredSpices.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {/* Dropdown list of recommendations */}
            {dropdownOpen && filteredSpices.length > 0 && (
              <ul className="absolute z-10 bg-white border border-gray-300 mt-1 max-h-60 w-full overflow-y-auto">
                {filteredSpices.map((option, index) => (
                  <li
                    key={index}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => {
                      setNewSpice({ ...newSpice, name: option });
                      setDropdownOpen(false);
                    }}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <input
            type="number"
            placeholder="Quantity"
            value={newSpice.quantity}
            onChange={(e) => setNewSpice({ ...newSpice, quantity: Number(e.target.value) })}
            className="border border-gray-300 rounded p-2"
          />
          <button onClick={addSpice} className="bg-blue-500 text-white p-2 rounded">
            Add Spice
          </button>
        </div>
      </div>

      {/* List of Spices */}
      <h2 className="text-lg font-bold mb-2">Spice Inventory</h2>
      <ul className="space-y-2">
        {spices.map((spice) => (
          <li key={spice.id} className="flex items-center justify-between">
            {editingSpice && editingSpice.id === spice.id ? (
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={editingSpice.name}
                  onChange={(e) => setEditingSpice({ ...editingSpice, name: e.target.value })}
                  className="border border-gray-300 rounded p-2"
                />
                <input
                  type="number"
                  value={editingSpice.quantity}
                  onChange={(e) => setEditingSpice({ ...editingSpice, quantity: Number(e.target.value) })}
                  className="border border-gray-300 rounded p-2"
                />
                <button
                  onClick={() => saveSpice(editingSpice)}
                  className="bg-green-500 text-white p-2 rounded"
                >
                  Save
                </button>
              </div>
            ) : (
              <>
                <span>{spice.name} (Quantity: {spice.quantity})</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setEditingSpice(spice)}
                    className="bg-yellow-500 text-white p-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteSpice(spice.id)}
                    className="bg-red-500 text-white p-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Stock;
