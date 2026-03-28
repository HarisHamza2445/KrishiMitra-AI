import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import api from '../services/api';
import { compressImage } from '../utils/imageUtils';
import { Upload, X, Loader2, AlertTriangle, CheckCircle, Stethoscope, Image as ImageIcon, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DiseaseDetection = () => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(''); // 'compressing', 'uploading', 'analyzing'
    const [error, setError] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
            setResult(null);
            setError('');
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        setPreview(null);
        setResult(null);
    };

    const handleAnalyze = async () => {
        if (!image) return;

        setLoading(true);
        setError('');
        setStatus('compressing');

        try {
            // 1. Compress Image
            const compressedFile = await compressImage(image);

            // 2. Upload and Analyze
            setStatus('analyzing');
            const formData = new FormData();
            formData.append('image', compressedFile);

            const res = await api.post('/disease/analyze', formData, {
                headers: {
                    'Content-Type': undefined,
                },
            });
            setResult(res.data);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || err.message || 'Failed to analyze image');
        } finally {
            setLoading(false);
            setStatus('');
        }
    };

    return (
        <div className="min-h-screen font-sans selection:bg-emerald-200 selection:text-emerald-900">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-slate-800 mb-2 flex items-center justify-center gap-2">
                        <Stethoscope className="text-emerald-500" />
                        Crop Health AI
                    </h1>
                    <p className="text-slate-500 font-medium">
                        Upload a photo of your crop to detect diseases and get treatment advice.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Upload Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass-card p-8 group hover:shadow-soft-emerald hover:-translate-y-1 transition-all duration-500 h-fit"
                    >
                        <div className="flex justify-between items-center mb-6 relative z-10">
                            <h2 className="text-xl font-bold text-slate-800">Upload Image</h2>
                            {image && (
                                <div className="text-xs font-bold px-2 py-1 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-lg flex items-center gap-1 shadow-sm">
                                    <Zap className="w-3 h-3" />
                                    <span>Fast Mode Active</span>
                                </div>
                            )}
                        </div>

                        {!preview ? (
                            <div className="relative z-10 border-2 border-dashed border-slate-300 rounded-2xl p-10 transition-all duration-300 hover:border-emerald-400 hover:bg-emerald-50/30 group cursor-pointer bg-slate-50/50">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <div className="flex flex-col items-center justify-center text-slate-400 group-hover:text-emerald-500 transition-colors">
                                    <div className="p-4 bg-white rounded-full mb-4 shadow-sm group-hover:scale-110 transition-transform ring-1 ring-slate-100 group-hover:shadow-emerald-500/20 group-hover:ring-emerald-100">
                                        <Upload className="w-8 h-8" />
                                    </div>
                                    <p className="font-bold text-lg text-slate-600 group-hover:text-emerald-600">Click or Drag to Upload</p>
                                    <p className="text-sm mt-2 font-medium">JPG, PNG supported</p>
                                </div>
                            </div>
                        ) : (
                            <div className="relative z-10 rounded-2xl overflow-hidden border border-slate-200 group shadow-md">
                                <img src={preview} alt="Crop Preview" className="w-full h-64 object-cover" />
                                <button
                                    onClick={handleRemoveImage}
                                    className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-rose-500 hover:text-white rounded-full text-slate-600 backdrop-blur-sm transition-all shadow-lg"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-sm text-slate-800 text-sm font-bold border-t border-white/20 flex justify-between">
                                    <span>{image.name}</span>
                                    <span className="opacity-75">{(image.size / 1024 / 1024).toFixed(2)} MB</span>
                                </div>
                            </div>
                        )}

                        <button
                            onClick={handleAnalyze}
                            disabled={!image || loading}
                            className="relative z-10 w-full mt-6 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/30 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    {status === 'compressing' ? 'Optimizing Image...' : 'Analyzing Crop...'}
                                </>
                            ) : (
                                <>
                                    Analyze for Disease
                                    <Stethoscope className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </motion.div>

                    {/* Result Section */}
                    <div className="space-y-6">
                        {error && (
                            <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 flex items-center gap-3 font-medium">
                                <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                                {error}
                            </div>
                        )}

                        <AnimatePresence mode="wait">
                            {result ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="glass-card p-8 group hover:shadow-soft-emerald hover:-translate-y-1 transition-all duration-500"
                                >
                                    <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                                        <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-100 shadow-sm">
                                            <CheckCircle className="w-6 h-6 text-emerald-500" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-slate-800">Diagnosis Report</h2>
                                            <p className="text-emerald-600 font-bold text-lg drop-shadow-sm">{result.analysis.diseaseName}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4 text-slate-600">
                                        <div>
                                            <h3 className="font-bold text-slate-800 mb-1">Description</h3>
                                            <p className="leading-relaxed">{result.analysis.description}</p>
                                        </div>

                                        <div className="bg-rose-50 p-4 rounded-xl border border-rose-100 shadow-sm">
                                            <h3 className="font-bold text-rose-700 mb-1 flex items-center gap-2">
                                                <Stethoscope className="w-4 h-4" /> Treatment
                                            </h3>
                                            <p className="text-rose-800">{result.analysis.treatment}</p>
                                        </div>

                                        <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 shadow-sm">
                                            <h3 className="font-bold text-emerald-700 mb-1">Preventive Measures</h3>
                                            <p className="text-emerald-800">{result.analysis.preventiveMeasures}</p>
                                        </div>
                                    </div>

                                    <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
                                        <div className="flex justify-between items-center mb-2">
                                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Confidence Score</h4>
                                            <span className="text-xs font-bold text-slate-600">{result.analysis.confidence}</span>
                                        </div>
                                        <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                                            <div
                                                className="bg-gradient-to-r from-emerald-400 to-teal-500 h-2.5 rounded-full shadow-sm"
                                                style={{ width: result.analysis.confidence === 'High' ? '90%' : result.analysis.confidence === 'Medium' ? '60%' : '30%' }}
                                            ></div>
                                        </div>
                                        <p className="text-right text-xs text-slate-500 mt-2 font-medium">{result.analysis.confidence} Confidence</p>
                                    </div>
                                    </div>
                                </motion.div>
                            ) : (
                            <div className="h-full flex flex-col items-center justify-center text-slate-400 p-8 border-2 border-dashed border-slate-200 rounded-2xl bg-white/50 backdrop-blur-sm glass-hover shadow-sm transition-all duration-300">
                                    <ImageIcon className="w-16 h-16 mb-4 opacity-50 drop-shadow-sm" />
                                    <p className="font-medium">Upload an image to see the diagnosis here.</p>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DiseaseDetection;
