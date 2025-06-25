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
            <div className="flex items-center justify-center min-h-screen bg-gray-100 text-black -mb-20">
                <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                    <div className="text-center mb-6">
                        <h1 className="text-teal-600 text-3xl font-bold">Event Explorer</h1>
                        <h2 className="text-xl font-semibold text-gray-800 mt-2">Welcome Back!</h2>
                        <p className="text-gray-500">Log in to discover local events.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-gray-600 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="you@example.com"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-gray-600 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="********"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                required
                            />
                        </div>
                        <div className="text-right">
                            <Link to="/forgot-password" className="text-orange-500 hover:underline text-sm">
                                Forgot password?
                            </Link>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition"
                        >
                            Log In
                        </button>
                    </form>

                    <div className="mt-6">
                        <button
                            onClick={handleGoogleLogIn}
                            className="w-full flex items-center justify-center bg-white text-black border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition"
                        >
                            <svg
                                aria-label="Google logo"
                                width="16"
                                height="16"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                className="mr-2"
                            >
                                <g>
                                    <path d="m0 0H512V512H0" fill="#fff"></path>
                                    <path
                                        fill="#34a853"
                                        d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                                    ></path>
                                    <path
                                        fill="#4285f4"
                                        d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                                    ></path>
                                    <path
                                        fill="#fbbc02"
                                        d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                                    ></path>
                                    <path
                                        fill="#ea4335"
                                        d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                                    ></path>
                                </g>
                            </svg>
                            Sign in with Google
                        </button>
                    </div>

                    <p className="text-center text-gray-600 mt-4">
                        Don’t have an account?{' '}
                        <Link to="/register" className="text-teal-600 hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Login;