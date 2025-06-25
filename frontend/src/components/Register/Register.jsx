import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { updateProfile } from 'firebase/auth';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';

const Register = () => {
    const { createUser, googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const photoURL = e.target.photoURL.value;
        const password = e.target.password.value;

        // Password validation
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (!passwordRegex.test(password)) {
            setError('Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long.');
            return;
        }

        try {
            const result = await createUser(email, password);
            const user = result.user;
            await updateProfile(user, {
                displayName: name,
                photoURL: photoURL || 'https://via.placeholder.com/150',
            });

            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    };

    const handleGoogleLogIn = async () => {
        try {
            await googleSignIn();
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <>
            <NavBar />
            <div className="flex items-center justify-center min-h-screen bg-gray-100 text-black mt-6 -mb-20">
                <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                    <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
                    <form onSubmit={handleRegister} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-gray-600 mb-1">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Your Name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-gray-600 mb-1">Email</label>
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
                            <label htmlFor="photoURL" className="block text-gray-600 mb-1">Photo URL</label>
                            <input
                                type="text"
                                id="photoURL"
                                name="photoURL"
                                placeholder="Photo URL (optional)"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-gray-600 mb-1">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    placeholder="********"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                                    tabIndex={-1}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? '🙈' : '👁️'}
                                </button>
                            </div>
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <button
                            type="submit"
                            className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition"
                        >
                            Register
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
                        Already have an account?{' '}
                        <Link to="/login" className="text-teal-600 hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Register;