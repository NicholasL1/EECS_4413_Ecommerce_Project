"use client";

import { useState } from "react";
import FormAnimation from "@/components/FormAnimation";
import userServices from "@/services/userServices";
import Cookies from "js-cookie";

function page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    try {
      const response = await userServices.Login(email, password);

      if (response.message === "Invalid Login Credentials") {
        setError("Invalid Login Credentials");
      } else {
        setError(""); // Clear error message on successful login
        // sessionStorage.setItem("Authorization", JSON.stringify(response.token));
        window.location.href = "/"; // Redirect to home page
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex w-full h-screen">
      <div className="w-full flex items-center justify-center lg:w-1/2">
        <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-200 shadow-xl shadow-gray-600">
          <h1 className="text-5xl font-semibold font-signika-negative">
            Welcome back to{" "}
            <span className="font-bold italic text-red-500">6ix Kicks!</span>
          </h1>
          <p className="font-medium text-lg text-gray-500 mt-4">
            Please enter your details to log in.
          </p>
          <form className="mt-8" onSubmit={handleSubmit}>
            <div>
              <label className="text-lg font-medium">Email:</label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                id="email"
                name="email"
                value={email}
                placeholder="Enter your email..."
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <label className="text-lg font-medium">Password:</label>
              <input
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                id="password"
                name="password"
                value={password}
                placeholder="Enter your password..."
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-y-4 items-center mt-8">
              <button
                className="bg-red-600 text-white text-lg font-bold font-signika-negative py-3 rounded-xl w-4/5 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.02] ease-in-out"
                type="submit"
              >
                Login
              </button>
              {error && (
                <div className="error-message text-red-500">{error}</div>
              )}
              <div>
                <a
                  className="text-blue-500 underline hover:cursor-pointer"
                  href="/signup"
                >
                  Don't have an account? Sign Up!
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="hidden lg:flex h-full w-1/2 items-center justify-center relative bg-gray-200">
        <FormAnimation />
      </div>
    </div>
  );
}

export default page;
