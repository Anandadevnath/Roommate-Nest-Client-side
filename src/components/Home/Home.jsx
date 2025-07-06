import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Home.css';
import Footer from './../Footer/Footer';
import NavBar from './../NavBar/NavBar';
import { AuthContext } from '../../contexts/AuthContext';

import { Typewriter } from 'react-simple-typewriter';
import { Fade, Slide } from 'react-awesome-reveal';

import {
    FaCircle, FaDollarSign, FaUserFriends, FaMapMarkerAlt, FaDoorOpen, FaUsers,
    FaCheckCircle, FaShieldAlt, FaBolt, FaHeadset
} from 'react-icons/fa';
import Loader from '../loader';

const Home = () => {
    const [roommates, setRoommates] = useState([]);
    const [loadingRoommates, setLoadingRoommates] = useState(true);
    const [showAll, setShowAll] = useState(false);
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
        fetchRoommates();
    }, []);

    const fetchRoommates = () => {
        setLoadingRoommates(true);
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://server-side-70by.onrender.com';
        fetch(`${apiBaseUrl}/roommates`)
            .then(res => res.json())
            .then(data => {
                // Ensure data is always an array
                const roommatesArray = Array.isArray(data) ? data : [];
                setRoommates(roommatesArray);
                setLoadingRoommates(false);
            })
            .catch(() => setLoadingRoommates(false));
    };

    const events = [
        {
            id: 1,
            thumbnail: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            title: 'Find Your Perfect Roommate',
            description: 'Connect with verified roommates in your area. Safe, secure, and easy to use platform.',
        },
        {
            id: 2,
            thumbnail: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            title: 'Affordable Living Solutions',
            description: 'Discover budget-friendly shared living options that fit your lifestyle and preferences.',
        },
        {
            id: 3,
            thumbnail: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            title: 'Modern Living Spaces',
            description: 'Browse through modern apartments and shared living spaces in prime locations.',
        },
        {
            id: 4,
            thumbnail: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            title: 'Community Living',
            description: 'Join a community of like-minded individuals and build lasting friendships.',
        },
    ];

    const handleSeeMore = (id) => {
        navigate(`/details/${id}`);
    };

    const displayedRoommates = showAll ? roommates : roommates.slice(0, 8);

    const categories = [
        { id: 1, name: 'Students', icon: '🎓', count: '1200+', color: 'from-blue-500 to-cyan-500' },
        { id: 2, name: 'Professionals', icon: '💼', count: '800+', color: 'from-purple-500 to-pink-500' },
        { id: 3, name: 'Families', icon: '👨‍👩‍👧‍👦', count: '400+', color: 'from-green-500 to-emerald-500' },
        { id: 4, name: 'Seniors', icon: '👴', count: '300+', color: 'from-orange-500 to-red-500' },
    ];

    const blogPosts = [
        {
            id: 1,
            title: 'How to Choose the Perfect Roommate',
            excerpt: 'Essential tips for finding a compatible roommate that matches your lifestyle and preferences.',
            image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            date: 'Dec 20, 2024',
            readTime: '5 min read'
        },
        {
            id: 2,
            title: 'Setting Boundaries with Your Roommate',
            excerpt: 'Learn how to establish healthy boundaries and maintain a harmonious living environment.',
            image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            date: 'Dec 18, 2024',
            readTime: '4 min read'
        },
        {
            id: 3,
            title: 'Budgeting for Shared Living',
            excerpt: 'Smart financial tips for managing expenses when living with roommates.',
            image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            date: 'Dec 15, 2024',
            readTime: '6 min read'
        }
    ];

    return (
        <div className="bg-[#0f172a] root min-h-screen">
            <NavBar />
            
            {/* Hero/Carousel Section - 60-70% height */}
            <section className="relative h-screen overflow-hidden mt-16">
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30 z-10"></div>
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={0}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    loop={true}
                    className="h-full"
                >
                    {events.map(event => (
                        <SwiperSlide key={event.id}>
                            <div className="relative h-full w-full">
                                <img 
                                    src={event.thumbnail} 
                                    alt={event.title} 
                                    className="h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 flex items-center justify-center z-20">
                                    <div className="text-center text-white px-4 max-w-4xl">
                                        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                                            {event.title}
                                        </h1>
                                        <p className="text-xl md:text-2xl mb-8 text-gray-200">
                                            {event.description}
                                        </p>
                                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                            <button 
                                                onClick={() => navigate('/browselist')}
                                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl"
                                            >
                                                Start Your Search
                                            </button>
                                            <button 
                                                onClick={() => navigate('/createroom')}
                                                className="bg-white/20 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
                                            >
                                                Post Your Listing
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                
                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 animate-bounce">
                    <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
                    </div>
                </div>
            </section>

            <div className="px-0">

                {/* Featured Roommates Section */}
                <section className="py-20 px-4 md:px-10 bg-gradient-to-b from-[#0f172a] to-[#1e293b]">
                    <div className="max-w-7xl mx-auto">
                        <Fade cascade damping={0.2}>
                            <h2 className="text-4xl font-bold mb-2 text-center text-white">
                                <Typewriter
                                    words={['Featured Roommate Listings', 'Find Your Ideal Match', 'Top Rated Roommates']}
                                    loop={true}
                                    cursor
                                    cursorStyle="|"
                                    typeSpeed={70}
                                    deleteSpeed={50}
                                    delaySpeed={1500}
                                />
                            </h2>
                            <p className="text-center text-gray-300 mb-12 text-lg">
                                Discover potential roommates in your area who are looking for someone like you
                            </p>
                        </Fade>

                        {loadingRoommates ? (
                            <Loader />
                        ) : (
                            <>
                                <Slide direction="up" cascade damping={0.1}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                        {displayedRoommates.map(roommate => (
                                            <div
                                                key={roommate._id}
                                                className="bg-[#1e293b] text-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-[#334155] hover:border-blue-500/50 transform hover:-translate-y-2 flex flex-col h-full"
                                            >
                                                {/* Card Image */}
                                                <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                                    <FaUserFriends className="text-6xl text-white/80" />
                                                </div>
                                                
                                                {/* Card Content */}
                                                <div className="p-6 flex flex-col flex-1">
                                                    <div className="flex justify-between items-center mb-3">
                                                        <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full
                                                            ${roommate.availability === 'available'
                                                                ? 'bg-green-600 text-white'
                                                                : 'bg-gray-600 text-gray-200'
                                                            }`
                                                        }>
                                                            <FaCircle className="text-xs" />
                                                            {roommate.availability === 'available' ? 'Available' : 'Unavailable'}
                                                        </span>
                                                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-xs px-2 py-1 rounded-full flex items-center gap-1 font-semibold">
                                                            <FaDollarSign className="text-xs" />
                                                            {roommate.rent ? `$${roommate.rent}/mo` : 'N/A'}
                                                        </span>
                                                    </div>

                                                    <h3 className="text-lg font-bold mb-2 line-clamp-2 min-h-[3.5rem]">
                                                        {roommate.title}
                                                    </h3>

                                                    <div className="text-sm text-gray-300 flex items-center mb-2">
                                                        <FaMapMarkerAlt className="mr-2 text-blue-400 flex-shrink-0" />
                                                        <span className="truncate">{roommate.location}</span>
                                                    </div>

                                                    <div className="flex items-center text-xs text-gray-400 mb-3 gap-3">
                                                        <span className="flex items-center gap-1">
                                                            <FaDoorOpen className="text-blue-400" />
                                                            {roommate.roomType}
                                                        </span>
                                                        <span className="flex items-center gap-1">
                                                            <FaUsers className="text-blue-400" />
                                                            {typeof roommate.likeCount === 'number' ? roommate.likeCount : 0}
                                                        </span>
                                                    </div>

                                                    <p className="text-gray-400 text-sm mb-4 flex-1 line-clamp-3">
                                                        {roommate.description?.length > 80
                                                            ? roommate.description.slice(0, 80) + '...'
                                                            : roommate.description || 'No description available'}
                                                    </p>

                                                    <button
                                                        onClick={() => handleSeeMore(roommate._id)}
                                                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2.5 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25 mt-auto"
                                                    >
                                                        See More
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Slide>

                                {roommates.length > 8 && !showAll && (
                                    <div className="flex justify-center mt-12">
                                        <button
                                            onClick={() => setShowAll(true)}
                                            className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
                                        >
                                            View All Listings
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </section>

                {/* Categories Section */}
                <section className="py-20 px-4 md:px-10 bg-[#1e293b]">
                    <div className="max-w-7xl mx-auto">
                        <Fade direction="up">
                            <h2 className="text-4xl font-bold mb-4 text-center text-white">Browse by Category</h2>
                            <p className="text-center text-gray-300 mb-12 text-lg">Find roommates based on your lifestyle and preferences</p>
                        </Fade>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {categories.map(category => (
                                <Slide key={category.id} direction="up" delay={category.id * 100}>
                                    <div className="group cursor-pointer">
                                        <div className={`bg-gradient-to-br ${category.color} p-8 rounded-2xl text-center transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl`}>
                                            <div className="text-4xl mb-4">{category.icon}</div>
                                            <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
                                            <p className="text-white/90 text-lg font-semibold">{category.count}</p>
                                            <p className="text-white/70 text-sm mt-1">Active listings</p>
                                        </div>
                                    </div>
                                </Slide>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Why Choose RoommateFinder Section */}
                <Fade triggerOnce direction="up">
                    <section className="py-20 text-white px-4 md:px-10 bg-gradient-to-b from-[#1e293b] to-[#0f172a]">
                        <div className="max-w-7xl mx-auto">
                            <h2 className="text-4xl font-bold mb-6 text-center">Why Choose RoommateFinder?</h2>
                            <p className="text-center mb-12 text-gray-300 text-lg">
                                Our platform offers unique features designed to make finding the perfect roommate a seamless and secure experience.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                                <div className="bg-[#1e293b] p-8 rounded-2xl shadow-xl border border-[#334155] hover:border-blue-500/50 flex flex-col items-center transition-all duration-300 hover:transform hover:-translate-y-2">
                                    <FaCheckCircle className="text-4xl text-blue-400 mb-4" />
                                    <h3 className="text-xl font-semibold text-white mb-3">Verified Profiles</h3>
                                    <p className="text-gray-400 text-sm">All user profiles are verified to ensure a safe and secure roommate finding experience.</p>
                                </div>
                                <div className="bg-[#1e293b] p-8 rounded-2xl shadow-xl border border-[#334155] hover:border-blue-500/50 flex flex-col items-center transition-all duration-300 hover:transform hover:-translate-y-2">
                                    <FaShieldAlt className="text-4xl text-blue-400 mb-4" />
                                    <h3 className="text-xl text-white font-semibold mb-3">Secure Messaging</h3>
                                    <p className="text-gray-400 text-sm">Connect with potential roommates through our secure messaging system to discuss details privately.</p>
                                </div>
                                <div className="bg-[#1e293b] p-8 rounded-2xl shadow-xl border border-[#334155] hover:border-blue-500/50 flex flex-col items-center transition-all duration-300 hover:transform hover:-translate-y-2">
                                    <FaBolt className="text-4xl text-blue-400 mb-4" />
                                    <h3 className="text-xl text-white font-semibold mb-3">Quick Matching</h3>
                                    <p className="text-gray-400 text-sm">Our platform helps you find compatible roommates quickly based on your preferences and requirements.</p>
                                </div>
                                <div className="bg-[#1e293b] p-8 rounded-2xl shadow-xl border border-[#334155] hover:border-blue-500/50 flex flex-col items-center transition-all duration-300 hover:transform hover:-translate-y-2">
                                    <FaHeadset className="text-4xl text-blue-400 mb-4" />
                                    <h3 className="text-xl text-white font-semibold mb-3">24/7 Support</h3>
                                    <p className="text-gray-400 text-sm">Our customer support team is available around the clock to assist you with any questions or concerns.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </Fade>

                {/* Blog Section */}
                <section className="py-20 px-4 md:px-10 bg-[#0f172a]">
                    <div className="max-w-7xl mx-auto">
                        <Fade direction="up">
                            <h2 className="text-4xl font-bold mb-4 text-center text-white">Latest from Our Blog</h2>
                            <p className="text-center text-gray-300 mb-12 text-lg">Tips, guides, and insights for better roommate living</p>
                        </Fade>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {blogPosts.map((post, index) => (
                                <Slide key={post.id} direction="up" delay={index * 100}>
                                    <article className="bg-[#1e293b] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-[#334155] hover:border-blue-500/50 transform hover:-translate-y-2 h-full flex flex-col">
                                        <div className="h-48 overflow-hidden">
                                            <img 
                                                src={post.image} 
                                                alt={post.title}
                                                className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
                                            />
                                        </div>
                                        <div className="p-6 flex flex-col flex-1">
                                            <div className="flex items-center text-sm text-gray-400 mb-3">
                                                <span>{post.date}</span>
                                                <span className="mx-2">•</span>
                                                <span>{post.readTime}</span>
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">{post.title}</h3>
                                            <p className="text-gray-400 mb-4 flex-1 line-clamp-3">{post.excerpt}</p>
                                            <button className="self-start text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-300">
                                                Read More →
                                            </button>
                                        </div>
                                    </article>
                                </Slide>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Promotional Offers Section */}
                <section className="py-20 px-4 md:px-10 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900">
                    <div className="max-w-6xl mx-auto">
                        <Slide direction="up">
                            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 text-center border border-white/20">
                                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                    🎉 Special Launch Offer!
                                </h2>
                                <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
                                    Join now and get <span className="text-yellow-400 font-bold">3 months premium membership FREE</span>! 
                                    Access advanced filters, priority listing, and exclusive roommate matches.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
                                        <div className="text-3xl font-bold text-white">$0</div>
                                        <div className="text-sm text-gray-300">First 3 Months</div>
                                    </div>
                                    <div className="text-white text-2xl">→</div>
                                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-4 text-center">
                                        <div className="text-3xl font-bold text-white">$29.99</div>
                                        <div className="text-sm text-white/90">Then monthly</div>
                                    </div>
                                </div>
                                <button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl">
                                    Claim Your Free Trial
                                </button>
                                <p className="text-sm text-gray-400 mt-4">*Limited time offer. Terms and conditions apply.</p>
                            </div>
                        </Slide>
                    </div>
                </section>

                {/* CTA Section */}
                <Slide direction="up">
                    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-center text-white mx-4 md:mx-10 rounded-3xl shadow-2xl">
                        <div className="max-w-4xl mx-auto px-6">
                            <h2 className="text-4xl font-bold mb-6">Ready to find your perfect roommate?</h2>
                            <p className="mb-8 text-xl">Join thousands of users who have successfully found compatible roommates through our platform. Start your search today!</p>
                            <div className="flex flex-col sm:flex-row justify-center gap-6">
                                <button 
                                    onClick={() => navigate('/browselist')}
                                    className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
                                >
                                    Browse Listings
                                </button>
                                <button 
                                    onClick={() => navigate('/createroom')}
                                    className="bg-[#1e293b] text-white font-semibold px-8 py-4 rounded-full hover:bg-[#334155] transition-all duration-300 transform hover:scale-105 shadow-lg border-2 border-white/20"
                                >
                                    Post Your Listing
                                </button>
                            </div>
                        </div>
                    </section>
                </Slide>

                {/* Newsletter Section */}
                <section className="py-20 px-4 md:px-10 bg-[#1e293b]">
                    <div className="max-w-4xl mx-auto text-center">
                        <Fade direction="up">
                            <h2 className="text-4xl font-bold text-white mb-4">Stay Updated</h2>
                            <p className="text-gray-300 mb-8 text-lg">Get the latest roommate listings and tips delivered to your inbox</p>
                            <div className="bg-[#0f172a] p-8 rounded-2xl border border-[#334155]">
                                <div className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
                                    <input 
                                        type="email" 
                                        placeholder="Enter your email address"
                                        className="flex-1 px-6 py-4 rounded-full bg-[#334155] text-white placeholder-gray-400 border border-[#475569] focus:border-blue-500 focus:outline-none transition-colors"
                                    />
                                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 whitespace-nowrap">
                                        Subscribe Now
                                    </button>
                                </div>
                                <p className="text-gray-400 text-sm mt-4">We respect your privacy. Unsubscribe at any time.</p>
                            </div>
                        </Fade>
                    </div>
                </section>

                {/* Testimonials Section */}
                <Fade cascade damping={0.2}>
                    <section className="py-20 text-white px-4 md:px-10 bg-[#0f172a]">
                        <div className="max-w-7xl mx-auto">
                            <h2 className="text-4xl font-bold mb-4 text-center">What Our Users Say</h2>
                            <p className="text-center text-gray-300 mb-12 text-lg">Real stories from real people who found their perfect roommates</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="bg-[#1e293b] border border-[#334155] hover:border-blue-500/50 p-8 rounded-2xl shadow-xl transition-all duration-300 hover:transform hover:-translate-y-2 h-full flex flex-col">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                            MJ
                                        </div>
                                        <div className="ml-4">
                                            <p className="font-bold text-white">Michael Johnson</p>
                                            <p className="text-sm text-gray-400">Graduate Student</p>
                                        </div>
                                    </div>
                                    <div className="text-yellow-400 mb-4">★★★★★</div>
                                    <p className="text-gray-300 flex-1">"I found my perfect roommate in just two days! The platform made it easy to connect with someone who shares my lifestyle and study habits. Highly recommend to all students!"</p>
                                </div>
                                <div className="bg-[#1e293b] border border-[#334155] hover:border-blue-500/50 p-8 rounded-2xl shadow-xl transition-all duration-300 hover:transform hover:-translate-y-2 h-full flex flex-col">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                            SW
                                        </div>
                                        <div className="ml-4">
                                            <p className="font-bold text-white">Sarah Williams</p>
                                            <p className="text-sm text-gray-400">Young Professional</p>
                                        </div>
                                    </div>
                                    <div className="text-yellow-400 mb-4">★★★★☆</div>
                                    <p className="text-gray-300 flex-1">"After relocating for work, I needed to find housing quickly. RoommateFinder helped me connect with a compatible roommate who had an apartment in my preferred neighborhood."</p>
                                </div>
                                <div className="bg-[#1e293b] border border-[#334155] hover:border-blue-500/50 p-8 rounded-2xl shadow-xl transition-all duration-300 hover:transform hover:-translate-y-2 h-full flex flex-col">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                            DC
                                        </div>
                                        <div className="ml-4">
                                            <p className="font-bold text-white">David Chen</p>
                                            <p className="text-sm text-gray-400">Software Engineer</p>
                                        </div>
                                    </div>
                                    <div className="text-yellow-400 mb-4">★★★★★</div>
                                    <p className="text-gray-300 flex-1">"The verification process gave me peace of mind when searching for a roommate. I appreciated being able to filter by lifestyle preferences to find someone with a similar schedule."</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </Fade>

            </div>
            <Footer />
        </div>
    );
};

export default Home;