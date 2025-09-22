import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../Context/Context';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { backendurl, isloggedin, setisloggedin, userdata, setuserdata, setisverified } = useContext(AppContext);

    const handlelogout = async () => {
        try {
            const { data } = await axios.post(backendurl + '/logout')
            if (data.success) {
                setisloggedin(false)
                setuserdata(false)
                toast.success('Log out successfully')
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <nav className=' top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-slate-700 shadow-lg'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex items-center justify-between h-16'>

                    {/* Logo/Brand Name */}
                    <div className='flex-shrink-0'>
                        <a href="/" className='text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-amber-200 to-amber-500' style={{ fontFamily: "'Lora', serif" }}>
                            NamJap
                        </a>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className='hidden md:block'>
                        <div className='ml-10 flex items-baseline space-x-6'>
                            <Link to="/" className='text-slate-300 hover:text-amber-300 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300'>Home</Link>
                            <Link to="/about" className='text-slate-300 hover:text-amber-300 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300'>About</Link>
                            <Link to="/contactus" className='text-slate-300 hover:text-amber-300 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300'>Contact us</Link>
                        </div>
                    </div>

                    {/* Desktop Auth Links */}
                    <div className='hidden md:flex items-center gap-4'>
                        {(isloggedin && userdata?.isVerified) ? (
                            <>
                                <h1>Welcome, {userdata?.name}</h1>
                                <button onClick={handlelogout} className='bg-gradient-to-br from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 active:scale-95 text-slate-900 font-bold py-2 px-4 rounded-lg text-sm shadow-lg shadow-amber-500/20 transition-all duration-200'>
                                    Logout
                                </button>
                            </>

                        ) : (
                            <>
                                <Link to="/login" className='text-slate-300 hover:text-amber-300 font-medium text-sm transition-colors duration-300'>
                                    Log in
                                </Link>
                                <Link to="/login" className='bg-gradient-to-br from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 active:scale-95 text-slate-900 font-bold py-2 px-4 rounded-lg text-sm shadow-lg shadow-amber-500/20 transition-all duration-200'>
                                    Sign up
                                </Link>
                            </>

                        )}


                    </div>

                    {/* Mobile Menu Button */}
                    <div className='-mr-2 flex md:hidden'>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-amber-300 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-amber-400"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu, show/hide based on menu state. */}
            {isOpen && (
                <div className="md:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/" className='text-slate-300 hover:text-amber-300 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300'>Home</Link>
                            <Link to="/about" className='text-slate-300 hover:text-amber-300 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300'>About</Link>
                            <Link to="/contactus" className='text-slate-300 hover:text-amber-300 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300'>Contact us</Link>
                    </div>
                    <div className="pt-4 pb-3 border-t border-slate-700">
                        <div className="flex items-center px-5 gap-4">
                            <Link to="/login" className='text-slate-300 hover:text-amber-300 font-medium text-sm transition-colors duration-300'>
                                Log in
                            </Link>
                            <Link to="/login" className='bg-gradient-to-br from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 active:scale-95 text-slate-900 font-bold py-2 px-4 rounded-lg text-sm shadow-lg shadow-amber-500/20 transition-all duration-200'>
                                Sign up
                            </Link>
                        </div>
                    </div>
                </div>
            )
            }
        </nav >
    );
};

export default Navbar;