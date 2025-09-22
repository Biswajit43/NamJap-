import React from 'react';
import { Link } from 'react-router-dom';

// A simple SVG icon for demonstration. You can replace these with icons from a library like react-icons.
const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 inline-block mx-1 text-amber-400">
    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-1.344-.688 15.182 15.182 0 01-1.06-1.017c-.82-1.203-1.478-2.61-1.478-4.045V9.412a3.375 3.375 0 01.91-2.229c.529-.623 1.254-1.033 2.083-1.159a3.375 3.375 0 012.91.566c.548.423 1.013 1.05 1.223 1.791a3.375 3.375 0 01.442 1.832v2.819a15.18 15.18 0 01-1.06 1.017c-.36.463-.756.885-1.19 1.258a15.247 15.247 0 01-1.344.688l-.022.012-.007.003z" />
  </svg>
);


const Footer = () => {
  return (
    <footer className="bg-slate-900/80 backdrop-blur-lg border-t border-slate-700 text-slate-400">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between items-center gap-6">
        
        {/* Copyright & Devotional Message */}
        <div className="text-center sm:text-left">
          <p className="font-semibold text-slate-200">
            NamJap
          </p>
          <p className="text-sm">
            © {new Date().getFullYear()} | Made with <HeartIcon /> for devotion.
          </p>
        </div>

        {/* Optional Links */}
        <div className="flex gap-6 font-medium">
            <Link to="/" className='text-slate-300 hover:text-amber-300 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300'>Home</Link>
                            <Link to="/about" className='text-slate-300 hover:text-amber-300 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300'>About</Link>
                            <Link to="/contactus" className='text-slate-300 hover:text-amber-300 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300'>Contact us</Link>
        </div>

      </div>
    </footer>
  );
};

export default Footer;