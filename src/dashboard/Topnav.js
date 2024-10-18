import React , {useState} from 'react'
import { useNavigate } from "react-router-dom";


function Topnav() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const navigate = useNavigate();
  return (
    <>
         <nav className="bg-white p-4 border-b flex items-center justify-between lg:pl-72">
          {/* Hamburger Button for small screens */}
          <button
            className="lg:hidden p-2 focus:outline-none"
            onClick={toggleSidebar}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>

          <div className="text-lg font-bold">Dashboard</div>
          <div className="flex items-center">
            <button className="mr-4 bg-red-600 text-white px-4 py-2 rounded">
              Buy Subscription
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => navigate("/Signup")}
            >
              Create New Account
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 ml-2 rounded"
              onClick={() => navigate("/Login")}
            >
              Login
            </button>
          </div>
        </nav> 
    </>
  )
}

export default Topnav
   