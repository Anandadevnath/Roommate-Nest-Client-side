import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './NavBar.css';
import { AuthContext } from '../../contexts/AuthContext';

const NavBar = () => {
    const { user, signOutUser } = useContext(AuthContext);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const navigate = useNavigate();

    const handleSignOut = () => {
        signOutUser()
            .then(() => console.log('Sign out successful'))
            .catch(error => console.log(error));
        setShowMobileMenu(false);
    };

    const toggleMobileMenu = () => {
        setShowMobileMenu(!showMobileMenu);
    };

    const closeMobileMenu = () => {
        setShowMobileMenu(false);
    };

    const links = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `text-white home hover:text-blue-400 flex items-center gap-2 transition-all duration-300 px-4 py-2 rounded-lg hover:bg-blue-500/20 ${isActive ? 'text-blue-400 bg-blue-500/20' : ''
                        }`
                    }
                    onClick={closeMobileMenu}
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/all-items"
                    className={({ isActive }) =>
                        `text-white browser hover:text-blue-400 flex items-center gap-2 transition-all duration-300 px-4 py-2 rounded-lg hover:bg-blue-500/20 ${isActive ? 'text-blue-400 bg-blue-500/20' : ''
                        }`
                    }
                    onClick={closeMobileMenu}
                >
                    All Room lists
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/aboutsection"
                    className={({ isActive }) =>
                        `text-white about hover:text-blue-400 flex items-center gap-2 transition-all duration-300 px-4 py-2 rounded-lg hover:bg-blue-500/20 ${isActive ? 'text-blue-400 bg-blue-500/20' : ''
                        }`
                    }
                    onClick={closeMobileMenu}
                >
                    About Us
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/support"
                    className={({ isActive }) =>
                        `text-white room hover:text-blue-400 flex items-center gap-2 transition-all duration-300 px-4 py-2 rounded-lg hover:bg-blue-500/20 ${isActive ? 'text-blue-400 bg-blue-500/20' : ''
                        }`
                    }
                    onClick={closeMobileMenu}
                >
                    Support
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                        `text-white room hover:text-blue-400 flex items-center gap-2 transition-all duration-300 px-4 py-2 rounded-lg hover:bg-blue-500/20 ${isActive ? 'text-blue-400 bg-blue-500/20' : ''
                        }`
                    }
                    onClick={closeMobileMenu}
                >
                    Contact Us
                </NavLink>
            </li>
            {user && (
                <>
                    <li>
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) =>
                                `text-white mylist hover:text-blue-400 flex items-center gap-2 transition-all duration-300 px-4 py-2 rounded-lg hover:bg-blue-500/20 ${isActive ? 'text-blue-400 bg-blue-500/20' : ''
                                }`
                            }
                            onClick={closeMobileMenu}
                        >
                            Dashboard
                        </NavLink>
                    </li>
                </>
            )}
        </>
    );

    return (
        <div className="navbar bg-gradient-to-r from-[#0f172a]/95 via-[#1e293b]/95 to-[#0f172a]/95 text-white backdrop-blur-xl shadow-2xl border-b border-blue-500/20 fixed top-0 left-0 w-screen z-50 m-0 p-0">
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Mobile hamburger menu */}
                    <div className="lg:hidden">
                        <button
                            onClick={toggleMobileMenu}
                            className="p-2 text-white hover:text-blue-400 focus:outline-none transition-colors duration-300"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>

                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex text-white text-xl lg:text-2xl font-bold items-center gap-2 hover:text-blue-400 transition-all duration-300 transform hover:scale-105"
                    >
                        <span className='title text-white drop-shadow-lg'>Roommate</span>
                        <span className="text-blue-400 drop-shadow-lg">Finder</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex">
                        <ul className="flex items-center gap-4">{links}</ul>
                    </div>

                    {/* Right side - Theme toggle and auth buttons */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        <div className="transform hover:scale-110 transition-transform duration-200">
                        </div>
                        {!user ? (
                            <div className="hidden sm:flex items-center gap-2">
                                <button
                                    className="group relative px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-full shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 border border-blue-500/50 text-sm"
                                    onClick={() => { navigate('/login'); closeMobileMenu(); }}
                                >
                                    <span className="relative z-10">Login</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                </button>
                                <button
                                    className="group relative px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-full shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 border border-purple-500/50 text-sm"
                                    onClick={() => { navigate('/register'); closeMobileMenu(); }}
                                >
                                    <span className="relative z-10">Sign Up</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 sm:gap-4">
                                <div className="group relative">
                                    <div className="tooltip tooltip-bottom" data-tip={user.displayName || user.email}>
                                        <div className="relative">
                                            <img
                                                src={user.photoURL || 'https://via.placeholder.com/40'}
                                                alt={user.displayName || 'User'}
                                                className="w-8 h-8 sm:w-11 sm:h-11 rounded-full cursor-pointer border-2 sm:border-3 border-blue-400 hover:border-blue-300 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-blue-500/30"
                                            />
                                            <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={handleSignOut}
                                    className="group relative px-3 py-1.5 sm:px-6 sm:py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-full shadow-lg hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 border border-red-500/50 text-sm"
                                >
                                    <span className="relative z-10">Log Out</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {showMobileMenu && (
                <div className="lg:hidden absolute left-0 top-full w-full bg-gradient-to-r from-[#1e293b]/98 via-[#334155]/98 to-[#1e293b]/98 backdrop-blur-xl shadow-2xl border-t border-blue-500/20 z-40 animate-fade-in-down">
                    <div className="px-4 py-6">
                        <ul className="flex flex-col gap-3 mb-6">{links}</ul>
                        {!user && (
                            <div className="flex flex-col gap-3 pt-4 border-t border-blue-500/20">
                                <button
                                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
                                    onClick={() => { navigate('/login'); closeMobileMenu(); }}
                                >
                                    Login
                                </button>
                                <button
                                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
                                    onClick={() => { navigate('/register'); closeMobileMenu(); }}
                                >
                                    Sign Up
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NavBar;