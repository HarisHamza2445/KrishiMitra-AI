import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import { Sprout, LogOut, LayoutDashboard, CloudSun, Stethoscope, TrendingUp, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    const isActive = (path) => location.pathname === path;

    const navItems = [
        { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/crop-ai', label: 'Crop AI', icon: Sprout },
        { path: '/weather', label: 'Weather', icon: CloudSun },
        { path: '/disease', label: 'Disease Doctor', icon: Stethoscope },
        { path: '/market', label: 'Market', icon: TrendingUp },
    ];

    return (
        <React.Fragment>
            {/* Desktop Floating Navbar */}
            <div className="hidden md:flex fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-4">
                <motion.nav
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="w-full bg-white/90 backdrop-blur-2xl ring-1 ring-slate-900/5 shadow-soft-emerald rounded-full px-6 py-3 flex items-center justify-between"
                >
                    {/* Brand */}
                    <Link to="/" className="flex items-center gap-2.5 group">
                        <div className="bg-emerald-500 p-2 rounded-full shadow-md shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                            <Sprout className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-slate-800 tracking-tight">
                            KrishiMitra
                        </span>
                    </Link>

                    {/* Navigation */}
                    <div className="flex items-center gap-1 bg-slate-50 p-1.5 rounded-full ring-1 ring-slate-200">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${isActive(item.path)
                                        ? 'text-emerald-700'
                                        : 'text-slate-500 hover:text-emerald-600 hover:bg-slate-100'
                                    }`}
                            >
                                {isActive(item.path) && (
                                    <motion.div
                                        layoutId="nav-pill"
                                        className="absolute inset-0 bg-emerald-50 border border-emerald-100/50 rounded-full shadow-sm"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10 flex items-center gap-2">
                                    <item.icon className={`w-4 h-4 ${isActive(item.path) ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                                    {item.label}
                                </span>
                            </Link>
                        ))}
                    </div>

                    {/* User Profile */}
                    <div className="flex items-center gap-4 pl-4 border-l border-slate-200/50">
                        <div className="hidden lg:flex flex-col items-end">
                            <span className="text-xs font-bold text-slate-700">{user?.name}</span>
                            <span className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">Farmer</span>
                        </div>
                        <button
                            onClick={logout}
                            className="p-2.5 bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-full transition-all duration-300 border border-transparent hover:border-red-100 group"
                            title="Logout"
                        >
                            <LogOut className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                        </button>
                    </div>
                </motion.nav>
            </div>

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200 px-4 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2">
                    <div className="bg-emerald-500 p-1.5 rounded-lg shadow-sm">
                        <Sprout className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-lg text-slate-800">KrishiMitra</span>
                </Link>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-x-0 top-16 z-40 bg-white border-b border-slate-200 p-4 md:hidden shadow-xl"
                    >
                        <div className="flex flex-col gap-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${isActive(item.path)
                                            ? 'bg-emerald-50 text-emerald-700 font-semibold'
                                            : 'text-slate-600 hover:bg-slate-50'
                                        }`}
                                >
                                    <item.icon className="w-5 h-5" />
                                    {item.label}
                                </Link>
                            ))}
                            <div className="h-px bg-slate-100 my-2" />
                            <button
                                onClick={logout}
                                className="flex items-center gap-3 p-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors font-medium"
                            >
                                <LogOut className="w-5 h-5" />
                                Logout
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Spacer for fixed nav */}
            <div className="h-20 md:h-28" />
        </React.Fragment>
    );
};

export default Navbar;
