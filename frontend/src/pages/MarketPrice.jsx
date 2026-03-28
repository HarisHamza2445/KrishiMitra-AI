import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import api from '../services/api';
import AddPriceModal from '../components/market/AddPriceModal';
import { TrendingUp, DollarSign, Calendar, MapPin, Sprout, Loader2, ArrowUpRight, ArrowDownRight, Plus, Database } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

const MarketPrice = () => {
    const [crop, setCrop] = useState('Wheat');
    const [location, setLocation] = useState('Punjab');
    const [marketData, setMarketData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [seeding, setSeeding] = useState(false);

    const fetchMarketData = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await api.get(`/market/${crop}/${location}`);
            if (res.data.history.length === 0) {
                setMarketData(null);
                setError('No data found for this selection.');
            } else {
                setMarketData(res.data);
            }
        } catch (err) {
            console.error(err);
            setError('No data found for this crop/location. Try adding some prices first.');
            setMarketData(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMarketData();
    }, [crop, location]);

    const handleSeedData = async () => {
        setSeeding(true);
        try {
            // Generate last 30 days of dummy data
            const today = new Date();
            const basePrice = 2200 + Math.random() * 500;

            for (let i = 30; i >= 0; i--) {
                const date = new Date(today);
                date.setDate(date.getDate() - i);

                // Random fluctuation
                const price = Math.round(basePrice + Math.sin(i) * 100 + (Math.random() * 50 - 25));

                await api.post('/market/add', {
                    crop,
                    location,
                    price,
                    date: date.toISOString().split('T')[0]
                });
            }
            fetchMarketData();
        } catch (err) {
            console.error("Seeding failed", err);
        } finally {
            setSeeding(false);
        }
    };

    // Format data for chart
    const chartData = marketData ? [
        ...marketData.history.map(d => ({
            date: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            price: d.price,
            type: 'History'
        })),
        ...(marketData.predictions || []).map(p => ({
            date: new Date(p.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            price: p.price,
            type: 'Prediction'
        }))
    ] : [];

    const currentPrice = marketData?.history[marketData.history.length - 1]?.price;
    const prevPrice = marketData?.history[marketData.history.length - 2]?.price;
    const priceChange = currentPrice && prevPrice ? ((currentPrice - prevPrice) / prevPrice * 100).toFixed(1) : 0;
    const isPositive = priceChange >= 0;

    return (
        <div className="min-h-screen font-sans selection:bg-emerald-200 selection:text-emerald-900">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-black tracking-tight text-slate-800 mb-2 flex items-center gap-2">
                            <TrendingUp className="text-emerald-500" />
                            Market Intelligence
                        </h1>
                        <p className="text-slate-500 font-medium">Track prices and get AI-powered future trends.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 items-end sm:items-center">
                        {/* Filters */}
                        <div className="flex gap-2 bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm">
                            <select
                                value={crop}
                                onChange={(e) => setCrop(e.target.value)}
                                className="pl-3 pr-8 py-2 bg-slate-50 border border-slate-100 rounded-lg text-slate-700 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer hover:bg-slate-100 transition-colors"
                            >
                                <option value="Wheat">Wheat</option>
                                <option value="Rice">Rice</option>
                                <option value="Maize">Maize</option>
                                <option value="Potato">Potato</option>
                            </select>
                            <select
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="pl-3 pr-8 py-2 bg-slate-50 border border-slate-100 rounded-lg text-slate-700 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer hover:bg-slate-100 transition-colors"
                            >
                                <option value="Punjab">Punjab</option>
                                <option value="Haryana">Haryana</option>
                                <option value="UP">Uttar Pradesh</option>
                                <option value="MP">Madhya Pradesh</option>
                            </select>
                        </div>

                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/30 transition-all flex items-center gap-2 text-sm hover:-translate-y-0.5"
                        >
                            <Plus className="w-4 h-4" />
                            Add Price
                        </button>
                    </div>
                </div>

                {loading && !seeding ? (
                    <div className="flex justify-center py-40">
                        <Loader2 className="w-12 h-12 text-emerald-600 animate-spin" />
                    </div>
                ) : !marketData ? (
                    <div className="text-center py-20 glass-card max-w-2xl mx-auto">
                        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Database className="w-10 h-10 text-emerald-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-3">No Data for {crop} in {location}</h3>
                        <p className="text-slate-500 mb-8 font-medium max-w-md mx-auto">
                            We don't have any market data for this combination yet. You can add a price manually or generate demo data.
                        </p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setIsAddModalOpen(true)}
                                className="px-6 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
                            >
                                Add Manual Price
                            </button>
                            <button
                                onClick={handleSeedData}
                                disabled={seeding}
                                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-emerald-500/30 flex items-center gap-2"
                            >
                                {seeding ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Generate Demo Data'}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Current Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="glass-card group hover:shadow-soft-emerald p-8 lg:col-span-1 space-y-8 hover:-translate-y-1 transition-all duration-500"
                        >
                            <div>
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Current Market Price</p>
                                <div className="flex items-end gap-2">
                                    <span className="text-5xl font-black text-slate-800 tracking-tight">₹{currentPrice}</span>
                                    <span className="text-slate-500 mb-2 font-medium">/quintal</span>
                                </div>
                                <div className={`inline-flex items-center gap-1 mt-4 px-3 py-1.5 rounded-full text-xs font-bold border ${isPositive ? 'bg-green-50 text-green-600 border-green-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                                    {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                    <span>{Math.abs(priceChange)}% vs yesterday</span>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-slate-100">
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">AI Forecast (Next 7 Days)</p>
                                <div className="flex items-end gap-2">
                                    <span className="text-4xl font-bold text-gradient">
                                        ₹{marketData.predictions && marketData.predictions.length > 0 ? Math.round(marketData.predictions[marketData.predictions.length - 1].price) : '...'}
                                    </span>
                                    <span className="text-slate-500 mb-1 font-medium">/quintal</span>
                                </div>
                                <p className="text-xs text-slate-400 mt-2 font-medium leading-relaxed">
                                    Based on linear regression of past 30 days data. <br />
                                    Confidence: <span className="text-emerald-500 font-bold">High</span>
                                </p>
                            </div>
                        </motion.div>

                        {/* Chart */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="glass-card group hover:shadow-soft-emerald p-8 lg:col-span-2 flex flex-col hover:-translate-y-1 transition-all duration-500"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-slate-800">Price Trend Analysis</h3>
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                                    <span className="text-xs font-bold text-slate-500">History</span>
                                    <span className="w-3 h-3 rounded-full bg-emerald-300 ml-2 dashed-circle"></span>
                                    <span className="text-xs font-bold text-slate-500">Prediction</span>
                                </div>
                            </div>

                            <div className="h-[350px] w-full mt-auto">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={chartData}>
                                        <defs>
                                            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                                                <stop offset="95%" stopColor="#34D399" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} opacity={0.5} />
                                        <XAxis
                                            dataKey="date"
                                            stroke="#94a3b8"
                                            axisLine={false}
                                            tickLine={false}
                                            dy={10}
                                            tick={{ fontSize: 12, fontWeight: 700 }}
                                        />
                                        <YAxis
                                            stroke="#94a3b8"
                                            axisLine={false}
                                            tickLine={false}
                                            dx={-10}
                                            tick={{ fontSize: 12, fontWeight: 700 }}
                                            domain={['auto', 'auto']}
                                        />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#fff', borderColor: '#e2e8f0', color: '#1e293b', borderRadius: '16px', boxShadow: '0 20px 40px -15px rgba(16,185,129,0.15)', padding: '12px' }}
                                            itemStyle={{ color: '#10B981', fontWeight: 'bold' }}
                                            cursor={{ stroke: '#cbd5e1', strokeWidth: 2, strokeDasharray: '5 5' }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="price"
                                            stroke="#10B981"
                                            strokeWidth={4}
                                            fillOpacity={1}
                                            fill="url(#colorPrice)"
                                            activeDot={{ r: 8, strokeWidth: 0, fill: '#10B981', className: "drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]" }}
                                            animationDuration={1500}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </motion.div>
                    </div>
                )}
            </main>

            <AddPriceModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSuccess={fetchMarketData}
                defaultCrop={crop}
                defaultLocation={location}
            />
        </div>
    );
};

export default MarketPrice;
