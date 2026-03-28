import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import { getWeather, getCoordinates } from '../services/weatherService';
import { Search, MapPin, Wind, Droplets, CloudSun, Sun, CloudRain, CloudSnow, CloudLightning } from 'lucide-react';
import { motion } from 'framer-motion';

const Weather = () => {
    const [city, setCity] = useState('New Delhi');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchWeather = async (cityName) => {
        setLoading(true);
        setError('');
        try {
            const coords = await getCoordinates(cityName);
            const data = await getWeather(coords.latitude, coords.longitude);
            setWeatherData({ ...data, city: coords.name, country: coords.country });
        } catch (err) {
            setError('Could not fetch weather data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeather('New Delhi');
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (city.trim()) {
            fetchWeather(city);
        }
    };

    const getWeatherIcon = (code) => {
        if (code === 0) return <Sun className="w-12 h-12 text-amber-400" />;
        if (code >= 1 && code <= 3) return <CloudSun className="w-12 h-12 text-slate-400" />;
        if (code >= 51 && code <= 67) return <CloudRain className="w-12 h-12 text-blue-500" />;
        if (code >= 71 && code <= 77) return <CloudSnow className="w-12 h-12 text-sky-300" />;
        if (code >= 95) return <CloudLightning className="w-12 h-12 text-purple-500" />;
        return <CloudSun className="w-12 h-12 text-slate-400" />;
    };

    return (
        <div className="min-h-screen font-sans selection:bg-emerald-200 selection:text-emerald-900">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Search Bar */}
                <div className="flex justify-center mb-10">
                    <form onSubmit={handleSearch} className="relative w-full max-w-md">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search city..."
                            className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-full text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all shadow-xl shadow-slate-200/50 font-medium"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                        <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-full transition-colors shadow-lg shadow-emerald-500/20">
                            Search
                        </button>
                    </form>
                </div>

                {loading ? (
                    <div className="flex justify-center mt-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-emerald-500"></div>
                    </div>
                ) : error ? (
                    <div className="text-center text-red-500 mt-10 font-medium bg-red-50 p-4 rounded-xl inline-block mx-auto">{error}</div>
                ) : weatherData && (
                    <div className="space-y-8">
                        {/* Current Weather */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-[2rem] p-8 md:p-12 text-white shadow-float hover:shadow-soft-emerald hover:-translate-y-1 transition-all duration-500 relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-10 -translate-y-10 group-hover:scale-110 transition-transform duration-700">
                                <Sun className="w-80 h-80" />
                            </div>

                            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
                                <div className="text-center md:text-left">
                                    <div className="flex items-center justify-center md:justify-start gap-2 mb-2 opacity-90 font-medium">
                                        <MapPin className="w-5 h-5" />
                                        <span className="text-lg tracking-wide">{weatherData.city}, {weatherData.country}</span>
                                    </div>
                                    <h1 className="text-7xl md:text-9xl font-black mb-4 tracking-tighter drop-shadow-sm">{Math.round(weatherData.current.temperature_2m)}°</h1>
                                    <div className="flex items-center justify-center md:justify-start gap-6 text-emerald-50 font-medium tracking-wide">
                                        <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-md shadow-inner border border-white/20">
                                            <Wind className="w-5 h-5" />
                                            <span>{weatherData.current.wind_speed_10m} km/h</span>
                                        </div>
                                        <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-md shadow-inner border border-white/20">
                                            <Droplets className="w-5 h-5" />
                                            <span>{weatherData.current.relative_humidity_2m}% Humidity</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="bg-white/20 p-6 md:p-8 rounded-[2rem] backdrop-blur-md border border-white/20 shadow-lg group-hover:-translate-y-2 transition-transform duration-500">
                                        <div className="transform scale-125 mb-2">
                                            {getWeatherIcon(weatherData.current.weather_code)}
                                        </div>
                                        <p className="mt-4 text-2xl font-bold tracking-tight text-white drop-shadow-sm">
                                            {/* Simplified weather text */}
                                            Mostly Sunny
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Forecast Grid */}
                        <div>
                            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-slate-500" />
                                7-Day Forecast
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                                {weatherData.daily.time.slice(0, 7).map((date, index) => (
                                    <motion.div
                                        key={date}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="glass-card group hover:shadow-soft-emerald hover:-translate-y-1 transition-all duration-300 p-4 text-center cursor-default"
                                    >
                                        <div className="relative z-10 w-full h-full">
                                        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-3">{new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}</p>
                                        <div className="flex justify-center mb-3">
                                            {getWeatherIcon(weatherData.daily.weather_code[index])}
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-slate-800 font-bold text-lg">{Math.round(weatherData.daily.temperature_2m_max[index])}°</p>
                                            <p className="text-slate-400 text-sm font-medium">{Math.round(weatherData.daily.temperature_2m_min[index])}°</p>
                                        </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

function Calendar(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
            <line x1="16" x2="16" y1="2" y2="6" />
            <line x1="8" x2="8" y1="2" y2="6" />
            <line x1="3" x2="21" y1="10" y2="10" />
        </svg>
    )
}

export default Weather;
