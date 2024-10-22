// import React, { useState, useEffect } from "react";
// import { db } from "./config/Firebase"; // Ensure this is correctly configured
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

//   // List of spice options for dropdown
  // const spiceOptions = [
    // "Kheermix (145g)کھیر مکس(M)", "Pista Kheermix (145g)پستہ کھیرمکس(M)", "Custurd strawberry(250g)کسٹرڈاسٹرابری(M)", "Cuturd Mango(250g)کسٹرڈ مینگو(M)",
    // "Cuturd Vanilla(250g)کسٹرڈ ونیلا(M)", "Custurd Banana(250g)کسٹرڈبنانا(M)", "Custurd strawberry(100g)کسٹرڈاسٹرابری(M)", "Cuturd Mango(100g)کسٹرڈ مینگو(M)",
    // "Cuturd banana(100g)کسٹرڈ بنانا(M)", "Cuturd Vanilla(100g)کسٹرڈ ونیلا(M)", "Glucose(100g)گلوکوز(M)", "Anerjelانرجل (M)", "Biryani sachetبریانی ساشہ(M)", 
    // "Qorma masala sachet قورمہ مصالحہ ساشہ(M)", "Karahi Ghosht sachetکڑاہی گوشت ساشہ(M)", "Machli Masala sachet(M)", "Garam masla sachet گرم مصالحہ ساشہ(M)", 
    // "kaali mirch sachetکالی مرچ ساشا(M)", "Haldi sachetہلدی ساشہ(M)", "Laal Mirch sachetلال مرچ (M)", "Chaat masala sachetچاٹ مصالحہ ساشہ(M)", "Murgi masala sachetمرغی مصالحہ ساشہ(M)", 
    // "Dhaniya powder sachetدھنیا پاؤڈر (M)", "Kabli Pulao کابلی پلاؤ (50g)(M)", "Special Bombay Biryani سپیشل بمبئی بریانی (45g)(M)", "Biryaniبریانی(45g)(M)", 
    // "Qormaقورمہ(45g)(M)", "Karahi Gosht masalaکڑاہی گوشت مصالحہ(45g)(M)", "Achar Gosht masalaچار گوشت مصالحہ (45g)(M)", "Brost masalaبروسٹ مصالحہ(45g)(M)", 
    // "Tikka Boti masalaکہ بوٹی مصالحہ(45g)(M)", "Chicken Tikka masalaچکن تکہ مصالحہ(45g)(M)", "Haleem masalaحلیم مصالحہ(45g)(M)", "Murgi masalaمرغی مصالحہ(45g)(M)", 
    // "Machli masalaمچھلی مصالحہ (45g)(M)", "Haldi powderہلدی پاؤڈر(45g)", "Dhaniya Powderدھنیا پاؤڈر (45g)(M)", "Chaat Masalaچاٹ مصالحہ(45g)(M)", "Fruit Chaatفروٹ چاٹ(25g)(M)", 
    // "Garam masalaگرم مصالحہ(25g)(M)", "Kaali Mirchکالی مرچ (25g)(M)", "laal Mirchسرخ مرچ(45g)(M)", "Adrak Powderادرک پاؤڈر(45g)(M)", "lehsanلہسن (45g)(M)", 
    // "Qasori Meethiقصوری میتھی(25g)(M)", "Dalia دلیہ (100g)(M)", "Ispaghol chilkaاسپغول چھلکا(M)", "Ispaghol Chilka Large Sachetاسپغول چھلکا بڑا ساشہ(M)", 
    // "Biryani masala large sachet ریانی مصالحہ بڑا ساشہ(M)", "Qorma masala large sachet قورمہ مصالحہ بڑا ساشہ(M)", "Karahi Gosht Masala large sachet کڑاہی گوشت بڑا مصالحہ(M)", 
    // "Achar Gosht Masala large sachet اچار گوشت بڑا مصالحہ(M) ", "Achar Gosht Masala sachet اچار گوشت مصالحہ ساشہ(M)", "Strawberry Custurd sachetکسٹرڈاسٹرابری ساشہ(M)", 
    // "Mango Custurd sachet کسٹرڈ مینگو ساشہ(M)", "Banana Custurd sachet کسٹرڈ بنانا ساشہ(M)", "Vinallia Custurd sachetکسٹرڈ ونیلا ساشہ(M)", "Sawaiyaسویاں(M)", 
    // "Saalan masalaسالن مصالحہ(M)", "Laal Mirch(R)سرخ مرچ", "Dadar Mirchدادڈ مرچ(R)", "Kaali Mirchکالی مرچ (R)", "Kaali Mirch Powderکالی مرچ پاؤڈر(R)", "Haldi ہلدی(R)", 
    // "Dhaniya,دھنیا (R)", "Dhaniya Powder دھنیاپاؤڈر(R)", "Anaar Daanaاناردانا(R)", "Daar Cheeniدار چینی(R)", "Moti Ilaichموٹی الائچیi(R)", "Saagu Daanaساگو دانا(R)", 
    // "Zarda Rangزردا رنگ(R)", "Sogi سوگی(R)", "Khopra Giriکھوپرا گری(R)", "Finger Chipsفنگر چپس(R)", "Rewariریوڑی(R)", "Zeera زیرا(R)", "Loungلانگ(R)", 
    // "Ispaghol Chilkaچھلکا اسپغول(R)", "Imliاملی(R)", "Khushk Soonfخشک سونف(R)", "Ajwainاجوائن (R)", "Meetha Soda میٹھا سوڈا(R)", "Nimkoنمکو(R)", "Meethi soonfمیٹھی سونف(R)", 
    // "Chaneچنے(R)", "Badaamبادام(R)(20Rs)", "Sabz Ilaichiسبز الائچی(R)(20Rs)", "Khajoorکھجور(R)(20)", "Nimko نمکو (R) (20)", "Qasoori Meethiقصوری میتھی(R)", 
    // "Garam Masalaگرم مصالحہ(R)", "Saabat Garam Masalaثابت گرم مصالحہ(R)"
  // ];

//   // Fetch spices from Firebase when the component mounts
//   useEffect(() => {
//     const fetchSpices = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "spices"));
//         const spicesArray = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setSpices(spicesArray);
//       } catch (error) {
//         console.error("Error fetching spices: ", error);
//       }
//     };
//     fetchSpices();
//   }, []);

//   // Add a new spice to Firebase
//   const addSpice = async () => {
//     try {
//       if (newSpice.name && newSpice.quantity) {
//         const docRef = await addDoc(collection(db, "spices"), newSpice);
//         setSpices([...spices, { ...newSpice, id: docRef.id }]);
//         setNewSpice({ name: "", quantity: 0 });
//         setDropdownOpen(false); // Close dropdown after adding
//       } else {
//         alert("Please enter both a spice name and quantity.");
//       }
//     } catch (error) {
//       console.error("Error adding spice: ", error);
//     }
//   };

//   // Save the edited spice to Firebase
//   const saveSpice = async (spice) => {
//     try {
//       const spiceDoc = doc(db, "spices", spice.id);
//       await updateDoc(spiceDoc, spice);
//       const updatedSpices = spices.map((s) => (s.id === spice.id ? spice : s));
//       setSpices(updatedSpices);
//       setEditingSpice(null); // Exit edit mode
//     } catch (error) {
//       console.error("Error saving spice: ", error);
//     }
//   };

//   // Delete a spice from Firebase
//   const deleteSpice = async (id) => {
//     try {
//       await deleteDoc(doc(db, "spices", id));
//       setSpices(spices.filter((s) => s.id !== id));
//     } catch (error) {
//       console.error("Error deleting spice: ", error);
//     }
//   };

//   // Filter spices for dropdown based on search query
//   const filteredSpices = spiceOptions.filter((spice) =>
//     spice.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   // Toggle dropdown visibility
//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
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
//               onClick={toggleDropdown}
//               className="border border-gray-300 rounded p-2 w-full"
//             >
//               <option value="" disabled>Select Spice</option>
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
//                       setDropdownOpen(false);
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
//             onChange={(e) => setNewSpice({ ...newSpice, quantity: Number(e.target.value) })}
//             className="border border-gray-300 rounded p-2"
//           />
//           <button onClick={addSpice} className="bg-blue-500 text-white p-2 rounded">
//             Add Spice
//           </button>
//         </div>
//       </div>

//       {/* List of Spices */}
//       <h2 className="text-lg font-bold mb-2">Spice Inventory</h2>
//       <ul className="space-y-2">
//         {spices.map((spice) => (
//           <li key={spice.id} className="flex items-center justify-between">
//             {editingSpice && editingSpice.id === spice.id ? (
//               <div className="flex items-center space-x-2">
//                 <input
//                   type="text"
//                   value={editingSpice.name}
//                   onChange={(e) => setEditingSpice({ ...editingSpice, name: e.target.value })}
//                   className="border border-gray-300 rounded p-2"
//                 />
//                 <input
//                   type="number"
//                   value={editingSpice.quantity}
//                   onChange={(e) => setEditingSpice({ ...editingSpice, quantity: Number(e.target.value) })}
//                   className="border border-gray-300 rounded p-2"
//                 />
//                 <button
//                   onClick={() => saveSpice(editingSpice)}
//                   className="bg-green-500 text-white p-2 rounded"
//                 >
//                   Save
//                 </button>
//               </div>
//             ) : (
//               <>
//                 <span>{spice.name} (Quantity: {spice.quantity})</span>
//                 <div className="flex items-center space-x-2">
//                   <button
//                     onClick={() => setEditingSpice(spice)}
//                     className="bg-yellow-500 text-white p-2 rounded"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => deleteSpice(spice.id)}
//                     className="bg-red-500 text-white p-2 rounded"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </>
//             )}
//           </li>
//         ))}
//       </ul>
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
  const [customSpice, setCustomSpice] = useState(""); // For new spice input

  // List of spice options for dropdown
  const [spiceOptions, setSpiceOptions] = useState([
    "Kheermix (145g)کھیر مکس(M)", "Pista Kheermix (145g)پستہ کھیرمکس(M)", "Custurd strawberry(250g)کسٹرڈاسٹرابری(M)", "Cuturd Mango(250g)کسٹرڈ مینگو(M)",
    "Custurd Vanilla(250g)کسٹرڈ ونیلا(M)", "Custurd Banana(250g)کسٹرڈبنانا(M)", "Custurd strawberry(100g)کسٹرڈاسٹرابری(M)", "Cuturd Mango(100g)کسٹرڈ مینگو(M)",
    "Cuturd banana(100g)کسٹرڈ بنانا(M)", "Cuturd Vanilla(100g)کسٹرڈ ونیلا(M)", "Glucose(100g)گلوکوز(M)", "Anerjelانرجل (M)", "Biryani sachetبریانی ساشہ(M)", 
    "Qorma masala sachet قورمہ مصالحہ ساشہ(M)", "Karahi Ghosht sachetکڑاہی گوشت ساشہ(M)", "Machli Masala sachet(M)", "Garam masla sachet گرم مصالحہ ساشہ(M)", 
    "kaali mirch sachetکالی مرچ ساشا(M)", "Haldi sachetہلدی ساشہ(M)", "Laal Mirch sachetلال مرچ (M)", "Chaat masala sachetچاٹ مصالحہ ساشہ(M)", "Murgi masala sachetمرغی مصالحہ ساشہ(M)", 
    "Dhaniya powder sachetدھنیا پاؤڈر (M)", "Kabli Pulao کابلی پلاؤ (50g)(M)", "Special Bombay Biryani سپیشل بمبئی بریانی (45g)(M)", "Biryaniبریانی(45g)(M)", 
    "Qormaقورمہ(45g)(M)", "Karahi Gosht masalaکڑاہی گوشت مصالحہ(45g)(M)", "Achar Gosht masalaچار گوشت مصالحہ (45g)(M)", "Brost masalaبروسٹ مصالحہ(45g)(M)", 
    "Tikka Boti masalaکہ بوٹی مصالحہ(45g)(M)", "Chicken Tikka masalaچکن تکہ مصالحہ(45g)(M)", "Haleem masalaحلیم مصالحہ(45g)(M)", "Murgi masalaمرغی مصالحہ(45g)(M)", 
    "Machli masalaمچھلی مصالحہ (45g)(M)", "Haldi powderہلدی پاؤڈر(45g)", "Dhaniya Powderدھنیا پاؤڈر (45g)(M)", "Chaat Masalaچاٹ مصالحہ(45g)(M)", "Fruit Chaatفروٹ چاٹ(25g)(M)", 
    "Garam masalaگرم مصالحہ(25g)(M)", "Kaali Mirchکالی مرچ (25g)(M)", "laal Mirchسرخ مرچ(45g)(M)", "Adrak Powderادرک پاؤڈر(45g)(M)", "lehsanلہسن (45g)(M)", 
    "Qasori Meethiقصوری میتھی(25g)(M)", "Dalia دلیہ (100g)(M)", "Ispaghol chilkaاسپغول چھلکا(M)", "Ispaghol Chilka Large Sachetاسپغول چھلکا بڑا ساشہ(M)", 
    "Biryani masala large sachet ریانی مصالحہ بڑا ساشہ(M)", "Qorma masala large sachet قورمہ مصالحہ بڑا ساشہ(M)", "Karahi Gosht Masala large sachet کڑاہی گوشت بڑا مصالحہ(M)", 
    "Achar Gosht Masala large sachet اچار گوشت بڑا مصالحہ(M) ", "Achar Gosht Masala sachet اچار گوشت مصالحہ ساشہ(M)", "Strawberry Custurd sachetکسٹرڈاسٹرابری ساشہ(M)", 
    "Mango Custurd sachet کسٹرڈ مینگو ساشہ(M)", "Banana Custurd sachet کسٹرڈ بنانا ساشہ(M)", "Vinallia Custurd sachetکسٹرڈ ونیلا ساشہ(M)", "Sawaiyaسویاں(M)", 
    "Saalan masalaسالن مصالحہ(M)", "Laal Mirch(R)سرخ مرچ", "Dadar Mirchدادڈ مرچ(R)", "Kaali Mirchکالی مرچ (R)", "Kaali Mirch Powderکالی مرچ پاؤڈر(R)", "Haldi ہلدی(R)", 
    "Dhaniya,دھنیا (R)", "Dhaniya Powder دھنیاپاؤڈر(R)", "Anaar Daanaاناردانا(R)", "Daar Cheeniدار چینی(R)", "Moti Ilaichموٹی الائچیi(R)", "Saagu Daanaساگو دانا(R)", 
    "Zarda Rangزردا رنگ(R)", "Sogi سوگی(R)", "Khopra Giriکھوپرا گری(R)", "Finger Chipsفنگر چپس(R)", "Rewariریوڑی(R)", "Zeera زیرا(R)", "Loungلانگ(R)", 
    "Ispaghol Chilkaچھلکا اسپغول(R)", "Imliاملی(R)", "Khushk Soonfخشک سونف(R)", "Ajwainاجوائن (R)", "Meetha Soda میٹھا سوڈا(R)", "Nimkoنمکو(R)", "Meethi soonfمیٹھی سونف(R)", 
    "Chaneچنے(R)", "Badaamبادام(R)(20Rs)", "Sabz Ilaichiسبز الائچی(R)(20Rs)", "Khajoorکھجور(R)(20)", "Nimko نمکو (R) (20)", "Qasoori Meethiقصوری میتھی(R)", 
    "Garam Masalaگرم مصالحہ(R)", "Saabat Garam Masalaثابت گرم مصالحہ(R)"
  ]);

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

  // Add custom spice to the dropdown list
  const addCustomSpice = () => {
    if (customSpice) {
      setSpiceOptions([...spiceOptions, customSpice]);
      setCustomSpice(""); // Clear the input field
    }
  };

  // Filter spices for dropdown based on search query
  const filteredSpices = spiceOptions.filter((spice) =>
    spice.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-md flex">
      

      {/* Right side - Spice manager */}
      <div className="w-3/4">
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
                className="border border-gray-300 rounded p-2 w-full"
              >
                <option value="" disabled>Select Spice</option>
                {filteredSpices.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
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

      {/* Left side - Table for adding new items */}

      <div className="w-1/4 ml-8">
        <h2 className="text-lg font-bold mb-4">Add New Spice Option</h2>
        <table className="w-full border">
          <thead>
            <tr>
              <th className="border px-4 py-2">New Spice Name</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={customSpice}
                  onChange={(e) => setCustomSpice(e.target.value)}
                  className="border p-2 w-full"
                />
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={addCustomSpice}
                  className="bg-blue-500 text-white p-2 rounded"
                >
                  Add
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Stock;



// import React, { useState, useEffect } from "react";
// import { db } from "./config/Firebase"; // Ensure this is correctly configured
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
//   const [customSpice, setCustomSpice] = useState(""); // For new spice input

//   // List of spice options for dropdown
//   const [spiceOptions, setSpiceOptions] = useState([
//     "Kheermix (145g)کھیر مکس(M)", "Pista Kheermix (145g)پستہ کھیرمکس(M)", "Custurd strawberry(250g)کسٹرڈاسٹرابری(M)", "Cuturd Mango(250g)کسٹرڈ مینگو(M)",
//     // Add other spice options here
//   ]);

//   // Fetch spices from Firebase when the component mounts
//   useEffect(() => {
//     const fetchSpices = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "spices"));
//         const spicesArray = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setSpices(spicesArray);
//       } catch (error) {
//         console.error("Error fetching spices: ", error);
//       }
//     };
//     fetchSpices();
//   }, []);

//   // Add a new spice to Firebase
//   const addSpice = async () => {
//     try {
//       if (newSpice.name && newSpice.quantity) {
//         const docRef = await addDoc(collection(db, "spices"), newSpice);
//         setSpices([...spices, { ...newSpice, id: docRef.id }]);
//         setNewSpice({ name: "", quantity: 0 });
//         setDropdownOpen(false); // Close dropdown after adding
//       } else {
//         alert("Please enter both a spice name and quantity.");
//       }
//     } catch (error) {
//       console.error("Error adding spice: ", error);
//     }
//   };

//   // Save the edited spice to Firebase
//   const saveSpice = async (spice) => {
//     try {
//       const spiceDoc = doc(db, "spices", spice.id);
//       await updateDoc(spiceDoc, spice);
//       const updatedSpices = spices.map((s) => (s.id === spice.id ? spice : s));
//       setSpices(updatedSpices);
//       setEditingSpice(null); // Exit edit mode
//     } catch (error) {
//       console.error("Error saving spice: ", error);
//     }
//   };

//   // Delete a spice from Firebase
//   const deleteSpice = async (id) => {
//     try {
//       await deleteDoc(doc(db, "spices", id));
//       setSpices(spices.filter((s) => s.id !== id));
//     } catch (error) {
//       console.error("Error deleting spice: ", error);
//     }
//   };

//   // Add custom spice to the dropdown list
//   const addCustomSpice = () => {
//     if (customSpice) {
//       setSpiceOptions([...spiceOptions, customSpice]);
//       setCustomSpice(""); // Clear the input field
//     }
//   };

//   // Filter spices for dropdown based on search query
//   const filteredSpices = spiceOptions.filter((spice) =>
//     spice.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="p-8 max-w-4xl mx-auto bg-white shadow-md flex">
//       {/* Right side - Spice manager */}
//       <div className="w-3/4">
//         <h1 className="text-2xl font-bold mb-4">Spice Stock Manager</h1>

//         {/* Add New Spice Form */}
//         <div className="mb-4">
//           <h2 className="text-lg font-bold">Add New Spice</h2>
//           <div className="flex items-center space-x-2">
//             {/* Search bar for spice selection */}
//             <input
//               type="text"
//               placeholder="Search spices..."
//               value={searchQuery}
//               onChange={(e) => {
//                 setSearchQuery(e.target.value);
//                 setDropdownOpen(true); // Open dropdown when typing
//               }}
//               className="border border-gray-300 rounded p-2"
//             />
//             <div className="relative">
//               {/* Dropdown for filtered spice options */}
//               <select
//                 value={newSpice.name}
//                 onChange={(e) => setNewSpice({ ...newSpice, name: e.target.value })}
//                 className="border border-gray-300 rounded p-2 w-full"
//               >
//                 <option value="" disabled>Select Spice</option>
//                 {filteredSpices.map((option, index) => (
//                   <option key={index} value={option}>
//                     {option}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <input
//               type="number"
//               placeholder="Quantity"
//               value={newSpice.quantity}
//               onChange={(e) => setNewSpice({ ...newSpice, quantity: Number(e.target.value) })}
//               className="border border-gray-300 rounded p-2"
//             />
//             <button onClick={addSpice} className="bg-blue-500 text-white p-2 rounded">
//               Add Spice
//             </button>
//           </div>
//         </div>

//         {/* List of Spices */}
//         <h2 className="text-lg font-bold mb-2">Spice Inventory</h2>
//         <ul className="space-y-2">
//           {spices.map((spice) => (
//             <li key={spice.id} className="flex items-center justify-between">
//               {editingSpice && editingSpice.id === spice.id ? (
//                 <div className="flex items-center space-x-2">
//                   <input
//                     type="text"
//                     value={editingSpice.name}
//                     onChange={(e) => setEditingSpice({ ...editingSpice, name: e.target.value })}
//                     className="border border-gray-300 rounded p-2"
//                   />
//                   <input
//                     type="number"
//                     value={editingSpice.quantity}
//                     onChange={(e) => setEditingSpice({ ...editingSpice, quantity: Number(e.target.value) })}
//                     className="border border-gray-300 rounded p-2"
//                   />
//                   <button
//                     onClick={() => saveSpice(editingSpice)}
//                     className="bg-green-500 text-white p-2 rounded"
//                   >
//                     Save
//                   </button>
//                 </div>
//               ) : (
//                 <>
//                   <span>{spice.name} (Quantity: {spice.quantity})</span>
//                   <div className="flex items-center space-x-2">
//                     <button
//                       onClick={() => setEditingSpice(spice)}
//                       className="bg-yellow-500 text-white p-2 rounded"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => deleteSpice(spice.id)}
//                       className="bg-red-500 text-white p-2 rounded"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </>
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Left side - Table for adding new items */}
//       <div className="w-1/4 ml-8">
//         <h2 className="text-lg font-bold mb-4">Add New Spice Option</h2>
//         <table className="w-full border">
//           <thead>
//             <tr>
//               <th className="border px-4 py-2">New Spice Name</th>
//               <th className="border px-4 py-2">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td className="border px-4 py-2">
//                 <input
//                   type="text"
//                   value={customSpice}
//                   onChange={(e) => setCustomSpice(e.target.value)}
//                   className="border p-2 w-full"
//                 />
//               </td>
//               <td className="border px-4 py-2">
//                 <button
//                   onClick={addCustomSpice}
//                   className="bg-blue-500 text-white p-2 rounded"
//                 >
//                   Add
//                 </button>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       {/* Print styles */}
//       <style>
//         {`
//           @media print {
//             table {
//               page-break-inside: avoid;
//             }
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default Stock;
