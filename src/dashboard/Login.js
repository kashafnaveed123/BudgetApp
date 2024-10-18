import React from "react";
import { useNavigate } from "react-router-dom";
import Signup from "./Signup";
function Login() {
    const navigate=useNavigate()
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-500">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-blue-500 mb-6">
          Login
        </h2>
        <form>
          <div className="mb-4">
            <label
              className="block text-blue-500 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full px-3 py-2 text-blue-500 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              id="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-blue-500 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full px-3 py-2 text-blue-500 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              id="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="submit"
            >
              Log In
            </button>
          </div>
          <div className="mt-4 text-center">
            <a href="#" className="text-blue-500 hover:text-blue-700">
              Forgot Password?
            </a>
          </div>
          <div className="mt-4 text-center">
          <a href="#" className="text-blue-500 hover:text-blue-700 " onClick={()=>navigate('/Signup')}>
              Don't have an Account? Signup
            </a>
          </div>
            
        </form>
      </div>
    </div>
  );
}

export default Login;
