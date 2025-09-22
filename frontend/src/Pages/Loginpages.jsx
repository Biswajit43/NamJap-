// src/Pages/SignupPage.jsx

import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../Context/Context';
import { toast } from 'react-toastify';

const SignupPage = () => {
  const [login, setlogin] = useState(false);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate()

  const { backendurl, getuserdata, setisloggedin } = useContext(AppContext);

  const handlelogin = () => {
    setlogin(!login);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    axios.defaults.withCredentials = true;

    try {
      if (!login) {
        // --- Signup ---
        const res = await axios.post(backendurl + '/create', { name, email, password });
        if (res.data.success) {
          alert("Account created successfully");
          setisloggedin(true);
          getuserdata();
          navigate('/verifymail');
        } else {
          toast.error(res.data.message);
        }
      } else {
        // --- Login ---
        const res = await axios.post(backendurl + '/login', { email, password });
        if (res.data.success) {
          alert("Login successfully");
          setisloggedin(true);
          getuserdata()
          navigate('/');
        } else {
          toast.error(res.data.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Try again!");
    }
  };

  // Common style for input fields
  const inputStyles = "w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors duration-300";

  // Common style for the main submit button
  const buttonStyles = "w-full bg-gradient-to-br from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-900 font-bold rounded-xl px-8 py-3 shadow-lg shadow-amber-500/20 transition-all duration-300 active:scale-95";

  return (
    <>
      {login ? (
        // --- LOGIN FORM ---
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-16 bg-slate-900 text-slate-200">
          <form className="w-full max-w-md" onSubmit={handleSubmit}>
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-amber-400 mb-2" style={{ fontFamily: "'Lora', serif" }}>
                Welcome Back
              </h1>
              <p className="text-slate-400">Log in to continue your journey.</p>
            </div>

            <div className="flex flex-col gap-5">
              <div>
                <label className="block text-left mb-2 text-sm font-medium text-slate-400">Email</label>
                <input
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  type="email"
                  placeholder="Enter your email"
                  className={inputStyles}
                  required
                />
              </div>

              <div>
                <label className="block text-left mb-2 text-sm font-medium text-slate-400">Password</label>
                <input
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  type="password"
                  placeholder="Enter your password"
                  className={inputStyles}
                  required
                />
              </div>

              <button type="submit" className={buttonStyles}>
                Log In
              </button>
            </div>
          </form>
          <p className="mb-2">
            Already have an account?{' '}
            <button onClick={handlelogin} className="font-semibold text-amber-400 hover:text-amber-300 transition">
              Sign Up
            </button>
          </p>
          <Link to={"/resetpassword"} className="font-semibold text-amber-400 hover:text-amber-300 transition">
            Forgot Password?
          </Link>
        </div>
      ) : (
        // --- SIGNUP FORM ---
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-16 bg-slate-900 text-slate-200">
          <form className="w-full max-w-md" onSubmit={handleSubmit}>
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-amber-400 mb-2" style={{ fontFamily: "'Lora', serif" }}>
                Create an Account
              </h1>
              <p className="text-slate-400">Begin your devotional practice today.</p>
            </div>

            <div className="flex flex-col gap-5">
              <div>
                <label className="block text-left mb-2 text-sm font-medium text-slate-400">Your Name</label>
                <input
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  type="text"
                  placeholder="Enter your name"
                  className={inputStyles}
                  required
                />
              </div>

              <div>
                <label className="block text-left mb-2 text-sm font-medium text-slate-400">Email</label>
                <input
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  type="email"
                  placeholder="Enter your email"
                  className={inputStyles}
                  required
                />
              </div>

              <div>
                <label className="block text-left mb-2 text-sm font-medium text-slate-400">Password</label>
                <input
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  type="password"
                  placeholder="Create a password"
                  className={inputStyles}
                  required
                />
              </div>

              <button type="submit" className={buttonStyles}>
                Register with Devotion
              </button>
            </div>
          </form>

          <div className="mt-8 text-center text-sm text-slate-400">
            <p className="mb-2">
              Already have an account?{' '}
              <button onClick={handlelogin} className="font-semibold text-amber-400 hover:text-amber-300 transition">
                Log In
              </button>
            </p>
            <Link to={"/resetpassword"} className="font-semibold text-amber-400 hover:text-amber-300 transition">
              Forgot Password?
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default SignupPage;