import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './NavBar.css';
import { AuthContext } from '../../contexts/AuthContext';
import ThemeToggle from '../themetoggle';

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
                <NavLink to="/" className="text-white home hover:text-teal-400 flex items-center gap-2" onClick={closeMobileMenu}>
                    Home
                </NavLink>
            </li>
            {user && (
                <li>
                    <NavLink to="/createroom" className="text-white room hover:text-teal-400 flex items-center gap-2" onClick={closeMobileMenu}>
                        Add to Find Roommate
                    </NavLink>
                </li>
            )}
            <li>
                <NavLink to="/browselist" className="text-white browser hover:text-teal-400 flex items-center gap-2" onClick={closeMobileMenu}>
                    Browse Listing
                </NavLink>
            </li>
            {user && (
                <li>
                    <NavLink to="/mylist" className="text-white mylist hover:text-teal-400 flex items-center gap-2" onClick={closeMobileMenu}>
                        My Listings
                    </NavLink>
                </li>
            )}
            <li>
                <NavLink to="/browselist" className="text-white browser hover:text-teal-400 flex items-center gap-2" onClick={closeMobileMenu}>
                    About
                </NavLink>
            </li>
        </>
    );

    return (
        <div className="navbar bg-[#111827]/70 text-white backdrop-blur-md shadow-md fixed top-0 left-0 w-full z-50">
            <div className="navbar-start">
                <div className="lg:hidden">
                    <button
                        onClick={toggleMobileMenu}
                        className="text-white text-2xl font-bold flex items-center gap-2 focus:outline-none"
                    >
                        <span className='titlemb text-white'>Roommate</span>
                        <span className="text-blue-400">Finder</span>
                    </button>
                </div>

                <Link to="/" className="hidden lg:flex text-white text-2xl font-bold items-center gap-2">
                    <span className='title text-white'>Roommate</span>
                    <span className="text-blue-400">Finder</span>
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{links}</ul>
            </div>

            <div className="navbar-end flex items-center gap-6 ">
                <ThemeToggle />
                {!user ? (
                    <>
                        <button
                            className="btn btn-sm bg-teal-600 hover:bg-teal-700 text-white"
                            onClick={() => { navigate('/login'); closeMobileMenu(); }}
                        >
                            Login
                        </button>
                        <button
                            className="btn btn-sm bg-gray-600 hover:bg-gray-700 text-white"
                            onClick={() => { navigate('/register'); closeMobileMenu(); }}
                        >
                            Signup
                        </button>
                    </>
                ) : (
                    <div className="flex items-center gap-4">
                        <div className="tooltip tooltip-bottom" data-tip={user.displayName || user.email}>
                            <img
                                src={user.photoURL || 'https://via.placeholder.com/40'}
                                alt={user.displayName || 'User'}
                                className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-500"
                            />
                        </div>
                        <button
                            onClick={handleSignOut}
                            className="btn btn-sm bg-red-600 hover:bg-red-700 text-white"
                        >
                            Log out
                        </button>
                    </div>
                )}
            </div>

            {showMobileMenu && (
                <div className="absolute left-0 top-full w-full bg-[#1e293b] shadow-lg border-t border-gray-700 z-40 animate-fade-in-down">
                    <ul className="flex flex-col gap-3 px-6 py-4">{links}</ul>
                </div>
            )}
        </div>
    );
};

export default NavBar;