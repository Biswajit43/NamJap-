import React, { useContext, useState, useRef, useEffect } from 'react';
import { AppContext } from '../Context/Context';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { KeyRound } from 'lucide-react';

const Enterotp = () => {
    // Changed to handle 4 digits
    const [otp, setOtp] = useState(new Array(4).fill(""));
    const [isLoading, setIsLoading] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const navigate = useNavigate();
    const { backendurl, getuserdata } = useContext(AppContext);
    const inputRefs = useRef([]);

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        // Focus next input (index < 3 for a 4-digit code)
        if (element.value !== "" && index < 3) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        const value = e.clipboardData.getData("text");
        // Check for 4 digits on paste
        if (isNaN(value) || value.length !== 4) {
            return;
        }
        const newOtp = value.split('');
        setOtp(newOtp);
        // Focus the last input after paste
        inputRefs.current[3].focus();
    };

    const verifyotp = async () => {
        const finalOtp = otp.join('');
        // Check for 4 digits
        if (finalOtp.length < 4) {
            toast.warn("Please enter a 4-digit OTP.");
            return;
        }
        setIsLoading(true);
        try {
            const { data } = await axios.post(backendurl + '/verifyotp', { otp: finalOtp });
            if (data.success) {
                toast.success('Email verified successfully!');
                await getuserdata();
                navigate('/');
            } else {
                toast.error(data.message || "Wrong OTP entered");
            }
        } catch (error) {
            toast.error("An error occurred during verification.");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendOtp = async () => {
        setIsResending(true);
        try {
            const { data } = await axios.post(backendurl + '/sendotp');
            if (data.success) {
                toast.success("A new code has been sent to your email.");
            } else {
                toast.error(data.message || 'Something went wrong!');
            }
        } catch (error) {
            toast.error("Failed to resend OTP. Please try again.");
            console.error(error);
        } finally {
            setIsResending(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-16 bg-slate-900 text-slate-200">
            <div className="w-full max-w-md text-center bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
                <div className="w-16 h-16 mx-auto mb-6 bg-slate-700 rounded-full flex items-center justify-center">
                    <KeyRound className="w-8 h-8 text-amber-400" />
                </div>
                <h1 className="text-3xl font-bold text-amber-400 mb-3" style={{ fontFamily: "'Lora', serif" }}>
                    Enter Verification Code
                </h1>
                {/* Updated text to "4-digit code" */}
                <p className="text-slate-400 mb-8">
                    A 4-digit code has been sent to your email. Please enter it below.
                </p>

                <div className="flex justify-center gap-2 sm:gap-4 mb-8" onPaste={handlePaste}>
                    {otp.map((data, index) => {
                        return (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                ref={(el) => (inputRefs.current[index] = el)}
                                value={data}
                                onChange={(e) => handleChange(e.target, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl sm:text-3xl font-mono bg-slate-800 border border-slate-600 rounded-xl 
                                           focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-200"
                            />
                        );
                    })}
                </div>

                <button
                    onClick={verifyotp}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-br from-amber-400 to-amber-500 text-slate-900 font-bold rounded-xl px-8 py-3 shadow-lg shadow-amber-500/20 transition-all duration-300 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed hover:from-amber-500 hover:to-amber-600"
                >
                    {isLoading ? 'Verifying...' : 'Verify Account'}
                </button>

                <p className="mt-8 text-sm text-slate-400">
                    Didn't receive the code?{' '}
                    <button
                        onClick={handleResendOtp}
                        disabled={isResending}
                        className="font-semibold text-amber-400 hover:text-amber-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isResending ? 'Resending...' : 'Resend Code'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Enterotp;