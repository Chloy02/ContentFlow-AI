import { Link, useLocation } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

export const Header = () => {
    const location = useLocation();

    const navItems = [
        { path: '/', label: 'Home' },
        { path: '/user', label: 'User Recommendations' },
        { path: '/similar', label: 'Similar Books' },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <BookOpen className="w-8 h-8 text-primary-600 group-hover:text-primary-700 transition-colors" />
                        <span className="text-xl font-bold text-gray-900">
                            BookRecs<span className="text-primary-600">.AI</span>
                        </span>
                    </Link>

                    {/* Navigation */}
                    <nav className="flex gap-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive(item.path)
                                        ? 'bg-primary-50 text-primary-700'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    );
};
