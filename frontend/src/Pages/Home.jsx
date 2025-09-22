import React, { useState, useEffect, useContext } from 'react';

import { Calendar, Flame, Trophy, Target, Clock, Star, Award, TrendingUp, Bell } from 'lucide-react';

import { AppContext } from '../Context/Context';
import axios from 'axios';
// Mock Context for demo
const Home = () => {
    const { userdata, addtocount, backendurl, setuserdata } = useContext(AppContext);
    const [isEditing, setIsEditing] = useState(false);
    const [count, setCount] = useState(0);
    const [god, setGod] = useState('');
    const [show, setShow] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [dailyShlok, setDailyShlok] = useState(null);
    const [activeTab, setActiveTab] = useState('practice');
    const [goals, setGoals] = useState({ daily: 108, weekly: 756 });
    const [showCelebration, setShowCelebration] = useState(false);

    const handleupdate = (e) => {
        setGod(e.target.value);
    }

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    let monthlysum = 0;
    // Mock data for demonstration

    const CircularProgress = ({ progress, max = 108, size = 180 }) => {
        const radius = (size - 20) / 2;
        const stroke = 8;
        const normalizedRadius = radius - stroke * 2;
        const circumference = normalizedRadius * 2 * Math.PI;
        const strokeDashoffset = circumference - (progress / max) * circumference;
        return (
            <div className="relative" style={{ width: size, height: size }}>
                <svg
                    height={size}
                    width={size}
                    className="absolute top-0 left-0 -rotate-90"
                >
                    <circle
                        stroke="#475569"
                        fill="transparent"
                        strokeWidth={stroke}
                        r={normalizedRadius}
                        cx={size / 2}
                        cy={size / 2}
                    />
                    <circle
                        stroke="#F59E0B"
                        fill="transparent"
                        strokeWidth={stroke}
                        strokeDasharray={circumference + ' ' + circumference}
                        style={{ strokeDashoffset, strokeLinecap: 'round' }}
                        r={normalizedRadius}
                        cx={size / 2}
                        cy={size / 2}
                        className="transition-all duration-500 ease-out"
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-amber-100">{progress}</div>
                        <div className="text-xs text-slate-400">/ {max}</div>
                    </div>
                </div>
            </div>
        );
    };

    const StreakDisplay = ({ streak }) => (
        <div className="flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 p-3 rounded-xl border border-orange-400/30">
            <Flame className="w-6 h-6 text-orange-400" />
            <div>
                <div className="text-orange-400 font-bold text-lg">{streak}</div>
                <div className="text-xs text-slate-400">Day Streak</div>
            </div>
        </div>
    );

    const AchievementBadge = ({ icon: Icon, title, description, unlocked = false }) => (
        <div className={`p-4 rounded-xl border transition-all duration-300 ${unlocked
            ? 'bg-gradient-to-br from-amber-500/20 to-amber-600/20 border-amber-400/50'
            : 'bg-slate-700/30 border-slate-600/50'
            }`}>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${unlocked ? 'bg-amber-500/20' : 'bg-slate-600/20'
                }`}>
                <Icon className={`w-6 h-6 ${unlocked ? 'text-amber-400' : 'text-slate-500'}`} />
            </div>
            <h3 className={`font-semibold mb-1 ${unlocked ? 'text-amber-200' : 'text-slate-400'}`}>
                {title}
            </h3>
            <p className="text-xs text-slate-500">{description}</p>
        </div>
    );
    const PracticeHeatmap = () => {
        const today = new Date();
        const days = Array.from({ length: 30 }, (_, i) => {
            const date = new Date();
            date.setDate(today.getDate() - (29 - i));
            const dateStr = date.toISOString().split('T')[0];
            return { day: dateStr, count: userdata.dailyCounts?.[dateStr] || 0 };
        });
        return (
            <div className="bg-slate-700/30 p-4 rounded-xl">
                <h3 className="text-amber-200 font-semibold mb-4 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    30-Day Practice History
                </h3>
                <div className="grid grid-cols-10 gap-1">
                    {days.map(day => (
                        <div
                            key={day.day}
                            className={`aspect-square rounded-sm transition-all duration-200 hover:scale-110 ${day.count > 200
                                ? 'bg-amber-400'
                                : day.count > 100
                                    ? 'bg-amber-500/70'
                                    : day.count > 50
                                        ? 'bg-amber-600/50'
                                        : day.count > 0
                                            ? 'bg-amber-700/30'
                                            : 'bg-slate-600/20'
                                }`}
                            title={`${day.day}: ${day.count} chants`}
                        />
                    ))}
                </div>
            </div>
        );
    };

    const StatsCard = ({ icon: Icon, title, value, subtitle }) => (
        <div className="bg-slate-700/30 p-4 rounded-xl border border-slate-600/50">
            <div className="flex items-center justify-between mb-2">
                <Icon className="w-5 h-5 text-amber-400" />
                <span className="text-2xl font-bold text-amber-100">{value}</span>
            </div>
            <h3 className="text-slate-300 font-medium text-sm">{title}</h3>
            {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
        </div>
    );
    const shloks = [
        { id: 1, shlok: "ॐ सर्वे भवन्तु सुखिनः। सर्वे सन्तु निरामयाः।\nसर्वे भद्राणि पश्यन्तु। मा कश्चित् दुःखभाग् भवेत्॥", translation: "Om, May all be happy. May all be free from illness.\nMay all see what is auspicious. May no one suffer." },

        { id: 2, shlok: "त्वमेव माता च पिता त्वमेव। त्वमेव बन्धुश्च सखा त्वमेव।\nत्वमेव विद्या द्रविणं त्वमेव। त्वमेव सर्वं मम देव देव॥", translation: "You alone are my mother and my father, friend and companion.\nYou alone are my knowledge and wealth. You are my everything, O Lord of Lords." },

        { id: 3, shlok: "गुरुर्ब्रह्मा गुरुर्विष्णुः गुरुर्देवो महेश्वरः।\nगुरुः साक्षात् परब्रह्म तस्मै श्री गुरवे नमः॥", translation: "The Guru is Brahma, Vishnu, and Lord Maheshwara.\nThe Guru is the absolute reality. Salutations to that revered Guru." },

        { id: 4, shlok: "असतो मा सद्गमय। तमसो मा ज्योतिर्गमय।\nमृत्योर्मा अमृतं गमय॥", translation: "Lead me from the unreal to the real, from darkness to light, from death to immortality." }

    ];

    const Crown = ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M5 16L3 14V8L7 10L12 5L17 10L21 8V14L19 16H5Z" />
        </svg>
    );

    const displayCount = userdata?.isVerified ? userdata.count : count;
    const achievementsList = [
        { icon: Star, title: "First Step", description: "Complete your first 108 chants", unlocked: displayCount >= 108 },
        { icon: Trophy, title: "Week Warrior", description: "Maintain 7-day streak", unlocked: userdata?.streak >= 7 },
        { icon: Flame, title: "Devotion Fire", description: "21-day streak achieved", unlocked: userdata?.streak >= 21 },
        { icon: Award, title: "Mala Master", description: "Complete 10 malas", unlocked: displayCount / 108 >= 10 },
        { icon: Target, title: "Century Club", description: "Complete 100 malas", unlocked: userdata?.totalMalas >= 100 },
        { icon: Crown, title: "Guru Level", description: "365-day streak", unlocked: userdata?.streak >= 365 },
    ];

    useEffect(() => {

        setIsMounted(true);
        const randomIndex = Math.floor(Math.random() * shloks.length);
        setDailyShlok(shloks[randomIndex]);

    }, []);


    const handleSubmit = async () => {
        if (god.trim() !== '') {
            try {
                const { data } = await axios.post(backendurl + '/savegod', { god }, { withCredentials: true });
                if (data.success) {
                    console.log("name changed");
                    // Update local state immediately
                    setuserdata((prev) => ({
                        ...prev,
                        godname: god,
                    }));
                } else {
                    console.log("change failed");
                }
            } catch (err) {
                console.error("Error saving god name:", err);
            }
            setShow(true);
            setIsEditing(false); // Exit editing mode on submit
        }
    };

    const handleCountClick = (event) => {
        const button = event.currentTarget;
        const ripple = document.createElement("span");
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        // Ripple effect
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.className = "absolute bg-white/20 rounded-full animate-ping pointer-events-none";
        button.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);

        // Optimistically update local count
        setCount(prev => {
            const newCount = prev + 1;

            // Celebration check
            if (newCount % 108 === 0) {
                setShowCelebration(true);
                setTimeout(() => setShowCelebration(false), 3000);
            }

            return newCount;
        });

        // Call backend asynchronously
        addtocount(); // This will update userdata in background
    };



    const handleEdit = () => {
        // Pre-fill input with the current name for a better experience
        const currentName = god || (userdata && userdata.godname);
        setGod(currentName);
        setIsEditing(true); // Enter editing mode
    };

    const handleReset = () => {
        if (confirm("This will reset your current session count. Your streak and achievements will remain. Continue?")) {
            setCount(0);
        }
    };

    const TabButton = ({ id, label, icon: Icon, active, onClick }) => (
        <button
            onClick={() => onClick(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${active
                ? 'bg-amber-500/20 text-amber-200 border border-amber-400/30'
                : 'text-slate-400 hover:text-slate-300 hover:bg-slate-700/30'
                }`}
        >

            <Icon className="w-4 h-4" />

            {label}

        </button>

    );


    const CelebrationModal = () => (
        showCelebration && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">

                <div className="bg-gradient-to-br from-amber-400 to-amber-600 p-8 rounded-2xl text-center shadow-2xl animate-bounce">
                    <Trophy className="w-16 h-16 text-white mx-auto mb-4" />
                    <h2 className="text-3xl font-bold text-white mb-2">🎉 Mala Complete! 🎉</h2>
                    <p className="text-white/90">You've completed {Math.floor(count / 108)} mala(s)!</p>
                    <p className="text-white/80 text-sm mt-2">ॐ शान्ति शान्ति शान्तिः</p>
                </div>

            </div>

        )

    );



    return (

        <main className="min-h-screen bg-slate-800 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(252,211,77,0.1),rgba(255,255,255,0))]">

            <CelebrationModal />
            <div className={`transition-all duration-700 ease-in-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                {(isEditing || (!show && !userdata)) ? (
                    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
                        <div className="w-full max-w-lg bg-slate-700/50 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-slate-600">
                            {dailyShlok && (
                                <div className="text-center mb-8 pb-6 border-b border-slate-600">
                                    <p className="text-lg text-amber-200 whitespace-pre-line" style={{ fontFamily: "'Lora', serif" }}>
                                        {dailyShlok.shlok}
                                    </p>
                                    <p className="text-sm text-slate-400 mt-4 italic whitespace-pre-line">
                                        "{dailyShlok.translation}"
                                    </p>
                                </div>
                            )}
                            <h2 className="text-center text-2xl font-bold text-amber-200 mb-6">Begin Your Japa</h2>

                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <input
                                    type="text"
                                    value={god}
                                    onChange={handleupdate}
                                    placeholder="Enter a sacred name..."
                                    className="w-full sm:flex-1 px-5 py-3 border-2 border-slate-500 rounded-xl bg-slate-800 text-amber-100 focus:outline-none focus:ring-4 focus:ring-amber-400/50 focus:border-amber-400 transition-all duration-300 placeholder-slate-400 shadow-inner"
                                    autoFocus
                                />
                                <button
                                    onClick={handleSubmit}
                                    className="w-full sm:w-auto bg-gradient-to-br from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 active:scale-95 text-slate-900 font-bold rounded-xl px-8 py-3 shadow-lg shadow-amber-500/20 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-amber-300/50"
                                >
                                    Begin
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="container mx-auto px-4 py-8">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="flex items-center justify-center gap-4 mb-4">
                                <h1 className="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-amber-200 to-amber-500 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]" style={{ fontFamily: "'Lora', serif" }}>
                                    {userdata ? userdata.godname : god}
                                </h1>
                                <button
                                    onClick={handleEdit}
                                    className="bg-slate-700/70 text-amber-200 font-semibold rounded-lg py-2 px-4 hover:bg-slate-700 border border-slate-600 hover:border-amber-400 transition-all duration-300"
                                >
                                    Edit
                                </button>
                            </div>
                            <div className="flex items-center justify-center gap-6 mb-6">
                                <StreakDisplay streak={userdata?.streak} />
                                <div className="flex items-center gap-2 bg-slate-700/30 p-3 rounded-xl border border-slate-600">
                                    <Trophy className="w-6 h-6 text-amber-400" />
                                    <div>
                                        <div className="text-amber-400 font-bold text-lg">{userdata?.totalMalas}</div>
                                        <div className="text-xs text-slate-400">Total Malas</div>
                                    </div>

                                </div>

                            </div>

                        </div>



                        {/* Tabs */}

                        <div className="flex justify-center mb-8">

                            <div className="flex gap-2 bg-slate-700/30 p-2 rounded-xl">

                                <TabButton id="practice" label="Practice" icon={Target} active={activeTab === 'practice'} onClick={setActiveTab} />

                                <TabButton id="stats" label="Stats" icon={TrendingUp} active={activeTab === 'stats'} onClick={setActiveTab} />

                                <TabButton id="achievements" label="Awards" icon={Award} active={activeTab === 'achievements'} onClick={setActiveTab} />

                            </div>

                        </div>



                        {/* Content based on active tab */}

                        {activeTab === 'practice' && (

                            <div className="flex flex-col items-center gap-8">

                                <div className="relative">

                                    <CircularProgress progress={count % 108} size={200} />

                                    <button

                                        onClick={handleCountClick}

                                        className="absolute inset-4 bg-slate-700 text-amber-100 text-4xl font-extrabold rounded-full flex items-center justify-center shadow-xl border-4 border-slate-600 hover:border-amber-400 active:scale-95 transition-all duration-300 overflow-hidden focus:outline-none focus:ring-6 focus:ring-amber-500/50"

                                    >

                                        {displayCount}

                                    </button>

                                </div>

                                <div className="text-center max-w-md">

                                    <p className="text-slate-300 font-medium text-lg mb-4">

                                        Tap the circle for your japa meditation

                                    </p>

                                    <div className="grid grid-cols-2 gap-4 mb-6">

                                        <div className="bg-slate-700/30 p-3 rounded-lg">

                                            <div className="text-amber-400 font-bold text-xl">{(displayCount) % 108}

                                            </div>

                                            <div className="text-xs text-slate-400">Current Mala</div>

                                        </div>

                                        <div className="bg-slate-700/30 p-3 rounded-lg">

                                            <div className="text-amber-400 font-bold text-xl">{Math.floor(displayCount / 108)}

                                            </div>

                                            <div className="text-xs text-slate-400">Completed</div>

                                        </div>

                                    </div>

                                    <button

                                        onClick={handleReset}

                                        className="bg-slate-700/70 text-amber-200 font-semibold rounded-lg py-3 px-8 hover:bg-slate-700 border border-slate-600 hover:border-amber-400 transition-all duration-300"

                                    >

                                        Reset Session

                                    </button>

                                </div>

                            </div>

                        )}

                        {activeTab === 'stats' && (

                            <div className="max-w-4xl mx-auto space-y-6">

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                                    <StatsCard

                                        icon={Target}

                                        title="Today's Goal"

                                        value={`${Math.min(displayCount % 108, goals.daily)}/${goals.daily}`}

                                    />

                                    <StatsCard

                                        icon={Flame}

                                        title="Current Streak"

                                        value={userdata?.streak}

                                        subtitle="days"

                                    />

                                    <StatsCard

                                        icon={Trophy}

                                        title="Total Malas"

                                        value={Math.floor(displayCount / 108)}

                                    />

                                    <StatsCard

                                        icon={TrendingUp}

                                        title="This Month"

                                        value={displayCount}

                                        subtitle="chants"

                                    />

                                </div>

                                <PracticeHeatmap />
                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Weekly Progress */}
                                    <div className="bg-slate-700/30 p-6 rounded-xl">
                                        <h3 className="text-amber-200 font-semibold mb-4">Weekly Progress</h3>

                                        <div className="space-y-2">
                                            {userdata?.dailyCounts &&
                                                Object.entries(userdata.dailyCounts).map(([date, count], i) => (
                                                    <div key={i} className="flex justify-between items-center py-1 px-3 bg-amber-50 rounded-md mb-1">
                                                        <span className="text-amber-700 font-medium text-sm">
                                                            {new Date(date).toLocaleDateString('en', { weekday: 'short' })}
                                                        </span>
                                                        <span className="text-amber-600 font-bold text-sm">{count}</span>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>

                                    {/* Monthly Overview */}
                                    <div className="bg-slate-700/30 p-6 rounded-xl">
                                        <h3 className="text-amber-200 font-semibold mb-4">Monthly Overview</h3>
                                        <div className="space-y-4">
                                            <div className="flex justify-between">
                                                <span className="text-slate-300">Total Chants</span>
                                                <span className="text-amber-400 font-semibold">

                                                    {userdata?.dailyCounts && (() => {
                                                        // Sort dates to ensure correct order
                                                        const sortedEntries = Object.entries(userdata.dailyCounts).sort(
                                                            ([dateA], [dateB]) => new Date(dateA) - new Date(dateB)
                                                        );
                                                        sortedEntries.forEach(([dateStr, count]) => {
                                                            const dateObj = new Date(dateStr);
                                                            const day = dateObj.getDate();

                                                            if (day === 1) monthlysum = 0; // reset at start of new month
                                                            monthlysum += count;
                                                        });

                                                        return monthlysum; // return only the total sum
                                                    })()}
                                                </span>
                                            </div>


                                            <div className="flex justify-between">
                                                <span className="text-slate-300">Daily Average</span>
                                                <span className="text-amber-400 font-semibold">

                                                    {userdata?.dailyCounts && (() => {
                                                        let monthlysum = 0;
                                                        let n = Object.keys(userdata?.dailyCounts).length;
                                                        // Sort dates to ensure correct order
                                                        const sortedEntries = Object.entries(userdata.dailyCounts).sort(
                                                            ([dateA], [dateB]) => new Date(dateA) - new Date(dateB)
                                                        );
                                                        sortedEntries.forEach(([dateStr, count]) => {
                                                            const dateObj = new Date(dateStr);
                                                            const day = dateObj.getDate();

                                                            if (day === 1) monthlysum = 0; // reset at start of new month
                                                            monthlysum += count;
                                                        });
                                                        return monthlysum / n; // return only the total sum
                                                    })()}
                                                </span>

                                            </div>

                                            <div className="flex justify-between">

                                                <span className="text-slate-300">Best Streak</span>

                                                <span className="text-amber-400 font-semibold">

                                                    {userdata.streak} days

                                                </span>

                                            </div>

                                            <div className="flex justify-between">

                                                <span className="text-slate-300">Malas Completed</span>

                                                <span className="text-amber-400 font-semibold">

                                                    {Math.floor(displayCount / 108)}

                                                </span>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        )}
                        {activeTab === 'achievements' && (

                            <div className="max-w-4xl mx-auto">

                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">

                                    {achievementsList.map((achievement, index) => (

                                        <AchievementBadge key={index} {...achievement} />

                                    ))}

                                </div>



                                <div className="mt-8 bg-slate-700/30 p-6 rounded-xl">

                                    <h3 className="text-amber-200 font-semibold mb-4 flex items-center gap-2">

                                        <Target className="w-5 h-5" />

                                        Next Milestones

                                    </h3>

                                    <div className="space-y-4">

                                        <div className="flex items-center justify-between p-3 bg-slate-600/20 rounded-lg">

                                            <span className="text-slate-300">Next Streak Milestone</span>

                                            <span className="text-amber-400 font-semibold">

                                                {userdata?.streak < 21 ? '21 days' : userdata?.streak < 50 ? '50 days' : '100 days'}

                                            </span>

                                        </div>

                                        <div className="flex items-center justify-between p-3 bg-slate-600/20 rounded-lg">

                                            <span className="text-slate-300">Next Mala Milestone</span>

                                            <span className="text-amber-400 font-semibold">

                                                {userdata.totalMalas < 50 ? '50 malas' : userdata.totalMalas < 100 ? '100 malas' : '500 malas'}

                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </main>
    );

};

export default Home;