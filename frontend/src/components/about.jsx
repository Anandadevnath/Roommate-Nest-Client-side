import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Fade, Slide } from 'react-awesome-reveal';
import { 
    FaUsers, 
    FaShieldAlt, 
    FaHome, 
    FaBolt, 
    FaCheckCircle, 
    FaHeart,
    FaGlobe,
    FaHandshake 
} from 'react-icons/fa';
import NavBar from './NavBar/NavBar';
import Footer from './Footer/Footer';

const About = () => {
    const navigate = useNavigate();
    const features = [
        {
            icon: <FaUsers className="text-4xl text-blue-400" />,
            title: "Connect with Compatible Roommates",
            description: "Our advanced matching system helps you find roommates who share similar lifestyles, interests, and living preferences."
        },
        {
            icon: <FaShieldAlt className="text-4xl text-blue-400" />,
            title: "Verified & Safe Platform",
            description: "All user profiles are verified to ensure a secure environment. We prioritize your safety with our comprehensive verification process."
        },
        {
            icon: <FaHome className="text-4xl text-blue-400" />,
            title: "Find Your Perfect Home",
            description: "Browse through thousands of listings to find the perfect shared accommodation that fits your budget and location preferences."
        },
        {
            icon: <FaBolt className="text-4xl text-blue-400" />,
            title: "Quick & Easy Process",
            description: "Our streamlined platform makes finding and connecting with potential roommates faster and more efficient than ever before."
        }
    ];

    const stats = [
        { number: "10,000+", label: "Active Users" },
        { number: "5,000+", label: "Successful Matches" },
        { number: "50+", label: "Cities Covered" },
        { number: "24/7", label: "Customer Support" }
    ];

    const teamValues = [
        {
            icon: <FaCheckCircle className="text-3xl text-green-400" />,
            title: "Trust & Safety",
            description: "We believe in creating a safe environment where users can connect with confidence."
        },
        {
            icon: <FaHeart className="text-3xl text-red-400" />,
            title: "Community First",
            description: "Building strong communities by connecting people who complement each other's lifestyles."
        },
        {
            icon: <FaGlobe className="text-3xl text-blue-400" />,
            title: "Accessibility",
            description: "Making housing accessible and affordable for everyone, regardless of their background."
        },
        {
            icon: <FaHandshake className="text-3xl text-yellow-400" />,
            title: "Transparency",
            description: "Honest, transparent communication in all our interactions with users and partners."
        }
    ];

    return (
        <div className="bg-[#0f172a] min-h-screen">
            <NavBar />
            
            {/* Hero Section */}
            <section className="pt-24 pb-16 px-4 md:px-10">
                <div className="max-w-6xl mx-auto text-center">
                    <Fade direction="up" triggerOnce>
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                            About <span className="text-blue-400">RoommateFinder</span>
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            We're on a mission to revolutionize the way people find roommates and shared living spaces. 
                            Building connections, creating communities, and making housing accessible for everyone.
                        </p>
                    </Fade>
                </div>
            </section>

            {/* Mission Statement */}
            <section className="py-16 px-4 md:px-10">
                <div className="max-w-6xl mx-auto">
                    <Fade direction="up" triggerOnce>
                        <div className="bg-gradient-to-r from-[#1e293b] to-[#334155] rounded-2xl p-8 md:p-12 shadow-2xl border border-blue-500/20">
                            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">Our Mission</h2>
                            <p className="text-lg text-gray-300 text-center max-w-4xl mx-auto leading-relaxed">
                                At RoommateFinder, we believe that finding the right roommate shouldn't be stressful or unsafe. 
                                Our platform combines cutting-edge technology with human-centered design to create meaningful 
                                connections between people looking for shared living arrangements. We're committed to making 
                                housing more affordable, accessible, and enjoyable for everyone.
                            </p>
                        </div>
                    </Fade>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 px-4 md:px-10">
                <div className="max-w-6xl mx-auto">
                    <Fade direction="up" triggerOnce>
                        <h2 className="text-4xl font-bold text-white text-center mb-12">What We Offer</h2>
                    </Fade>
                    <div className="grid md:grid-cols-2 gap-8">
                        {features.map((feature, index) => (
                            <Slide key={index} direction="up" delay={index * 100} triggerOnce>
                                <div className="bg-[#1e293b] rounded-xl p-8 shadow-xl border border-[#334155] hover:border-blue-500/50 transition-all duration-300">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0">
                                            {feature.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                            <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </Slide>
                        ))}
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="py-16 px-4 md:px-10 bg-gradient-to-r from-blue-600/10 to-purple-600/10">
                <div className="max-w-6xl mx-auto">
                    <Fade direction="up" triggerOnce>
                        <h2 className="text-4xl font-bold text-white text-center mb-12">Our Impact</h2>
                    </Fade>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <Slide key={index} direction="up" delay={index * 100} triggerOnce>
                                <div className="text-center">
                                    <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">
                                        {stat.number}
                                    </div>
                                    <div className="text-gray-300 text-lg font-medium">
                                        {stat.label}
                                    </div>
                                </div>
                            </Slide>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-16 px-4 md:px-10">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <Fade direction="left" triggerOnce>
                            <div>
                                <h2 className="text-4xl font-bold text-white mb-6">Our Story</h2>
                                <div className="space-y-4 text-gray-300 leading-relaxed">
                                    <p>
                                        RoommateFinder was born from a simple yet powerful idea: everyone deserves a safe, 
                                        affordable place to call home. Our founders experienced firsthand the challenges of 
                                        finding compatible roommates during their college years.
                                    </p>
                                    <p>
                                        What started as a small project to help students find housing has evolved into a 
                                        comprehensive platform serving thousands of users across multiple cities. We've 
                                        helped create countless friendships and communities through our service.
                                    </p>
                                    <p>
                                        Today, we continue to innovate and improve our platform, always keeping our users' 
                                        needs at the heart of everything we do. Our goal is to make the roommate-finding 
                                        process not just easier, but actually enjoyable.
                                    </p>
                                </div>
                            </div>
                        </Fade>
                        <Fade direction="right" triggerOnce>
                            <div className="bg-[#1e293b] rounded-2xl p-8 shadow-2xl border border-[#334155]">
                                <h3 className="text-2xl font-bold text-white mb-6">Why Choose RoommateFinder?</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-center gap-3">
                                        <FaCheckCircle className="text-green-400 flex-shrink-0" />
                                        <span className="text-gray-300">Comprehensive verification process</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <FaCheckCircle className="text-green-400 flex-shrink-0" />
                                        <span className="text-gray-300">Advanced matching algorithms</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <FaCheckCircle className="text-green-400 flex-shrink-0" />
                                        <span className="text-gray-300">24/7 customer support</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <FaCheckCircle className="text-green-400 flex-shrink-0" />
                                        <span className="text-gray-300">Mobile-friendly platform</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <FaCheckCircle className="text-green-400 flex-shrink-0" />
                                        <span className="text-gray-300">Secure messaging system</span>
                                    </li>
                                </ul>
                            </div>
                        </Fade>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16 px-4 md:px-10">
                <div className="max-w-6xl mx-auto">
                    <Fade direction="up" triggerOnce>
                        <h2 className="text-4xl font-bold text-white text-center mb-12">Our Values</h2>
                    </Fade>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {teamValues.map((value, index) => (
                            <Slide key={index} direction="up" delay={index * 100} triggerOnce>
                                <div className="bg-[#1e293b] rounded-xl p-6 shadow-xl border border-[#334155] text-center hover:border-blue-500/50 transition-all duration-300">
                                    <div className="mb-4">
                                        {value.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                                    <p className="text-gray-300 text-sm leading-relaxed">{value.description}</p>
                                </div>
                            </Slide>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-16 px-4 md:px-10">
                <div className="max-w-4xl mx-auto">
                    <Fade direction="up" triggerOnce>
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center shadow-2xl">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                Ready to Find Your Perfect Roommate?
                            </h2>
                            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                                Join thousands of users who have successfully found their ideal living situations through our platform.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button 
                                    onClick={() => navigate('/browselist')}
                                    className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    Browse Listings
                                </button>
                                <button 
                                    onClick={() => navigate('/register')}
                                    className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
                                >
                                    Create Your Profile
                                </button>
                            </div>
                        </div>
                    </Fade>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default About;
