import React from 'react';
import { Linkedin, Facebook, MessageCircle } from 'lucide-react';

const Contact = () => {
    const contactMethods = [
        {
            icon: <MessageCircle size={28} className="text-amber-400" />,
            platform: 'WhatsApp',
            detail: 'Chat with us directly',
            href: `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER.replace(/\D/g, '')}`, // Removes non-digits for a clean URL
        },
        {
            icon: <Facebook size={28} className="text-amber-400" />,
            platform: 'Facebook',
            detail: 'Follow our page',
            href: import.meta.env.VITE_FACEBOOK_URL,
        },
        {
            icon: <Linkedin size={28} className="text-amber-400" />,
            platform: 'LinkedIn',
            detail: 'Connect professionally',
            href: import.meta.env.VITE_LINKEDIN_URL,
        },
    ];

    return (
        <div className="min-h-screen bg-slate-900 text-slate-200">
            <main className="container mx-auto px-4 py-16 sm:py-24">
                {/* --- Header --- */}
                <div className="text-center mb-12 sm:mb-16">
                    <h1
                        className="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-amber-200 to-amber-500 mb-4"
                        style={{ fontFamily: "'Lora', serif" }}
                    >
                        Connect With Us
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg text-slate-300 leading-relaxed">
                        We welcome your questions and feedback. Here are the best ways to reach out.
                    </p>
                </div>

                {/* --- Contact Links Section --- */}
                <div className="max-w-lg mx-auto space-y-6">
                    {contactMethods.map((method, index) => (
                        <a
                            key={index}
                            href={method.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-6 bg-slate-800/50 p-6 rounded-2xl border border-slate-700 hover:border-amber-500/50 hover:bg-slate-800 transition-all duration-300"
                        >
                            <div>{method.icon}</div>
                            <div className="flex-grow">
                                <h3 className="text-xl font-semibold text-amber-300">{method.platform}</h3>
                                <p className="text-slate-400 group-hover:text-slate-200 transition-colors">{method.detail}</p>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right text-slate-500 group-hover:text-amber-400 transition-colors">
                                <path d="M7 17V7h10" /><path d="M7 7l10 10" />
                            </svg>
                        </a>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Contact;