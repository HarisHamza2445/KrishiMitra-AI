import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import { CloudRain, Sprout, TrendingUp, AlertTriangle, ArrowUpRight, Wind, Droplets, Sun, ChevronRight, CloudSun, Sparkles, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const marketData = [
    { name: 'Mon', price: 2200 },
    { name: 'Tue', price: 2250 },
    { name: 'Wed', price: 2280 },
    { name: 'Thu', price: 2320 },
    { name: 'Fri', price: 2300 },
    { name: 'Sat', price: 2350 },
    { name: 'Sun', price: 2400 },
];

// Reusable component for deep glassmorphic cards
const GlassCard = ({ children, className = "", delay = 0, hoverGlow = "" }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.6, type: "spring", bounce: 0.4 }}
        className={`glass-card group ${className} ${hoverGlow || 'glass-hover'}`}
    >
        <div className="relative z-10 w-full h-full">
            {children}
        </div>
    </motion.div>
);

const Dashboard = () => {
    const { user } = useAuth();
    const [greeting, setGreeting] = useState('Good Morning');

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Good Morning');
        else if (hour < 18) setGreeting('Good Afternoon');
        else setGreeting('Good Evening');
    }, []);

    return (
        <div className="min-h-screen relative overflow-hidden font-sans selection:bg-emerald-200 selection:text-emerald-900">
            {/* Clean Light Background handled in index.css */}

            <div className="relative z-10">
                <Navbar />

                {/* Main Content Area */}
                <main className="max-w-[1400px] mx-auto px-6 lg:px-12 py-8 lg:py-12">

                    {/* Dashboard Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 lg:mb-16 gap-6 relative z-10">
                        <div>
                            <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/80 shadow-[0_4px_20px_rgb(0,0,0,0.05)] mb-6 pb-2 transition-all hover:bg-white/90 cursor-default">
                                <div className="p-1.5 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full shadow-inner">
                                    <Sprout className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-sm font-black tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-teal-800 uppercase">Farm Command Center</span>
                            </div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-5xl lg:text-7xl font-black tracking-tighter leading-[1.05]"
                            >
                                <span className="text-slate-800">{greeting},</span> <br className="hidden md:block" />
                                <span className="relative inline-block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600 filter drop-shadow-sm">
                                    {user?.name ? user.name.split(' ')[0] : 'Farmer'}
                                </span>
                            </motion.h1>
                            <p className="text-slate-500 font-semibold mt-4 text-lg lg:text-xl">Your intelligent agricultural insights at a glance.</p>
                        </div>
                    </div>

                    {/* Bento Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-6 lg:gap-8 auto-rows-[minmax(200px,auto)] relative z-20">

                        {/* Weather Card - Large */}
                        <GlassCard className="col-span-1 md:col-span-6 lg:col-span-4 lg:row-span-2 p-8 lg:p-10" delay={0.2}>
                            <div className="absolute top-0 right-0 p-8 lg:p-12 opacity-10 transition-transform duration-700 pointer-events-none transform group-hover:scale-110">
                                <Sun className="w-72 h-72 text-yellow-500" />
                            </div>
                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="flex items-center gap-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/10 border border-emerald-500/20 backdrop-blur-sm px-3 md:px-4 py-1.5 md:py-2 rounded-full w-fit mb-6 md:mb-8">
                                            <span className="w-2 md:w-2.5 h-2 md:h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>
                                            <span className="text-xs md:text-sm font-bold tracking-widest text-emerald-800 uppercase">LIVE WEATHER CONDITIONS</span>
                                        </div>
                                        <div className="flex items-end gap-3 md:gap-4 mb-2 md:mb-4">
                                            <h2 className="text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-slate-800 filter drop-shadow-md">28°</h2>
                                            <div className="mb-2 md:mb-4">
                                                <p className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600 font-extrabold text-3xl md:text-4xl tracking-tight">Sunny</p>
                                            </div>
                                        </div>
                                        <p className="text-slate-600 font-semibold text-sm md:text-base max-w-sm leading-relaxed">
                                            Optimal conditions for harvesting early crops. Expect intense UV radiation around noon.
                                        </p>
                                    </div>
                                    <div className="bg-gradient-to-br from-white/90 to-white/40 p-4 md:p-6 rounded-3xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.06)] backdrop-blur-md hidden sm:block">
                                        <CloudSun className="w-16 h-16 md:w-20 md:h-20 text-yellow-500 filter drop-shadow-sm" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6 mt-10 md:mt-12">
                                    <div className="bg-white/50 backdrop-blur-md p-4 md:p-5 rounded-2xl border border-white/60 flex flex-col justify-center shadow-sm group-hover:bg-white/70 transition-colors">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Wind className="w-5 h-5 text-cyan-500" />
                                            <p className="text-xs md:text-sm text-slate-500 uppercase tracking-widest font-bold">WIND SPEED</p>
                                        </div>
                                        <p className="font-black text-2xl md:text-3xl text-slate-800">12 <span className="text-sm md:text-base font-bold text-slate-400 tracking-normal">km/h</span></p>
                                    </div>
                                    <div className="bg-white/50 backdrop-blur-md p-4 md:p-5 rounded-2xl border border-white/60 flex flex-col justify-center shadow-sm group-hover:bg-white/70 transition-colors">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Droplets className="w-5 h-5 text-blue-500" />
                                            <p className="text-xs md:text-sm text-slate-500 uppercase tracking-widest font-bold">HUMIDITY</p>
                                        </div>
                                        <p className="font-black text-2xl md:text-3xl text-slate-800">45 <span className="text-sm md:text-base font-bold text-slate-400 tracking-normal">%</span></p>
                                    </div>
                                    <div className="bg-white/50 backdrop-blur-md p-4 md:p-5 rounded-2xl border border-white/60 flex flex-col justify-center shadow-sm group-hover:bg-white/70 transition-colors sm:col-span-1 col-span-2">
                                        <div className="flex items-center gap-2 mb-2">
                                            <CloudRain className="w-5 h-5 text-indigo-500" />
                                            <p className="text-xs md:text-sm text-slate-500 uppercase tracking-widest font-bold">CHANCE OF RAIN</p>
                                        </div>
                                        <p className="font-black text-2xl md:text-3xl text-slate-800">0 <span className="text-sm md:text-base font-bold text-slate-400 tracking-normal">%</span></p>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>

                        {/* Active Crops Widget */}
                        <GlassCard className="col-span-1 md:col-span-3 lg:col-span-2 p-6 md:p-8 flex flex-col justify-between" delay={0.3}>
                            <div className="flex justify-between items-start">
                                <div className="p-3 md:p-4 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 rounded-2xl text-emerald-600 border border-emerald-500/20 shadow-inner">
                                    <Sprout className="w-7 h-7 md:w-8 md:h-8" />
                                </div>
                                <span className="text-[0.7rem] font-bold bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1.5 rounded-full uppercase tracking-widest shadow-md">3 ACTIVE</span>
                            </div>
                            <div className="mt-8 md:mt-10">
                                <h3 className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-2">PRIMARY CROP</h3>
                                <p className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight">Wheat</p>
                                <div className="mt-8 p-5 bg-white/40 backdrop-blur-md rounded-2xl border border-white/60 shadow-inner">
                                    <div className="flex justify-between items-end text-sm font-bold mb-3">
                                        <span className="text-slate-600">Growth Stage</span>
                                        <span className="text-emerald-600 font-black text-lg">75%</span>
                                    </div>
                                    <div className="w-full bg-slate-200/80 h-3 md:h-4 rounded-full overflow-hidden shadow-inner">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: '75%' }}
                                            transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                                            className="bg-gradient-to-r from-emerald-400 to-teal-500 h-full w-[75%] rounded-full relative overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite] -skew-x-12 translate-x-[-100%]"></div>
                                        </motion.div>
                                    </div>
                                    <p className="text-xs md:text-sm text-slate-600 mt-4 font-semibold flex items-center gap-2">
                                        <Activity className="w-4 h-4 text-emerald-500" /> Optimal health metrics detected
                                    </p>
                                </div>
                            </div>
                        </GlassCard>

                        {/* Disease Alert Widget */}
                        <GlassCard className="col-span-1 md:col-span-3 lg:col-span-2 p-6 md:p-8 flex flex-col justify-between" delay={0.4}>
                            <div className="flex justify-between items-start">
                                <div className="p-3 md:p-4 bg-gradient-to-br from-rose-400/20 to-pink-500/20 rounded-2xl text-rose-500 border border-rose-500/20 shadow-inner">
                                    <AlertTriangle className="w-7 h-7 md:w-8 md:h-8" />
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-rose-200/50 bg-white/50 backdrop-blur-md shadow-sm">
                                    <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.8)]"></div>
                                    <span className="text-[0.7rem] font-black tracking-widest text-rose-700 uppercase">LIVE SCAN</span>
                                </div>
                            </div>
                            <div className="mt-8 md:mt-10">
                                <h3 className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-2">DISEASE THREAT LEVEL</h3>
                                <div className="flex items-end gap-3 mb-4">
                                    <p className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight">Low</p>
                                    <p className="text-emerald-600 font-bold text-sm bg-emerald-500/10 px-2 py-1 rounded-lg mb-1 hidden sm:block">Status: Safe</p>
                                </div>
                                <p className="text-sm text-slate-600 font-semibold max-w-[200px]">
                                    Last comprehensive scan completed <span className="font-bold text-slate-800">2 hours ago</span>.
                                </p>
                            </div>
                            <Link to="/disease" className="mt-8 block">
                                <button className="w-full py-4 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black text-white text-sm font-bold tracking-wide uppercase rounded-xl md:rounded-2xl transition-all shadow-[0_8px_20px_rgb(0,0,0,0.15)] hover:shadow-[0_8px_25px_rgb(0,0,0,0.25)] hover:-translate-y-0.5 relative overflow-hidden group">
                                    <span className="relative z-10 flex items-center justify-center gap-2">Run Diagnostics <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></span>
                                    <div className="absolute inset-0 bg-white/10 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300"></div>
                                </button>
                            </Link>
                        </GlassCard>

                        {/* Market Trends */}
                        <GlassCard className="col-span-1 md:col-span-6 lg:col-span-4 p-6 md:p-8 flex flex-col justify-between" delay={0.5}>
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 md:p-4 bg-gradient-to-br from-indigo-400/20 to-purple-500/20 border border-indigo-500/20 rounded-2xl text-indigo-600 shadow-inner">
                                        <TrendingUp className="w-6 h-6 md:w-7 md:h-7" />
                                    </div>
                                    <div>
                                        <h3 className="font-black text-slate-800 text-xl tracking-tight">Market Analytics</h3>
                                        <p className="text-xs md:text-sm text-slate-500 font-bold tracking-wide uppercase mt-1">WHEAT PRICING (PER QUINTAL)</p>
                                    </div>
                                </div>
                                <div className="text-left sm:text-right">
                                    <p className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">₹2,400</p>
                                    <p className="text-sm text-emerald-600 font-black flex items-center gap-1 mt-1 bg-emerald-500/10 px-2 py-1 rounded-lg w-fit sm:ml-auto">
                                        <ArrowUpRight className="w-4 h-4" /> +2.4% vs last week
                                    </p>
                                </div>
                            </div>
                            <div className="h-56 md:h-64 w-[105%] -ml-4 md:-ml-6 mt-4">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={marketData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                                                <stop offset="95%" stopColor="#34D399" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <Tooltip
                                            contentStyle={{ borderRadius: '16px', border: '1px solid rgba(255,255,255,0.6)', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)', background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(12px)' }}
                                            itemStyle={{ fontWeight: '900', color: '#10B981' }}
                                        />
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }} dy={10} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }} dx={-10} domain={['dataMin - 100', 'dataMax + 100']} />
                                        <Area type="monotone" dataKey="price" stroke="url(#colorPrice)" strokeWidth={4} fill="url(#colorPrice)" activeDot={{ r: 8, strokeWidth: 0, fill: '#10B981', className: "drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]" }} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </GlassCard>

                        {/* AI Advisor CTA Widget */}
                        <Link to="/crop" className="col-span-1 md:col-span-6 lg:col-span-2 block group">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.6, type: "spring", bounce: 0.4 }}
                                className="h-full bg-gradient-to-br from-emerald-500 to-teal-600 rounded-[2rem] p-8 text-white relative overflow-hidden transition-all duration-500 shadow-float hover:shadow-soft-emerald hover:-translate-y-1 group"
                            >
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-[80px] group-hover:bg-white/30 transition-colors duration-700 pointer-events-none"></div>

                                <div className="relative z-10 h-full flex flex-col justify-center">
                                    <div className="flex justify-between items-start mb-8">
                                        <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30">
                                            <Sprout className="w-7 h-7 text-white" />
                                        </div>
                                        <Sparkles className="w-5 h-5 text-emerald-100" />
                                    </div>
                                    <h3 className="text-3xl font-black mb-3 tracking-tight text-white">Crop AI Advisor</h3>
                                    <p className="text-emerald-50 text-sm leading-relaxed font-semibold mb-8 max-w-[250px]">
                                        Unlock hyper-personalized crop recommendations analyzed from real-time environmental data streams.
                                    </p>

                                    <div className="mt-auto flex justify-between items-center">
                                        <span className="text-sm font-black uppercase tracking-widest text-emerald-50 group-hover:text-white transition-colors">INITIATE ANALYSIS</span>
                                        <div className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-md border border-white/40 hover:border-white rounded-full text-white group-hover:bg-white group-hover:text-emerald-600 transition-all shadow-lg group-hover:rotate-45">
                                            <ArrowUpRight className="w-5 h-5" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>

                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
