import React, { useContext } from 'react';
import { AppContext } from '../Context/Context';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Mail } from 'lucide-react'; // Optional: for a nice icon

const Verify = () => {
    // --- Original logic is unchanged ---
    const { backendurl, userdata } = useContext(AppContext);
    const navigate = useNavigate();

    const handleotp = async () => {
        const { data } = await axios.post(backendurl + '/sendotp');
        if (data.success) {
            toast.success("Please check your mail");
            navigate('/enterotp');
        } else {
            toast.error('something went wrong !!!!');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-16 bg-slate-900 text-slate-200">
            <div className="w-full max-w-md text-center bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
                
                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-6 bg-slate-700 rounded-full flex items-center justify-center">
                    <Mail className="w-8 h-8 text-amber-400" />
                </div>

                {/* Heading */}
                <h1 className="text-3xl font-bold text-amber-400 mb-3" style={{ fontFamily: "'Lora', serif" }}>
                    Verify Your Email
                </h1>

                {/* Subtext */}
                <p className="text-slate-400 mb-8">
                    To complete your registration, please verify your email. We'll send a code to the address below.
                </p>

                {/* Email Display Input */}
                <div className="mb-8">
                    <input
                        type="email"
                        value={userdata?.email || ""}
                        readOnly
                        className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-amber-200 text-center text-lg font-medium cursor-default focus:outline-none"
                    />
                </div>

                {/* Send OTP Button */}
                <button
                    onClick={handleotp}
                    className="w-full bg-gradient-to-br from-amber-400 to-amber-500 text-slate-900 font-bold rounded-xl px-8 py-3 shadow-lg shadow-amber-500/20 transition-all duration-300 active:scale-95 hover:from-amber-500 hover:to-amber-600"
                >
                    Send OTP
                </button>
            </div>
        </div>
    );
};

export default Verify;