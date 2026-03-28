import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Sprout, Mail, Lock, Loader2, ShieldCheck, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [step, setStep] = useState(1); // 1: Email, 2: OTP & New Password
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const { forgotPassword, resetPassword } = useAuth();
    const navigate = useNavigate();

    const handleSendOTP = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        const res = await forgotPassword(email);
        setIsLoading(false);
        if (res.success) {
            setStep(2);
        } else {
            setError(res.message);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        const res = await resetPassword(email, otp, newPassword);
        setIsLoading(false);
        if (res.success) {
            navigate('/login', { state: { message: 'Password reset successful! Please login.' } });
        } else {
            setError(res.message);
        }
    };

    return (
        <div className="min-h-screen flex bg-white">
            <div className="hidden lg:flex w-1/2 bg-emerald-900 relative overflow-hidden items-center justify-center">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1495107333309-f067588877a1?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
                
                <div className="relative z-10 max-w-lg px-12 text-center">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/20 mx-auto">
                        <Lock className="w-8 h-8 text-emerald-400" />
                    </div>
                    <h1 className="text-4xl font-extrabold text-white mb-6">
                        Secure your <br />
                        <span className="text-emerald-400">Agricultural Data.</span>
                    </h1>
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md space-y-8"
                >
                    <Link to="/login" className="inline-flex items-center gap-2 text-slate-500 hover:text-emerald-600 font-bold transition-colors mb-4">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Login
                    </Link>

                    <div>
                        <h2 className="text-3xl font-bold text-slate-900">Forgot Password?</h2>
                        <p className="text-slate-500 mt-2">No worries, we'll send you reset instructions.</p>
                    </div>

                    <AnimatePresence mode="wait">
                        {error && (
                            <motion.div 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-medium"
                            >
                                {error}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {step === 1 ? (
                        <form onSubmit={handleSendOTP} className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
                                    <input
                                        type="email"
                                        required
                                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                                        placeholder="farmer@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                            >
                                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Send Reset Link'}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleResetPassword} className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Verification Code</label>
                                <div className="relative group">
                                    <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
                                    <input
                                        type="text"
                                        required
                                        maxLength="6"
                                        className="w-full pl-12 pr-4 py-3.5 bg-emerald-50/50 border border-emerald-200 rounded-xl text-slate-800 font-bold tracking-widest text-lg"
                                        placeholder="------"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">New Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
                                    <input
                                        type="password"
                                        required
                                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                                        placeholder="••••••••"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-lg shadow-slate-900/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                            >
                                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Reset Password'}
                            </button>
                        </form>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default ForgotPassword;
