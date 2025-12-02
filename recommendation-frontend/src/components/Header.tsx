import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
            <header style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                width: '100%',
                zIndex: 1000,
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                borderBottom: '1px solid rgba(168, 85, 247, 0.2)',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
            }}>
                <div style={{
                    maxWidth: '1400px',
                    margin: '0 auto',
                    padding: '0 1.5rem',
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        height: '4.5rem',
                    }}>
                        {/* Logo */}
                        <Link to="/" style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            textDecoration: 'none',
                        }}>
                            <div style={{
                                background: 'linear-gradient(135deg, #a855f7 0%, #d946ef 100%)',
                                padding: '0.5rem',
                                borderRadius: '0.75rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <BookOpen style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{
                                    fontSize: '1.5rem',
                                    fontWeight: 'bold',
                                    background: 'linear-gradient(135deg, #a855f7 0%, #d946ef 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                }}>
                                    ContentFlow
                                </span>
                                <span style={{
                                    fontSize: '0.75rem',
                                    color: '#94a3b8',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.25rem',
                                    marginTop: '-0.25rem',
                                }}>
                                    <Sparkles style={{ width: '0.75rem', height: '0.75rem' }} />
                                    AI-Powered
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav style={{ display: 'none' }} className="md:flex" 
                            onLoad={(e) => (e.currentTarget.style.display = 'flex')}>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    style={{
                                        padding: '0.625rem 1.25rem',
                                        borderRadius: '0.75rem',
                                        fontSize: '0.875rem',
                                        fontWeight: '500',
                                        textDecoration: 'none',
                                        transition: 'all 0.2s',
                                        ...(isActive(item.path) ? {
                                            background: 'linear-gradient(135deg, #a855f7 0%, #d946ef 100%)',
                                            color: 'white',
                                        } : {
                                            color: '#cbd5e1',
                                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                        }),
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isActive(item.path)) {
                                            e.currentTarget.style.color = 'white';
                                            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isActive(item.path)) {
                                            e.currentTarget.style.color = '#cbd5e1';
                                            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                                        }
                                    }}
                                >
                                    {item.label}
                                </Link>
                            ))}
                            </div>
                        </nav>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            style={{
                                padding: '0.5rem',
                                borderRadius: '0.5rem',
                                border: 'none',
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                color: '#cbd5e1',
                                cursor: 'pointer',
                                transition: 'background-color 0.2s',
                            }}
                            className="md:hidden"
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'}
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div style={{
                    position: 'fixed',
                    top: '4.5rem',
                    left: 0,
                    right: 0,
                    zIndex: 999,
                    backgroundColor: 'rgba(15, 23, 42, 0.98)',
                    borderBottom: '1px solid rgba(168, 85, 247, 0.2)',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
                }} className="md:hidden">
                    <nav style={{
                        maxWidth: '1400px',
                        margin: '0 auto',
                        padding: '1rem 1.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                    }}>
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setMobileMenuOpen(false)}
                                style={{
                                    padding: '0.75rem 1rem',
                                    borderRadius: '0.75rem',
                                    fontSize: '0.875rem',
                                    fontWeight: '500',
                                    textDecoration: 'none',
                                    transition: 'all 0.2s',
                                    ...(isActive(item.path) ? {
                                        background: 'linear-gradient(135deg, #a855f7 0%, #d946ef 100%)',
                                        color: 'white',
                                    } : {
                                        color: '#cbd5e1',
                                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                    }),
                                }}
                                onMouseEnter={(e) => {
                                    if (!isActive(item.path)) {
                                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                                        e.currentTarget.style.color = 'white';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isActive(item.path)) {
                                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                                        e.currentTarget.style.color = '#cbd5e1';
                                    }
                                }}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </>
    );
};
