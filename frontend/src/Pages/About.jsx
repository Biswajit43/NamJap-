import React from 'react';
import { Link } from 'react-router-dom';
import { Repeat, TrendingUp, BookOpen, Heart } from 'lucide-react';

const About = () => {
    return (
        <div className="min-h-screen bg-slate-900 text-slate-200">
            <main className="container mx-auto px-4 py-16 sm:py-24">
                {/* --- Hero Section --- */}
                <div className="text-center mb-16 sm:mb-20">
                    <h1 
                        className="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-amber-200 to-amber-500 mb-4" 
                        style={{ fontFamily: "'Lora', serif" }}
                    >
                        Embracing the Divine Echo
                    </h1>
                    <p className="max-w-3xl mx-auto text-lg text-slate-300 leading-relaxed">
                        NamJap is a sacred space for the soul, a digital sanctuary dedicated to the timeless practice of Japa meditation and the path of pure devotion (Bhakti).
                    </p>
                </div>

                <div className="max-w-4xl mx-auto space-y-16">
                    {/* --- Our Mission Section --- */}
                    <section>
                        <h2 className="text-3xl font-bold text-amber-400 mb-6 text-center flex items-center justify-center gap-3">
                            <Heart className="w-7 h-7" /> Our Humble Mission
                        </h2>
                        <p className="text-slate-300 text-center text-lg leading-relaxed">
                            Our purpose is to provide a peaceful, supportive, and accessible environment for devotees of Shri Radha and Krishna to cultivate a consistent spiritual practice (sadhana). In a world of distraction, we offer a focused tool to help you connect with the Divine, find inner peace, and experience the profound joy of chanting the Holy Name.
                        </p>
                    </section>
                    
                    <hr className="border-slate-700" />

                    {/* --- Features Section --- */}
                    <section>
                        <h2 className="text-3xl font-bold text-amber-400 mb-8 text-center">Tools for Your Devotion</h2>
                        <div className="grid md:grid-cols-3 gap-8 text-center">
                            <FeatureCard
                                icon={<Repeat size={32} />}
                                title="Seamless Japa Counter"
                                description="Our intuitive digital mala helps you focus on the divine name, tracking each chant with a simple, mindful tap."
                            />
                            <FeatureCard
                                icon={<TrendingUp size={32} />}
                                title="Track Your Sadhana"
                                description="Visualize your spiritual progress with insightful statistics, daily streaks, and motivating achievements."
                            />
                            <FeatureCard
                                icon={<BookOpen size={32} />}
                                title="Daily Inspiration"
                                description="Receive daily shlokas and wisdom from sacred texts like the Bhagavad Gita to enlighten your path."
                            />
                        </div>
                    </section>
                    
                    <hr className="border-slate-700" />

                    {/* --- Call to Action --- */}
                    <section className="text-center bg-slate-800/50 p-8 sm:p-12 rounded-2xl border border-slate-700">
                        <h2 className="text-3xl font-bold text-amber-400 mb-4">Begin Your Journey Within</h2>
                        <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
                            Whether you are new to this path or deepening a lifelong practice, NamJap is here to support you. Create an account to save your progress and join a global community of devotees.
                        </p>
                        <Link
                            to="/login"
                            className="inline-block bg-gradient-to-br from-amber-400 to-amber-500 text-slate-900 font-bold rounded-xl px-10 py-3 shadow-lg shadow-amber-500/20 transition-all duration-300 active:scale-95 hover:from-amber-500 hover:to-amber-600"
                        >
                            Start Chanting
                        </Link>
                    </section>
                </div>
            </main>
        </div>
    );
};

// Helper component for feature cards
const FeatureCard = ({ icon, title, description }) => (
    <div className="bg-slate-800/40 p-6 rounded-xl border border-slate-700/50">
        <div className="flex justify-center items-center w-16 h-16 mx-auto mb-4 bg-slate-700/50 rounded-full text-amber-400">
            {icon}
        </div>
        <h3 className="text-xl font-semibold text-amber-300 mb-2">{title}</h3>
        <p className="text-slate-400">{description}</p>
    </div>
);

export default About;