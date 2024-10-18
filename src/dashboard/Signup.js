import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../SideBar/config/Firebase'; // Firebase import
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicURL, setProfilePicURL] = useState(''); // Store uploaded image URL
  const navigate = useNavigate();

  // Handle profile picture upload
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
  };

  // Handle Signup and Firebase Storage + Firestore integration
  const handleSignup = async (e) => {
    e.preventDefault();
    
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Upload profile picture to Firebase Storage if exists
      if (profilePic) {
        const storageRef = ref(storage, `profilePictures/${profilePic.name}`);
        const uploadTask = uploadBytesResumable(storageRef, profilePic);

        // Track the upload progress and handle completion
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Optional: Progress handling
          },
          (error) => {
            console.error('Error uploading file:', error);
          },
          () => {
            // When upload is complete, get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setProfilePicURL(downloadURL);
              saveUserData(user.uid, downloadURL); // Save user data with profile picture URL
            });
          }
        );
      } else {
        saveUserData(user.uid); // Save user data without profile picture
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  // Save user data in Firestore
  const saveUserData = async (uid, downloadURL = '') => {
    try {
      await addDoc(collection(db, 'users'), {
        uid, // User UID from authentication
        name,
        email,
        company,
        profilePicURL: downloadURL, // URL of uploaded profile picture
      });
      console.log('User data saved');
      navigate('/dashboard'); // Redirect to dashboard or any route
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-blue-500">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-blue-500 mb-6">Sign Up</h2>
        <form onSubmit={handleSignup}>
          {/* Profile Picture Upload */}
          <div className="mb-4">
            <label className="block text-blue-500 text-sm font-bold mb-2" htmlFor="profilePic">
              Profile Picture
            </label>
            <input
              className="w-full px-3 py-2 text-blue-500 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="file"
              id="profilePic"
              onChange={handleProfilePicChange}
              accept="image/*"
            />
          </div>

          {/* Name Input */}
          <div className="mb-4">
            <label className="block text-blue-500 text-sm font-bold mb-2" htmlFor="name">
              Username
            </label>
            <input
              className="w-full px-3 py-2 text-blue-500 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Company Name Input */}
          <div className="mb-4">
            <label className="block text-blue-500 text-sm font-bold mb-2" htmlFor="company">
              Company Name
            </label>
            <input
              className="w-full px-3 py-2 text-blue-500 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              id="company"
              placeholder="Enter your company name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-blue-500 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-3 py-2 text-blue-500 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-blue-500 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-3 py-2 text-blue-500 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
