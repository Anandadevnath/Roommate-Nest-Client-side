import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import NavBar from './NavBar/NavBar';
import Swal from 'sweetalert2';

import {
    FaCircle, FaDollarSign, FaUserFriends, FaMapMarkerAlt, FaDoorOpen, FaUsers,
    FaUserCircle, FaEnvelope, FaCalendarAlt, FaHeart, FaBolt, FaCheckCircle, FaBan
} from 'react-icons/fa';
import Loader from './loader';

const DetailsPage = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [roommate, setRoommate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showContact, setShowContact] = useState(false);
    const [likeLoading, setLikeLoading] = useState(false);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://server-side-70by.onrender.com';
        fetch(`${apiBaseUrl}/roommates/${id}`)
            .then(res => res.json())
            .then(data => {
                setRoommate(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id, user, navigate]);

    // Check if the current user is the post owner
    const isOwner = roommate && user && (roommate.userEmail === user.email);

    const handleLike = async () => {
        if (!user) {
            navigate('/login');
            return;
        }
        if (isOwner) {
            Swal.fire({
                icon: 'warning',
                title: "You can't like your own post.",
            });
            return;
        }
        setLikeLoading(true);
        try {
            const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://server-side-70by.onrender.com';
            const res = await fetch(`${apiBaseUrl}/roommates/${id}/like`, {
                method: 'PATCH',
            });
            const data = await res.json();
            if (res.ok) {
                setRoommate(prev => ({
                    ...prev,
                    likeCount: data.likeCount,
                }));
                setShowContact(true);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: data.error || 'Could not like the post.',
                });
            }
        } catch {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Could not like the post.',
            });
        }
        setLikeLoading(false);
    };

    if (loading) {
        return <Loader />;
    }

    if (!roommate) {
        return <div className="text-center text-red-600 mt-20">Roommate post not found.</div>;
    }

    return (
        <>
            <NavBar />
            <div className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] min-h-screen text-white relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10 py-24 px-4 flex flex-col items-center">
                    <div className="w-full max-w-6xl">
                        <button 
                            className="mb-8 flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-all duration-300 transform hover:scale-105 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20"
                            onClick={() => navigate(-1)}
                        >
                            <i className="fas fa-arrow-left"></i>
                            Back to Listings
                        </button>

                        {/* Hero Section */}
                        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-xl rounded-3xl p-8 mb-8 border border-white/10 shadow-2xl">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                                <div className="flex items-center gap-4 mb-4 md:mb-0">
                                    <span className={`px-4 py-2 rounded-full text-sm font-bold uppercase flex items-center gap-2 shadow-lg ${
                                        roommate.availability === 'available' 
                                            ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' 
                                            : 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                                    }`}>
                                        <FaCircle className="text-xs animate-pulse" />
                                        {roommate.availability === 'available' ? 'Available Now' : 'Not Available'}
                                    </span>
                                    <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                                        <FaUsers className="animate-bounce" />
                                        {roommate.likeCount || 0} Interested
                                    </span>
                                </div>
                                <span className="text-gray-300 flex items-center gap-2 bg-black/20 px-4 py-2 rounded-full">
                                    <FaCalendarAlt className="text-blue-400" />
                                    Posted {new Date(roommate.createdAt).toLocaleDateString()}
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent leading-tight">
                                {roommate.title}
                            </h1>
                            <div className="flex items-center text-xl text-blue-300 mb-6">
                                <FaMapMarkerAlt className="mr-3 text-2xl animate-pulse" />
                                {roommate.location}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div className="bg-gradient-to-br from-blue-600/30 to-blue-800/30 backdrop-blur-sm p-6 rounded-2xl border border-blue-500/30 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25">
                                    <FaDollarSign className="text-4xl text-blue-400 mb-3 mx-auto animate-bounce" />
                                    <span className="text-4xl font-bold text-white block">${roommate.rent}</span>
                                    <p className="text-blue-200 mt-2 font-medium">per month</p>
                                </div>
                                <div className="bg-gradient-to-br from-purple-600/30 to-purple-800/30 backdrop-blur-sm p-6 rounded-2xl border border-purple-500/30 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
                                    <FaDoorOpen className="text-4xl text-purple-400 mb-3 mx-auto animate-bounce" />
                                    <span className="text-2xl font-bold text-white block">{roommate.roomType}</span>
                                    <p className="text-purple-200 mt-2 font-medium">Room Type</p>
                                </div>
                                <div className="bg-gradient-to-br from-green-600/30 to-green-800/30 backdrop-blur-sm p-6 rounded-2xl border border-green-500/30 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25">
                                    <FaUsers className="text-4xl text-green-400 mb-3 mx-auto animate-bounce" />
                                    <span className="text-2xl font-bold text-white block">{roommate.likeCount || 0}</span>
                                    <p className="text-green-200 mt-2 font-medium">People Interested</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Main Content */}
                            <div className="lg:col-span-2 space-y-8">
                                {/* Description Section */}
                                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
                                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                            <FaUserFriends className="text-white text-xl" />
                                        </div>
                                        About This Listing
                                    </h2>
                                    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-blue-500/20">
                                        <p className="text-gray-200 leading-relaxed text-lg">{roommate.description}</p>
                                    </div>
                                </div>

                                {/* Lifestyle Preferences */}
                                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
                                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                                            <FaBolt className="text-white text-xl" />
                                        </div>
                                        Lifestyle Preferences
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {(Array.isArray(roommate.lifestyle) ? roommate.lifestyle : (roommate.lifestyle || '').split(',')).map((item, idx) => (
                                            <div key={idx} className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-blue-500/30 px-4 py-3 rounded-xl text-blue-200 flex items-center gap-3 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                                                <FaCheckCircle className="text-green-400 text-xl" />
                                                <span className="font-medium">{item.trim()}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Interest Button */}
                                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
                                    <button
                                        className={`w-full py-6 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 transition-all duration-500 transform ${
                                            isOwner 
                                                ? 'bg-gradient-to-r from-gray-600 to-gray-700 text-gray-300 cursor-not-allowed'
                                                : showContact 
                                                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/25' 
                                                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-blue-500/25 hover:scale-105'
                                        } ${likeLoading ? 'animate-pulse' : ''}`}
                                        onClick={handleLike}
                                        disabled={likeLoading || showContact || isOwner}
                                    >
                                        {isOwner ? (
                                            <>
                                                <FaBan className="text-2xl" />
                                                This is Your Listing
                                            </>
                                        ) : (
                                            <>
                                                <FaHeart className={`text-2xl ${showContact ? 'animate-pulse text-red-400' : ''}`} />
                                                {showContact ? "You're Interested! ❤️" : likeLoading ? "Processing..." : "I'm Interested"}
                                            </>
                                        )}
                                    </button>

                                    {showContact && (
                                        <div className="mt-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-2xl p-6 border border-green-500/30 animate-pulse">
                                            <div className="text-center">
                                                <h3 className="text-xl font-bold text-green-300 mb-2 flex items-center justify-center gap-2">
                                                    <FaEnvelope className="animate-bounce" />
                                                    Contact Information
                                                </h3>
                                                <p className="text-green-200 text-lg font-medium">{roommate.contactInfo}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="lg:col-span-1">
                                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl sticky top-24">
                                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                                            <FaUserCircle className="text-white text-xl" />
                                        </div>
                                        Host Profile
                                    </h3>
                                    
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                                                {roommate.userName.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="text-xl font-bold text-white">{roommate.userName}</div>
                                                <div className="text-blue-300 font-medium">Roommate Host</div>
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3 bg-blue-500/10 rounded-xl p-4 border border-blue-500/20">
                                                <FaEnvelope className="text-blue-400 text-xl" />
                                                <span className="text-gray-200">{roommate.userEmail}</span>
                                            </div>
                                            <div className="flex items-center gap-3 bg-purple-500/10 rounded-xl p-4 border border-purple-500/20">
                                                <FaCalendarAlt className="text-purple-400 text-xl" />
                                                <span className="text-gray-200">
                                                    Member since {new Date(roommate.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailsPage;