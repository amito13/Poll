import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
const Login = () => {
  const { theme } = useTheme();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      toast.success(
      "Login successful!"
    );

      localStorage.setItem(
        "token",
        response.data.token
      );

     window.location.href = "/create";

    } catch (error) {
      toast.error(
      error?.response?.data?.message ||
      "Login failed"
    );
    }
  };

  return (
    <div
  className={`min-h-screen flex items-center justify-center px-4 transition-all duration-300

  ${
    theme === "dark"
      ? "bg-black text-white"
      : "bg-white text-black"
  }`}
>

      <div
  className={`w-full max-w-md rounded-2xl p-8 shadow-lg border transition-all duration-300

  ${
    theme === "dark"
      ? "bg-zinc-900 border-orange-500/20"
      : "bg-orange-50 border-orange-200"
  }`}
>

        <h1 className="text-3xl font-bold text-indigo-500 mb-2">
          Welcome Back
        </h1>

        <p className="text-gray-400 mb-6">
          Login to continue creating polls
        </p>

        <form
          onSubmit={handleLogin}
          className="space-y-4"
        >

          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
          className={`w-full p-3 rounded-xl ${
                theme === "dark"
                  ? "bg-zinc-950 border-zinc-700"
                  : "bg-white border-orange-200"
              }
              border focus:border-orange-500 outline-none`}
          />

          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value,
              })
            }
           className={`w-full p-3 rounded-xl ${
                theme === "dark"
                  ? "bg-zinc-950 border-zinc-700"
                  : "bg-white border-orange-200"
              }
              border focus:border-orange-500 outline-none`}
          />

          <button
            className="w-full bg-orange-500 hover:bg-orange-600 transition-all duration-200 text-white font-semibold py-3 rounded-xl"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
};

export default Login;