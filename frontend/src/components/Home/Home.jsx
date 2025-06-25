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
        fetch('http://localhost:5000/roommates')
            .then(res => res.json())
            .then(data => {
                setRoommates(data);
                setLoadingRoommates(false);
            })
            .catch(() => setLoadingRoommates(false));
    };

    const events = [
        {
            id: 1,
            thumbnail: 'https://i.postimg.cc/FHMqtJDT/Screenshot-2025-05-08-153302.png',
            name: 'Tech Conference 2025',
            category: 'Tech',
            date: 'May 15, 2025',
            location: 'San Francisco, CA',
            entryFee: '$50',
        },
        {
            id: 2,
            thumbnail: 'https://i.postimg.cc/FHMqtJDT/Screenshot-2025-05-08-153302.png',
            name: 'Art Exhibition',
            category: 'Art',
            date: 'June 10, 2025',
            location: 'New York, NY',
            entryFee: 'Free',
        },
        {
            id: 3,
            thumbnail: 'https://i.postimg.cc/FHMqtJDT/Screenshot-2025-05-08-153302.png',
            name: 'Sports Meetup',
            category: 'Sports',
            date: 'July 20, 2025',
            location: 'Los Angeles, CA',
            entryFee: '$20',
        },
    ];

    const handleSeeMore = (id) => {
        navigate(`/details/${id}`);
    };

    const displayedRoommates = showAll ? roommates : roommates.slice(0, 6);

    return (
        <div className="bg-[#0f172a] root min-h-screen">
            <NavBar />
            <div className="mt-20 px-4 md:px-10">

                <section className="slider-section mb-10" data-aos="fade-up">
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={50}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 3000 }}
                    >
                        {events.map(event => (
                            <SwiperSlide key={event.id}>
                                <div className="flex justify-center">
                                    <img src={event.thumbnail} alt={event.name} className="rounded-lg shadow-xl" />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </section>

                <section className="mb-16">
                    <Fade cascade damping={0.2}>
                        <h2 className="text-4xl font-bold mb-2 text-center typereader text-white">
                            <Typewriter
                                words={['Featured Roommate Listings', 'Find Your Ideal Match']}
                                loop={true}
                                cursor
                                cursorStyle="|"
                                typeSpeed={70}
                                deleteSpeed={50}
                                delaySpeed={1500}
                            />
                        </h2>
                        <p className="text-center des text-white mb-8">
                            Discover potential roommates in your area who are looking for someone like you
                        </p>
                    </Fade>

                    {loadingRoommates ? (
                        <Loader />
                    ) : (
                        <>
                            <Slide direction="up" cascade damping={0.1}>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {displayedRoommates.map(roommate => (
                                        <div
                                            key={roommate._id}
                                            className="bg-[#1e293b]  text-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between border border-[#334155]"
                                        >
                                            <div className="flex justify-between items-center mb-4">
                                                <span className={`flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full
                                                    ${roommate.availability === 'available'
                                                        ? 'bg-green-600 text-white'
                                                        : 'bg-gray-600 text-gray-200'
                                                    }`
                                                }>
                                                    <FaCircle className="text-xs" />
                                                    {roommate.availability === 'available' ? 'Available' : 'Unavailable'}
                                                </span>
                                                <span className="bg-gray-700 text-sm px-3 py-1 rounded-full flex items-center gap-1 font-semibold">
                                                    <FaDollarSign className="text-xs" />
                                                    {roommate.rent ? `$${roommate.rent}/month` : 'N/A'}
                                                </span>
                                            </div>

                                            <h3 className="text-xl text-white  font-bold mb-1 truncate flex items-center gap-2">
                                                <FaUserFriends className="text-blue-400" />
                                                {roommate.title}
                                            </h3>

                                            <div className="text-sm text-white  flex items-center mb-1">
                                                <FaMapMarkerAlt className="mr-2 text-blue-400" />
                                                {roommate.location}
                                            </div>

                                            <div className="flex items-center text-sm text-white  mb-3 gap-4">
                                                <span className="flex items-center gap-1">
                                                    <FaDoorOpen className="text-blue-400" />
                                                    {roommate.roomType}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <FaUsers className="text-blue-400" />
                                                    {typeof roommate.likeCount === 'number' ? roommate.likeCount : 0} interested
                                                </span>
                                            </div>

                                            <p className="text-gray-400 text-sm mb-4">
                                                {roommate.description?.length > 100
                                                    ? roommate.description.slice(0, 100) + '...'
                                                    : roommate.description}
                                            </p>

                                            <button
                                                onClick={() => handleSeeMore(roommate._id)}
                                                className="w-full mt-auto bg-[#222e3c] hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition border border-blue-700"
                                            >
                                                See more
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </Slide>

                            {roommates.length > 6 && !showAll && (
                                <div className="flex justify-center mt-8">
                                    <button
                                        onClick={() => setShowAll(true)}
                                        className="px-8 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow transition"
                                    >
                                        Show more
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </section>

                <Fade triggerOnce direction="up">
                    <section className="mb-16 text-white lastinfo">
                        <h2 className="text-3xl font-bold mb-6 text-center">Why Choose RoommateFinder?</h2>
                        <p className="text-center mb-10 text-white des2">
                            Our platform offers unique features designed to make finding the perfect roommate a seamless and secure experience.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                            <div className="bg-[#1e293b] lastcard1head p-6 rounded-lg shadow-xl border-1 border-black flex flex-col items-center">
                                <FaCheckCircle className="text-3xl verify1 text-blue-400 mb-4" />
                                <h3 className="text-xl font-semibold text-white headtitle1 mb-2">Verified Profiles</h3>
                                <p className="text-gray-400 descrip1 text-sm">All user profiles are verified to ensure a safe and secure roommate finding experience.</p>
                            </div>
                            <div className="bg-[#1e293b] lastcard2head card2 p-6 rounded-lg shadow-lg border-1 border-black flex flex-col items-center">
                                <FaShieldAlt className="text-3xl verify2 text-blue-400 mb-4" />
                                <h3 className="text-xl headtitle2 text-white font-semibold mb-2">Secure Messaging</h3>
                                <p className="text-gray-400 descrip2 text-sm">Connect with potential roommates through our secure messaging system to discuss details privately.</p>
                            </div>
                            <div className="bg-[#1e293b] lastcard3head p-6 rounded-lg shadow-lg flex  border-1 border-black flex-col items-center">
                                <FaBolt className="text-3xl verify3 text-blue-400 mb-4" />
                                <h3 className="text-xl text-white headtitle3 font-semibold mb-2">Quick Matching</h3>
                                <p className="text-gray-400 descrip3 text-sm">Our platform helps you find compatible roommates quickly based on your preferences and requirements.</p>
                            </div>
                            <div className="bg-[#1e293b] lastcard4head  p-6 rounded-lg shadow-lg border-1 border-black flex flex-col items-center">
                                <FaHeadset className="text-3xl verify4 text-blue-400 mb-4" />
                                <h3 className="text-xl text-white headtitle4 font-semibold mb-2">24/7 Support</h3>
                                <p className="text-gray-400 descrip4 text-sm">Our customer support team is available around the clock to assist you with any questions or concerns.</p>
                            </div>
                        </div>
                    </section>
                </Fade>

                <Slide direction="up">
                    <section className="bg-blue-500 py-12 text-center text-white rounded-lg mb-16">
                        <h2 className="text-2xl font-bold mb-2">Ready to find your perfect roommate?</h2>
                        <p className="mb-6">Join thousands of users who have successfully found compatible roommates through our platform. Start your search today!</p>
                        <div className="space-x-4">
                            <button className="bg-white text-blue-600 font-semibold px-6 py-2 rounded hover:bg-gray-100 transition">
                                Browse Listings
                            </button>
                            <button className="bg-[#1e293b] text-white font-semibold px-6 py-2 rounded hover:bg-[#334155] transition">
                                Post Your Listing
                            </button>
                        </div>
                    </section>
                </Slide>

                <Fade cascade damping={0.2}>
                    <section className="mb-16 text-white foheader">
                        <h2 className="text-3xl font-bold mb-10 text-center">What Our Users Say</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-[#1e293b] fotitle1 border-1 border-black p-6 rounded-lg shadow-lg">
                                <p className="text-yellow-400 mb-2">★★★★★</p>
                                <p className="text-white fodes1 mb-4">"I found my perfect roommate in just two days! The platform made it easy to connect with someone who shares my lifestyle and study habits. Highly recommend to all students!"</p>
                                <p className="font-bold">Michael Johnson</p>
                                <p className="text-sm text-gray-500">Graduate Student</p>
                            </div>
                            <div className="bg-[#1e293b] fotitle2 border-1 border-black  p-6 rounded-lg shadow-lg">
                                <p className="text-yellow-400 mb-2">★★★★☆</p>
                                <p className="text-white fodes2 mb-4">"After relocating for work, I needed to find housing quickly. RoommateFinder helped me connect with a compatible roommate who had an apartment in my preferred neighborhood."</p>
                                <p className="font-bold">Sarah Williams</p>
                                <p className="text-sm text-gray-500">Young Professional</p>
                            </div>
                            <div className="bg-[#1e293b] fotitle3 border-1 border-black p-6 rounded-lg shadow-lg">
                                <p className="text-yellow-400 mb-2">★★★★★</p>
                                <p className="text-white fodes3 mb-4">"The verification process gave me peace of mind when searching for a roommate. I appreciated being able to filter by lifestyle preferences to find someone with a similar schedule."</p>
                                <p className="font-bold">David Chen</p>
                                <p className="text-sm text-gray-500">Software Engineer</p>
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