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
        fetch(`https://backend-five-pied-99.vercel.app/roommates/${id}`)
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
            const res = await fetch(`https://backend-five-pied-99.vercel.app/roommates/${id}/like`, {
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
            <div className="bg-[#0f172a] detailheader min-h-screen text-white py-10 px-4 flex flex-col items-center">
                <div className="w-full max-w-6xl">
                    <button className="mb-6 text-blue-400 hover:underline" onClick={() => navigate(-1)}>
                        &lt; Back
                    </button>

                    {/* Like count at the top */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                        <span className="text-lg font-semibold text-blue-300 mb-2 md:mb-0">
                            {roommate.likeCount || 0} people interested in
                        </span>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase flex items-center gap-2 ${roommate.availability === 'available' ? 'bg-green-600' : 'bg-red-600'}`}>
                            <FaCircle className="text-xs" />
                            {roommate.availability === 'available' ? 'Available' : 'Not Available'}
                        </span>
                        <span className="text-sm text-gray-400 mt-2 md:mt-0 flex items-center gap-2">
                            <FaCalendarAlt className="text-base" />
                            Posted on {new Date(roommate.createdAt).toLocaleDateString()}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-2">
                        <FaUserFriends className="text-blue-400" />
                        {roommate.title}
                    </h1>
                    <div className="flex items-center text-lg text-blue-300 mb-8">
                        <FaMapMarkerAlt className="mr-2" />
                        {roommate.location}
                    </div>

                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex-1 bg-[#1e293b] detailtitle rounded-2xl p-8 shadow-xl">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                <div className="bg-[#334155] detailcard1 p-6 rounded-xl text-center flex flex-col items-center">
                                    <FaDollarSign className="text-2xl text-blue-400 mb-2" />
                                    <span className="text-3xl text-gray-500 font-bold">${roommate.rent}</span>
                                    <p className="text-sm text-gray-500 mt-2">per month</p>
                                </div>
                                <div className="bg-[#334155] detailcard2 p-6 rounded-xl text-center flex flex-col items-center">
                                    <FaDoorOpen className="text-2xl text-blue-400 mb-2" />
                                    <span className="text-xl text-gray-500 font-semibold">{roommate.roomType}</span>
                                    <p className="text-sm text-gray-500 mt-2">Room Type</p>
                                </div>
                                <div className="bg-[#334155] detailcard3 p-6 rounded-xl text-center flex flex-col items-center">
                                    <FaUsers className="text-2xl text-blue-400 mb-2" />
                                    <span className="text-xl text-gray-500 font-semibold">{roommate.likeCount || 0}</span>
                                    <p className="text-sm text-gray-500 mt-2">People Interested</p>
                                </div>
                            </div>

                            <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                                <FaUserFriends className="text-blue-400" /> Description
                            </h2>
                            <p className="text-gray-500 mb-6">{roommate.description}</p>

                            <h2 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                                <FaBolt className="text-blue-400" /> Lifestyle Preferences
                            </h2>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {(Array.isArray(roommate.lifestyle) ? roommate.lifestyle : (roommate.lifestyle || '').split(',')).map((item, idx) => (
                                    <span key={idx} className="bg-[#334155] border border-blue-500 px-3 py-1 text-sm rounded-full text-blue-300 flex items-center gap-1">
                                        <FaCheckCircle className="text-blue-400" /> {item.trim()}
                                    </span>
                                ))}
                            </div>

                            <button
                                className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 transition mb-4 ${likeLoading || showContact || isOwner ? 'opacity-75 cursor-not-allowed' : ''}`}
                                onClick={handleLike}
                                disabled={likeLoading || showContact || isOwner}
                            >
                                {isOwner ? (
                                    <>
                                        <FaBan />
                                        You liked the post
                                    </>
                                ) : (
                                    <>
                                        <FaHeart />
                                        {showContact ? "You're Interested" : likeLoading ? "Liking..." : "I'm Interested"}
                                    </>
                                )}
                            </button>

                            {showContact && (
                                <div className="text-center mt-2 text-blue-300">
                                    <span className="font-semibold">Contact Info:</span> {roommate.contactInfo}
                                </div>
                            )}
                        </div>

                        <div className="w-full md:w-80 bg-[#1e293b] posttitle p-6 rounded-2xl shadow-xl flex-shrink-0">
                            <h3 className="text-lg font-bold mb-4 text-gray-500 posttitlehead flex items-center gap-2">
                                <FaUserCircle className="text-2xl" /> Posted By
                            </h3>
                            <div className="flex items-center mb-4">
                                <FaUserCircle className="text-3xl mr-3 text-gray-300" />
                                <div>
                                    <div className="font-semibold">{roommate.userName}</div>
                                    <div className="text-sm text-gray-400">Roommate Host</div>
                                </div>
                            </div>
                            <div className="flex items-center mb-3">
                                <FaEnvelope className="text-gray-400 mr-3" />
                                <span className="text-sm text-gray-300">{roommate.userEmail}</span>
                            </div>
                            <div className="flex items-center">
                                <FaCalendarAlt className="text-gray-400 mr-3" />
                                <span className="text-sm text-gray-400">
                                    Member since {new Date(roommate.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailsPage;