import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { useTheme } from "../context/ThemeContext";
const Register = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();
   
  const handleRegister = async (e) => {
      e.preventDefault();
      if (formData.name.trim().length < 3) {

  toast.error(
    "Name must be at least 3 characters"
  );

  return;
}

if (formData.password.length < 6) {

  toast.error(
    "Password must be at least 6 characters"
  );

  return;
}
    try{
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      // console.log(response.data);
      toast.success(
    "Account created successfully!"
    );

      localStorage.setItem('token', response.data.token);
      
      window.location.href = "/create";
    }
   
    catch(error){
      toast.error(
        error?.response?.data?.message ||
        "Registration failed"
      );
      // console.error('Registration failed:', error);
    }
  };

  return (
    <div
        className={`min-h-screen flex items-center justify-center px-4 transition-all duration-300

        ${
          theme === "dark"
            ? "bg-black text-white"
            : "bg-white text-black"
        }`}>

      <div
      className={`w-full max-w-md rounded-2xl p-8 shadow-lg border transition-all duration-300

      ${
        theme === "dark"
          ? "bg-zinc-900 border-orange-500/20"
          : "bg-orange-50 border-orange-200"
      }`}>

        <h1 className="text-3xl font-bold text-indigo-500 mb-2">
          Create Account
        </h1>

        <p className="text-gray-400 mb-6">
          Register to create polls and view analytics
        </p>

        <form className="space-y-4" onSubmit={handleRegister}>

          <input
            type="text"
            placeholder="Name"
            className={`w-full p-3 rounded-xl ${
                  theme === "dark"
                    ? "bg-zinc-950 border-zinc-700"
                    : "bg-white border-orange-200"
                }
                border focus:border-orange-500 outline-none`}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <input
            type="email"
            placeholder="Email"
            className={`w-full p-3 rounded-xl ${
                  theme === "dark"
                    ? "bg-zinc-950 border-zinc-700"
                    : "bg-white border-orange-200"
                }
                border focus:border-orange-500 outline-none`}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
          />

          <input
            type="password"
            placeholder="Password"
            className={`w-full p-3 rounded-xl ${
                  theme === "dark"
                    ? "bg-zinc-950 border-zinc-700"
                    : "bg-white border-orange-200"
                }
                border focus:border-orange-500 outline-none`}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />

          <button
            className="w-full bg-orange-500 hover:bg-orange-600 transition-all duration-200 text-white font-semibold py-3 rounded-xl"
          >
            Register
          </button>

        </form>

      </div>

    </div>
  );
};

export default Register;