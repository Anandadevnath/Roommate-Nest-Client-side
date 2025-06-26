import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import NavBar from './../NavBar/NavBar';
import Footer from '../Footer/Footer';

const Login = () => {
    const { signInUser, googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        signInUser(email, password)
            .then((result) => {
                navigate(location?.state?.from || '/');
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleGoogleLogIn = () => {
        googleSignIn()
            .then((result) => {
                navigate(location?.state?.from || '/');
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <>
            <NavBar />
            <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] flex items-center justify-center px-4 py-12 relative overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                    <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
                </div>

                <div className="relative z-10 w-full max-w-md mt-16">
                    <div className="glass-card p-8 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                                Roommate Finder
                            </h1>
                            <p className="text-gray-300">Sign in to find your perfect roommate.</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="email" className="block text-white mb-2 font-medium">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="you@example.com"
                                            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-gray-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-white mb-2 font-medium">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                        </div>
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            placeholder="••••••••"
                                            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-gray-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="text-right">
                                <Link 
                                    to="/forgot-password" 
                                    className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors duration-300 hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            
                            <button
                                type="submit"
                                className="group relative w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-0.5 shadow-lg hover:shadow-purple-500/25 border border-purple-500/50"
                            >
                                <span className="relative z-10 flex items-center justify-center space-x-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                    </svg>
                                    <span>Sign In</span>
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                            </button>
                        </form>

                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-600/30"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 text-gray-400 bg-transparent">Or continue with</span>
                            </div>
                        </div>

                        <button
                            onClick={handleGoogleLogIn}
                            className="group relative w-full flex items-center justify-center py-3 bg-white/5 border border-gray-500/30 text-white font-medium rounded-xl hover:bg-white/10 transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-0.5"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-yellow-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <svg
                                className="mr-3 w-5 h-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                            >
                                <path fill="#4285f4" d="M386 400c-45-42-78-75-78-75s45-48 78-75c55-33 90-17 90 25v100c0 42-35 58-90 25z"/>
                                <path fill="#34a853" d="M90 341c30 30 78 30 108 0s30-78 0-108-78-30-108 0-30 78 0 108z"/>
                                <path fill="#fbbc02" d="M153 219c30-30 78-30 108 0l55-54c-45-45-118-45-163 0s-45 118 0 163l54-55c0-30 0-54-54-54z"/>
                                <path fill="#ea4335" d="M153 292c30 30 78 30 108 0l55 54c-45 45-118 45-163 0s-45-118 0-163l54 55c0 30 0 54 54 54z"/>
                            </svg>
                            <span className="relative z-10">Continue with Google</span>
                        </button>

                        <div className="mt-8 text-center">
                            <p className="text-gray-300">
                                Don't have an account?{' '}
                                <Link 
                                    to="/register" 
                                    className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-300 hover:underline"
                                >
                                    Create account
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Login;