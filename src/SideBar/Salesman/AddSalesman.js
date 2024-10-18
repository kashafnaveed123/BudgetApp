import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/Firebase'; // Import Firebase configuration

function AddSalesman() {
  const [salesmanData, setSalesmanData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    setSalesmanData({
      ...salesmanData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Save data to Firestore
      await addDoc(collection(db, 'salesmen'), {
        firstName: salesmanData.firstName,
        lastName: salesmanData.lastName,
        email: salesmanData.email,
        phoneNumber: salesmanData.phoneNumber,
        address: salesmanData.address,
      });
      console.log('Salesman data saved successfully');
      // Clear form fields after successful submission
      setSalesmanData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: ''
      });
    } catch (error) {
      console.error('Error saving salesman data: ', error);
    }
  };

  return (
    <>
      <div className="isolate px-2 py-24 bg-blue-50 lg:px-8 mt-2">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-blue-950 sm:text-4xl">Add Salesman Details here</h2>
          <p className="text-lg leading-8 text-gray-600">Add new Salesman.</p>
        </div>
        <form onSubmit={handleSubmit} className="mx-auto mt-5 max-w-xl sm:mt-10">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="block text-sm font-semibold leading-6 text-blue-950">
                First name
              </label>
              <div className="mt-2.5">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={salesmanData.firstName}
                  onChange={handleChange}
                  className="block w-full h-8 rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-semibold leading-6 text-blue-950">
                Last name
              </label>
              <div className="mt-2.5">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={salesmanData.lastName}
                  onChange={handleChange}
                  className="block w-full h-8 mt-3.5 rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="email" className="block text-sm font-semibold leading-6 text-blue-950">
                Email
              </label>
              <div className="mt-2.5">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={salesmanData.email}
                  onChange={handleChange}
                  className="block w-full h-8 rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="phoneNumber" className="block text-sm font-semibold leading-6 text-blue-950">
                Phone number
              </label>
              <div className="mt-2.5">
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={salesmanData.phoneNumber}
                  onChange={handleChange}
                  className="block w-full h-8 rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="address" className="block text-sm font-semibold leading-6 text-blue-950">
                Address
              </label>
              <div className="mt-2.5">
                <textarea
                  id="address"
                  name="address"
                  rows={4}
                  value={salesmanData.address}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-md bg-blue-600 px-3.5 py-2.5 text-center text-sm font-semibold text-blue-950 shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddSalesman;
