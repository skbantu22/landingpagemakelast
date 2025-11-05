import React, { useState } from 'react'
import { backendURL } from '../App';
import axios from 'axios';

function Login({ setToken }) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onsubmithandler = async (e) => {
    try {
      e.preventDefault();
      console.log(email)

      const response = await axios.post(backendURL + '/api/admin/login', { email, password })
      console.log(response);
      if (response.data.success) {
        setToken(response.data.token);
        console.log("Token:", response.data.token); // <-- your token
      } else {
        alert(response.data.message);
      }

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Admin Login</h2>
        <form onSubmit={onsubmithandler} className="space-y-5">

          <div>
            <label htmlFor="email" className="block mb-2 font-medium text-gray-700">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none transition"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 font-medium text-gray-700">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-md transition-transform transform hover:scale-105"
          >
            Submit
          </button>

        </form>
      </div>
    </div>
  )
}

export default Login;
