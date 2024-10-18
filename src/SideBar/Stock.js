import React, { useState, useEffect } from "react";
import { db } from "./config/Firebase";
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

  const spiceOptions = [
    "کھیر مکس(145گرام) (M)",
    "پستہ کھیرمکس(145گرام)(M)",
    "کسٹرڈاسٹرابری(250گرام)(M)",
    "کسٹرڈ مینگو(250گرام)(M)",
    "کسٹرڈ ونیلا(250گرام)(M)",
    "کسٹرڈبنانا(250گرام)(M)",
    "کسٹرڈاسٹرابری(100گرام)(M)",
    "کسٹرڈ مینگو(100گرام)(M)",
    "کسٹرڈ بنانا(100گرام)(M)",
    "کسٹرڈ ونیلا(100گرام)(M)",
    "گلوکوز(100گرام)(M)",
    "انرجل بڑا(M)",
    "بریانی ساشہ(M)",
    "قورمہ مصالحہ ساشہ(M)",
    "کڑاہی گوشت ساشہ(M)",
    "اچار گوشت ساشہ(M)",
    "مچھلی مصالحہ ساشہ(M) ",
    "گرم مصالحہ ساشہ(M) ",
    "کالی مرچ ساشا(M)",
    "ہلدی ساشہ (M)",
    "لال مرچ ساشا (M)",
    "چاٹ مصالحہ ساشہ (M) ",
    "مرغی مصالحہ ساشہ (M) ",
    "دھنیا پاوڈرمصالحہ ساشہ (M) ",
    "کابلی پلاؤ (50گرام)(M)  ",
    "سپیشل بمبئی بریانی (45گرام) (M)",
    "بریانی (45گرام)(M)",
    "قورمہ (45گرام) (M)",
    "کڑاہی گوشت مصالحہ (45گرام)(M)",
    "اچار گوشت مصالحہ (45گرام)(M)",
    "بروسٹ مصالحہ (45گرام)(M)",
    "تکہ بوٹی مصالحہ ( 45 گرام)(M)",
    "چکن تکہ مصالحہ( 45 گرام)(M)",
    "حلیم مصالحہ (45گرام)(M)",
    "مرغی مصالحہ (45گرام)(M)",
    "مچھلی مصالحہ (45گرام)(M)",
    "ہلدی پاؤڈر(45گرام)(M) ",
    "دھنیا پاؤڈر (45گرام)(M)",
    "چاٹ مصالحہ(45گرام)(M)",
    "فروٹ چاٹ(25گرام)(M)",
    "گرم مصالحہ(25گرام)(M)",
    "کالی مرچ(25گرام)(M)",
    "سرخ مرچ (45گرام)(M)",
    "ادرک پاؤڈر (45گرام)(M)",
    "لہسن (45گرام)(M)",
    "قصوری میتھی (25گرام)(M)",
    "دلیہ (100گرام)(M)",
    "اسپغول چھلکا (M)",
    "اسپغول چھلکا بڑا(M)",
    "بڑا بریانی مصالحہ ساشہ(M)",
    "بڑا قورمہ مصالحہ ساشہ(M)",
    "بڑا کڑاہی گوشت مصالحہ ساشہ(M)",
    "بڑا اچار گوشت مصالحہ(M)",
    "کسٹرڈاسٹرابری ساشہ(M)",
    "کسٹرڈ مینگو ساشہ(M)",
    "کسٹرڈ بنانا ساشہ(M) ",
    "کسٹرڈ ونیلا ساشہ(M)",
    "سویاں(M)",
    "سالن مصالحہ(M)",
    " چسرخ مرچ (R)",
    "دادڈ مرچ (R)",
    "کالی مرچ (R)",
    "کالی مرچ پاؤڈر(R)",
    "ہلدی(R)",
    ",دھنیا(R)",
    "دھنیاپاؤڈر(R)",
    "اناردانا(R)",
    "دار چینی (R)",
    "موٹی الائچی (R)",
    "ساگو دانا(R)",
    "زردا رنگ(R)",
    "سوگی(R)",
    "کھوپرا گری(R)",
    "فنگر چپس (R)",
    " ریوڑی(R)",
    "زیرا(R)",
    "لانگ(R)",
    "چھلکا اسپغول (R)",
    "املی(R)",
    "خشک سونف (R)",
    "اجوائن (R)",
    "  میٹھا سوڈا(R)",
    "نمکو(R)",
    "میٹھی سونف(R)",
    "چنے(R)",
    "بادام(R)(20)",
    "سبز الائچی (R) (20)",
    " کھجور (R) (20)",
    " نمکو (R) (20)",
    " قصوری میتھی (R)",
  ];

  // Fetch spices from Firebase on component mount
  useEffect(() => {
    const fetchSpices = async () => {
      const querySnapshot = await getDocs(collection(db, "spices"));
      const spicesArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSpices(spicesArray);
    };
    fetchSpices();
  }, []);

  // Add new spice to Firebase
  const addSpice = async () => {
    if (newSpice.name && newSpice.quantity) {
      const docRef = await addDoc(collection(db, "spices"), newSpice);
      setSpices([...spices, { ...newSpice, id: docRef.id }]);
      setNewSpice({ name: "", quantity: 0 });
    }
  };

  // Save edited spice to Firebase
  const saveSpice = async (spice) => {
    const spiceDoc = doc(db, "spices", spice.id);
    await updateDoc(spiceDoc, spice);
    const updatedSpices = spices.map((s) => (s.id === spice.id ? spice : s));
    setSpices(updatedSpices);
    setEditingSpice(null); // Exit edit mode
  };

  // Delete spice from Firebase
  const deleteSpice = async (id) => {
    await deleteDoc(doc(db, "spices", id));
    setSpices(spices.filter((s) => s.id !== id));
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-md">
      <h1 className="text-2xl font-bold mb-4">Spice Stock Manager</h1>

      {/* Add New Spice Form */}
      <div className="mb-4">
        <h2 className="text-lg font-bold">Add New Spice</h2>
        <div className="flex items-center space-x-2">
          {/* Dropdown for spice selection */}
          <select
            value={newSpice.name}
            onChange={(e) => setNewSpice({ ...newSpice, name: e.target.value })}
            className="border border-gray-300 rounded p-2"
          >
            <option value="" disabled>
              Select Spice
            </option>
            {spiceOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Quantity"
            value={newSpice.quantity}
            onChange={(e) =>
              setNewSpice({ ...newSpice, quantity: parseFloat(e.target.value) })
            }
            className="border border-gray-300 rounded p-2"
          />
          <button
            onClick={addSpice}
            className="bg-green-500 text-white p-2 rounded"
          >
            Add Spice
          </button>
        </div>
      </div>

      {/* Spice Table */}
      <table className="table-auto w-full mb-4 border-collapse border">
        <thead>
          <tr>
            <th className="border p-2 text-left">Spice Name</th>
            <th className="border p-2 text-left">Quantity</th>
            <th className="border p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {spices && spices.length > 0 ? (
            spices.map((spice, index) => {
              if (!spice) return null; // Skip null or undefined spices

              return (
                <tr key={spice.id || index}>
                  {editingSpice?.id === spice.id ? (
                    <>
                      <td className="border p-2">
                        <input
                          type="text"
                          value={editingSpice.name}
                          onChange={(e) =>
                            setEditingSpice({
                              ...editingSpice,
                              name: e.target.value,
                            })
                          }
                          className="w-full"
                        />
                      </td>
                      <td className="border p-2">
                        <input
                          type="number"
                          value={editingSpice.quantity}
                          onChange={(e) =>
                            setEditingSpice({
                              ...editingSpice,
                              quantity: parseFloat(e.target.value),
                            })
                          }
                          className="w-full"
                        />
                      </td>
                      <td className="border p-2">
                        <button
                          onClick={() => saveSpice(editingSpice)}
                          className="bg-blue-500 text-white p-2 rounded"
                        >
                          Save
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="border p-2">{spice.name}</td>
                      <td className="border p-2">{spice.quantity}</td>
                      <td className="border p-2 flex space-x-2">
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
                      </td>
                    </>
                  )}
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="3" className="text-center p-4">
                No spices added yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Stock;
