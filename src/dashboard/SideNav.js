import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./logo.png";

function SideNav({ profilePicURL, company }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const navigate = useNavigate();
  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 bg-blue-50 p-4 transition-transform duration-200 ease-in-out lg:translate-x-0 lg:relative lg:block`}
        style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}
      >
        <div className="text-lg font-bold mb-7">
          <img
            src={logo}
            width="70%"
            alt="NS Traders Logo" // Updated the alt attribute
            className="rounded-full"
          />
          <div className=" text-3xl">NS Traders</div>
        </div>
        <ul>
          <li className="mb-4">
            <a href="/" className="flex items-center text-lg font-bold">
              See Dashboard
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/SalesRepresentation"
              className="flex items-center hover:bg-blue-100 p-3 rounded-lg"
              onClick={() => navigate("/SalesRepresentation")}
            >
              Sales Updates
            </a>
          </li>

          <li className="mb-4">
            <a
              href="/loss"
              className="flex items-center hover:bg-blue-100 p-3 rounded-lg"
              onClick={() => navigate("/loss")}
            >
              Loss Updates
            </a>
          </li>

          <li className="mb-4">
            <a
              href="/invoice"
              className="flex items-center hover:bg-blue-100 p-3 rounded-lg"
              onClick={() => navigate("/invoice")}
            >
              Invoice
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/SalesmanMain"
              className="flex items-center hover:bg-blue-100 p-3 rounded-lg"
            >
              Salesman
            </a>
          </li>
          <li className="mb-4">
            <a
              href="/Stock"
              className="flex items-center hover:bg-blue-100 p-3 rounded-lg"
              onClick={() => navigate("/Stock")}
            >
              Stock
            </a>
          </li>
        </ul>
      </aside>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
}

export default SideNav;
