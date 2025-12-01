import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Sparkles, Menu, X } from 'lucide-react';

export const Header = () => {
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navItems = [
        { path: '/', label: 'Home' },
        { path: '/user', label: 'For You' },
        { path: '/similar', label: 'Similar Books' },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <>
            <header className="glass sticky top-0 z-50 border-b border-primary-500/20">
                <div className="container">
                    <div className="flex justify-between items-center h-16 sm:h-20">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
                            <div className="relative">
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    className="relative bg-gradient-to-r from-primary-500 to-secondary-500 p-2 rounded-xl"
                                >
                                    <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                </motion.div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl sm:text-2xl font-bold gradient-text font-heading">
                                    ContentFlow
                                </span>
                                <span className="text-[10px] sm:text-xs text-slate-400 -mt-1 flex items-center gap-1">
                                    <Sparkles className="w-2 h-2 sm:w-3 sm:h-3" />
                                    AI-Powered
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex gap-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className="relative"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                                            isActive(item.path)
                                                ? 'text-white'
                                                : 'text-slate-300 hover:text-white'
                                        }`}
                                    >
                                        {isActive(item.path) && (
                                            <motion.span
                                                layoutId="nav-bubble"
                                                className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl"
                                                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                        {!isActive(item.path) && (
                                            <span className="absolute inset-0 bg-white/5 rounded-xl opacity-0 hover:opacity-100 transition-opacity"></span>
                                        )}
                                        <span className="relative z-10">{item.label}</span>
                                    </motion.div>
                                </Link>
                            ))}
                        </nav>

                        {/* Mobile Menu Button */}
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors text-slate-300"
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </motion.button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden fixed top-16 sm:top-20 left-0 right-0 z-40 glass border-b border-primary-500/20 overflow-hidden"
                    >
                        <nav className="container py-4 space-y-2">
                            {navItems.map((item, index) => (
                                <motion.div
                                    key={item.path}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link
                                        to={item.path}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                                            isActive(item.path)
                                                ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white'
                                                : 'text-slate-300 hover:bg-white/5 hover:text-white'
                                        }`}
                                    >
                                        {item.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
