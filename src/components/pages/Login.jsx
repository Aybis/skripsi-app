import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  const handleChange = (key, value) => {
    key === "username" && setUsername(value);
    key === "password" && setPassword(value);
  };

  const handleSubmit = async () => {
    const options = {
      method: "POST",
      url: "http://localhost:8000/auth/login",
      headers: { "Content-Type": "application/json", Access: "" },
      data: { email: username, password: password },
      validateStatus: () => true,
    };

    try {
      const { data, status } = await axios.request(options);
      status === 401 && setError(data.message);
      data.status === "failed" && setError(data.message);
      if (data.status === "success") {
        setToken(data.token);
        setError("Login Success");
        localStorage.setItem("token", token);
      }
    } catch (error) {
      setError(error);
    }
  };
  return (
    <div>
      <h1 className="text-3xl tracking-wide uppercase font-bold text-gray-900">
        Login
      </h1>
      <div className="flex flex-col gap-2 sm:gap-4 sm:items-start">
        <label
          for="username"
          className="block text-sm font-medium text-gray-700 w-24"
        >
          Email
        </label>
        <div className="mt-1 sm:mt-0 w-full">
          <input
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            type="text"
            name="username"
            id="username"
            value={username}
            className="flex-1 block w-full focus:ring-blue-500 focus:border-blue-500 min-w-0 rounded-md sm:text-sm border-gray-300"
          ></input>
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:gap-4 sm:items-start">
        <label
          for="password"
          className="block text-sm font-medium text-gray-700 w-24"
        >
          password
        </label>
        <div className="mt-1 sm:mt-0 w-full">
          <input
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            value={password}
            type="password"
            name="password"
            id="password"
            className="flex-1 block w-full focus:ring-blue-500 focus:border-blue-500 min-w-0 rounded-md sm:text-sm border-gray-300"
          ></input>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="flex w-36 mt-4 justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
      >
        Log Me In
      </button>
      <p className="Text-red 400 text-sm font-medium tracking-wide">{error}</p>
    </div>
  );
};

export default Login;
