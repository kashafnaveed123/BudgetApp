import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../SideBar/config/Firebase" ; // Your Firebase config file
import TodayLoss from "./LossGraph";
import TodaySale from "./SaleGraph";
import SalesmanPerformance from './PerformanceGraph';
import WeeklyReport from "./WeeklyGraph";
import SideNav from "./SideNav";
import Topnav from "./Topnav";
const Dashboard = () => {
  const [profilePicURL, setProfilePicURL] = useState("");
  const [company, setCompany] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser; // Get current authenticated user
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid)); // Fetch user data
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setProfilePicURL(userData.profilePicURL);
          setCompany(userData.company);
        }
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className="flex h-screen">
      <SideNav profilePicURL={profilePicURL} company={company} />
      
      {/* Main Content */}
      <div className="flex flex-col flex-1 bg-gray-100">
        {/* Top Nav */}
        <Topnav />
        
        {/* Dashboard Content */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <TodaySale />
          <TodayLoss />
          <SalesmanPerformance />
          <WeeklyReport />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
