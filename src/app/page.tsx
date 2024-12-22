"use client";

import React, { useState, useEffect } from "react";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const cookies = document.cookie;
    if (cookies.includes("token=admintoken")) {
      window.location.href = "/dashboard";
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.status === 200) {
        window.location.href = "/dashboard";
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className=" flex items-center justify-center">
      <div className="max-w-lg w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <img
            src="https://img.freepik.com/free-vector/business-user-cog_78370-7040.jpg?semt=ais_hybrid"
            alt="Admin Dashboard Logo"
            className="mx-auto"
            height={100}
            width={100}
          />
          <h1 className="mt-6 text-3xl font-extrabold text-gray-900">Sentinel</h1>
         
        </div>
        <form className="flex flex-col gap-5 bg-white shadow-md shadow-black p-5 rounded border-black border-t-[1px]" onSubmit={handleSubmit}>
        <p className="mt-2 text-xl text-gray-600 text-center font-semibold">Sign in to access your dashboard</p>
          <div className="flex flex-col gap-5 ">
            <div className="flex flex-col gap-2">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="appearance-none rounded-md block w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 placeholder-gray-400"
                placeholder="Username"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-md block w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 placeholder-gray-400"
                placeholder="Password"
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm my-3">{error}</p>}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
