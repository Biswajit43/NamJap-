import axios from 'axios';
import React, { useContext, useState } from 'react';
import { AppContext } from '../Context/Context';
import { toast } from 'react-toastify';
import { ShieldCheck } from 'lucide-react'; // Optional: for a nice icon

const NewPassword = () => {
    // --- Original logic is unchanged ---
    const [show, setshow] = useState(false);
    const { backendurl, carrymail } = useContext(AppContext);
    const [newpassword, setNewpassword] = useState('');

    const changepass = async () => {
        const { data } = await axios.post(backendurl + '/updatepassword', { newpassword, carrymail });
        if (data.success) {
            toast.success("Password changed successfully");
        } else {
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-16 bg-slate-900 text-slate-200">
            <div className="w-full max-w-md text-center bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
                
                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-6 bg-slate-700 rounded-full flex items-center justify-center">
                    <ShieldCheck className="w-8 h-8 text-amber-400" />
                </div>

                {/* Heading */}
                <h1 className="text-3xl font-bold text-amber-400 mb-3" style={{ fontFamily: "'Lora', serif" }}>
                    Set New Password
                </h1>
                
                <p className="text-slate-400 mb-8">
                    Create a strong, new password for your account.
                </p>

                {/* Password Input */}
                <div className="relative w-full">
                    <input
                        type={show ? "text" : "password"}
                        value={newpassword}
                        onChange={(e) => setNewpassword(e.target.value)}
                        placeholder="Enter new password..."
                        className="w-full pl-4 pr-16 py-3 bg-slate-800 border border-slate-600 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors duration-300"
                    />
                    <button
                        type="button"
                        onClick={() => setshow(!show)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-amber-400 hover:text-amber-300"
                    >
                        {show ? "Hide" : "Show"}
                    </button>
                </div>

                {/* Submit Button */}
                <button
                    onClick={changepass}
                    className="w-full mt-8 py-3 bg-gradient-to-br from-amber-400 to-amber-500 text-slate-900 font-bold rounded-xl shadow-lg shadow-amber-500/20 transition-all duration-300 active:scale-95 hover:from-amber-500 hover:to-amber-600"
                >
                    Change Password
                </button>
            </div>
        </div>
    );
};

export default NewPassword;