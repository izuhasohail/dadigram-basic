"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AuthPage = ({ isSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check URL for verification success parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("verified") === "true") {
      setMessage("Email has been verified! You can now log in.");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignup && password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        `/api/auth/${isSignup ? "signup" : "login"}`,
        {
          email,
          password,
        }
      );

      setMessage(response.data.message);
      if (!isSignup) {
        // Redirect to welcome page if login is successful
        window.location.href = "/welcome";
      }
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      <Navbar />
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white p-6 shadow-lg rounded-lg max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4">
            {isSignup ? "Sign Up" : "Log In"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Email address
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {isSignup && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border rounded"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
            >
              {isSignup ? "Sign Up" : "Log In"}
            </button>
            <p className="mt-4 text-center text-sm">
              {isSignup ? "Already have an account?" : "Don't have an account?"}
              <a
                className="text-indigo-600 underline ml-1"
                href={isSignup ? "/login" : "/signup"}
              >
                {isSignup ? "Log In" : "Sign Up"}
              </a>
            </p>
            {message && <p className="mt-4 text-green-500">{message}</p>}
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AuthPage;
