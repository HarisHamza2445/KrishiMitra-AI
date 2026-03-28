import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import api from '../services/api';
import { Sprout, MapPin, Layers, Ruler, Calendar, Loader2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const CropRecommendation = () => {
    const [formData, setFormData] = useState({
        location: '',
        soilType: '',
        farmSize: '',
        season: ''
    });
    const [recommendation, setRecommendation] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setRecommendation('');

        try {
            const res = await api.post('/crops/recommend', formData);
            setRecommendation(res.data.recommendation);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to get recommendation');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-slate-800 mb-2 flex items-center justify-center gap-2">
                        <Sparkles className="text-green-500 fill-green-500" />
                        AI Crop Advisor
                    </h1>
                    <p className="text-slate-500 font-medium">
                        Get personalized crop recommendations based on your farm's unique conditions.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Input Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50 h-fit"
                    >
                        <h2 className="text-xl font-bold text-slate-800 mb-6">Farm Details</h2>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="text-sm font-bold text-slate-700 ml-1 mb-1.5 block">Location</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="text"
                                        required
                                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all font-medium"
                                        placeholder="e.g. Ludhiana, Punjab"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-bold text-slate-700 ml-1 mb-1.5 block">Soil Type</label>
                                <div className="relative">
                                    <Layers className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="text"
                                        required
                                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all font-medium"
                                        placeholder="e.g. Alluvial, Black Soil"
                                        value={formData.soilType}
                                        onChange={(e) => setFormData({ ...formData, soilType: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-bold text-slate-700 ml-1 mb-1.5 block">Farm Size</label>
                                    <div className="relative">
                                        <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <input
                                            type="text"
                                            required
                                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all font-medium"
                                            placeholder="e.g. 5 acres"
                                            value={formData.farmSize}
                                            onChange={(e) => setFormData({ ...formData, farmSize: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-bold text-slate-700 ml-1 mb-1.5 block">Season</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <select
                                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all appearance-none font-medium cursor-pointer"
                                            value={formData.season}
                                            onChange={(e) => setFormData({ ...formData, season: e.target.value })}
                                        >
                                            <option value="">Select Season</option>
                                            <option value="Rabi">Rabi (Winter)</option>
                                            <option value="Kharif">Kharif (Monsoon)</option>
                                            <option value="Zaid">Zaid (Summer)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3.5 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-bold rounded-xl shadow-lg shadow-green-500/20 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Analyzing...
                                    </>
                                ) : (
                                    <>
                                        Get Recommendation
                                        <Sprout className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>

                    {/* Result Display */}
                    <div className="space-y-6">
                        {error && (
                            <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 font-medium">
                                {error}
                            </div>
                        )}

                        {recommendation && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white p-8 rounded-2xl border border-green-100 shadow-xl shadow-green-100/50"
                            >
                                <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                                    <div className="p-2 bg-green-50 rounded-lg">
                                        <Sparkles className="w-6 h-6 text-green-500" />
                                    </div>
                                    <h2 className="text-xl font-bold text-slate-800">AI Recommendation</h2>
                                </div>

                                <div className="prose prose-slate max-w-none text-slate-600">
                                    <div className="whitespace-pre-wrap font-sans leading-loose text-lg">
                                        {recommendation}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {!recommendation && !loading && (
                            <div className="h-full flex flex-col items-center justify-center text-slate-400 p-8 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
                                <Sprout className="w-16 h-16 mb-4 opacity-50" />
                                <p className="font-medium">Enter your farm details to get an AI-powered crop plan.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CropRecommendation;
