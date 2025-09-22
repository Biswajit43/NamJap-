import axios from 'axios';
import {React , useContext, useEffect, useState} from 'react';
import { AppContext } from '../Context/Context';
import { useNavigate } from 'react-router-dom';

// NOTE: Component name and all variable names are kept exactly as you provided.
const ResetPassword = () => {
  const navigate = useNavigate();
  const [resetmail, setresetmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // For entry animation
  const { backendurl, setcarrymail } = useContext(AppContext);

  // Added useEffect for the fade-in transition, like on your Home page
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleResetOtp = async () => {
    if (!resetmail) return;
    setIsLoading(true);

    try {
      const { data } = await axios.post(backendurl + '/resetotp', { resetmail });

      if (data.success) {
        setcarrymail(resetmail);
        navigate('/ChangePassword');
      } else {
        console.log('Request failed');
        // You can add user-facing error feedback here
      }
    } catch (error) {
      console.log(error.message);
      // You can add user-facing error feedback here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Background style from your Home page
    <main className="flex flex-col items-center justify-center min-h-screen bg-slate-800 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(252,211,77,0.1),rgba(255,255,255,0))]">
      {/* Entry transition wrapper from your Home page */}
      <div className={`transition-all duration-700 ease-in-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Card style from your Home page */}
        <div className="w-full max-w-md bg-slate-700/50 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-slate-600">
          {/* Typography styles from your Home page */}
          <h2 className="text-center text-2xl font-bold text-amber-200 mb-2" style={{ fontFamily: "'Lora', serif" }}>
            Reset Password
          </h2>
          <p className="text-center text-slate-400 mb-6">
            Enter your email to receive a reset code.
          </p>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">
                Email Address
              </label>
              {/* Input field style from your Home page */}
              <input
                id="email"
                type="email"
                value={resetmail}
                onChange={(e) => setresetmail(e.target.value)}
                placeholder="Enter your sacred email..."
                className="w-full px-5 py-3 border-2 border-slate-500 rounded-xl bg-slate-800 text-amber-100 focus:outline-none focus:ring-4 focus:ring-amber-400/50 focus:border-amber-400 transition-all duration-300 placeholder-slate-400 shadow-inner"
              />
            </div>

            {/* Button style from your Home page */}
            <button
              onClick={handleResetOtp}
              disabled={isLoading}
              className="w-full flex items-center justify-center mt-5 bg-gradient-to-br from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 active:scale-95 text-slate-900 font-bold rounded-xl px-8 py-3 shadow-lg shadow-amber-500/20 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-amber-300/50 disabled:from-slate-500 disabled:to-slate-600 disabled:shadow-none disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  {/* Spinner color adjusted for the amber button */}
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                'Send Reset Code'
              )}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ResetPassword;