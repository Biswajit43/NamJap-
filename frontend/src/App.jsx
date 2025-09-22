import './App.css';
import Navbar from './Component/Navbar/Navbar';
import Footer from './Component/Footer/Footer';
import Home from './Pages/Home';
import Loginpages from './Pages/Loginpages';
import { ToastContainer, toast } from 'react-toastify';
import Emailverify from './Pages/Emailverify';
import Resetpassword from './Pages/Resetpassword';
import { Route, Routes } from 'react-router-dom';
import Verify from './Pages/Verify';
import Enterotp from './Pages/Enterotp';
import ChangePassword from './Pages/ChangePassword';
import NewPassword from './Pages/NewPassword';
import About from './Pages/About';
import Contact from './Pages/Contact';

function App() {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Loginpages />} />
        <Route path="/verifymail" element={<Verify />} />
        <Route path="/about" element={<About />} />
        <Route path="/contactus" element={<Contact />} />
        <Route path="/enterotp" element={<Enterotp />} />
        <Route path="/NewPassword" element={<NewPassword />} />
        <Route path="/resetpassword" element={<Resetpassword />} />
        <Route path="/ChangePassword" element={<ChangePassword />} />
        <Route path="/verifymail" element={<Emailverify />} />
        {/* ✅ Added Signup route */}
      </Routes>
      <Footer />

      <style>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-in-out;
        }
        .ripple {
          position: absolute;
          border-radius: 50%;
          background: rgba(252, 211, 77, 0.7);
          transform: scale(0);
          animation: ripple-effect 600ms linear;
          pointer-events: none;
          mix-blend-mode: lighten;
          z-index: 10;
        }
        @keyframes ripple-effect {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}

export default App;
