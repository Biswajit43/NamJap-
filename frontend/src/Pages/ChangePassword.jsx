import React from 'react';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../Context/Context';
import { toast } from 'react-toastify';
import axios from 'axios';
import { LockKeyhole } from 'lucide-react'; // Optional: for a nice icon

const ChangePassword = () => {
  const [otp, setotp] = useState('');
  const navigate = useNavigate();
  const { backendurl, getuserdata, carrymail } = useContext(AppContext);

  // --- Original logic is unchanged ---
  const changepass = async () => {
    try {
      const { data } = await axios.post(backendurl + '/verifyresetotp', { carrymail, otp });
      if (data.success) {
        toast.success('Email verified successfully');
        getuserdata();
        navigate('/NewPassword');
      } else {
        toast.error('Wrong OTP entered');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-16 bg-slate-900 text-slate-200">
      <div className="w-full max-w-md text-center bg-slate-800/50 p-8 rounded-2xl border border-slate-700">

        {/* Icon */}
        <div className="w-16 h-16 mx-auto mb-6 bg-slate-700 rounded-full flex items-center justify-center">
          <LockKeyhole className="w-8 h-8 text-amber-400" />
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-amber-400 mb-3" style={{ fontFamily: "'Lora', serif" }}>
          Reset Your Password
        </h1>

        {/* Subtext */}
        <p className="text-slate-400 mb-8">
          An OTP has been sent to your email. Enter it below to proceed.
        </p>

        {/* OTP Input Field */}
        <div className="mb-8">
          <input
            type="text"
            value={otp}
            onChange={(e) => {
              if (/^\d*$/.test(e.target.value) && e.target.value.length <= 5) {
                setotp(e.target.value);
              }
            }}
            placeholder='- - - - -'
            className="w-full bg-slate-800 border border-slate-600 rounded-xl text-slate-100 placeholder-slate-500
                                   text-center text-4xl font-mono tracking-[0.4em] px-4 py-3
                                   focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300"
          />
        </div>

        {/* Verify Button */}
        <button
          onClick={changepass}
          className="w-full bg-gradient-to-br from-amber-400 to-amber-500 text-slate-900 font-bold rounded-xl px-8 py-3 shadow-lg shadow-amber-500/20 transition-all duration-300 active:scale-95 hover:from-amber-500 hover:to-amber-600"
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;