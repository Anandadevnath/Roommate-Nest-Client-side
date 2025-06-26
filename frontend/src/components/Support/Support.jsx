import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';

const Support = () => {
    const [activeTab, setActiveTab] = useState('contact');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        priority: 'medium'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            setSubmitStatus('success');
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: '',
                priority: 'medium'
            });
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const faqs = [
        {
            question: "How do I create a roommate listing?",
            answer: "To create a listing, log in to your account and navigate to the Dashboard. Click on 'Add Item' tab and fill out the roommate listing form with details about your preferences, location, and requirements."
        },
        {
            question: "How can I search for roommates?",
            answer: "Use the 'All Items' page to browse all available roommate listings. You can filter by location, budget, preferences, and other criteria to find the perfect match."
        },
        {
            question: "Is my personal information safe?",
            answer: "Yes, we take privacy seriously. Your personal information is encrypted and we never share your data with third parties without your consent. You control what information is visible in your profile."
        },
        {
            question: "How do I contact a potential roommate?",
            answer: "Click on any roommate listing to view their profile and contact information. You can message them directly through our platform or use the provided contact methods."
        },
        {
            question: "Can I edit my listing after posting?",
            answer: "Yes, you can edit your listings anytime by going to your Dashboard and selecting 'My Items'. Click the edit button on any of your listings to make changes."
        },
        {
            question: "What should I do if I encounter inappropriate content?",
            answer: "Please report any inappropriate content or behavior immediately using our contact form below or email us at report@roommatesfinder.com. We take all reports seriously."
        }
    ];

    const contactMethods = [
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            title: "Email Support",
            description: "Get help via email",
            contact: "support@roommatesfinder.com",
            response: "24-48 hours"
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
            ),
            title: "Phone Support",
            description: "Speak with our team",
            contact: "+1 (555) 123-4567",
            response: "Mon-Fri 9AM-6PM EST"
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            ),
            title: "Live Chat",
            description: "Chat with us online",
            contact: "Available on website",
            response: "Real-time response"
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            title: "Office Location",
            description: "Visit us in person",
            contact: "123 Tech Street, Silicon Valley, CA",
            response: "Mon-Fri 9AM-5PM"
        }
    ];

    return (
        <>
            <NavBar />
            <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] py-12 px-4 relative overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                    <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12 mt-12">
                        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            Support Center
                        </h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            We're here to help! Get answers to your questions and reach out to our support team.
                        </p>
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex justify-center mb-8">
                        <div className="glass-card p-2 rounded-2xl border border-white/10 backdrop-blur-xl">
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setActiveTab('contact')}
                                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                                        activeTab === 'contact'
                                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                                            : 'text-gray-300 hover:text-white hover:bg-white/10'
                                    }`}
                                >
                                    Contact Us
                                </button>
                                <button
                                    onClick={() => setActiveTab('faq')}
                                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                                        activeTab === 'faq'
                                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                                            : 'text-gray-300 hover:text-white hover:bg-white/10'
                                    }`}
                                >
                                    FAQ
                                </button>
                                <button
                                    onClick={() => setActiveTab('resources')}
                                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                                        activeTab === 'resources'
                                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                                            : 'text-gray-300 hover:text-white hover:bg-white/10'
                                    }`}
                                >
                                    Resources
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Contact Tab */}
                    {activeTab === 'contact' && (
                        <div className="grid lg:grid-cols-2 gap-8">
                            {/* Contact Methods */}
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
                                {contactMethods.map((method, index) => (
                                    <div key={index} className="glass-card p-6 rounded-2xl border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all duration-300">
                                        <div className="flex items-start space-x-4">
                                            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white">
                                                {method.icon}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold text-white mb-1">{method.title}</h3>
                                                <p className="text-gray-300 mb-2">{method.description}</p>
                                                <p className="text-blue-400 font-medium mb-1">{method.contact}</p>
                                                <p className="text-sm text-gray-400">Response time: {method.response}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Contact Form */}
                            <div className="glass-card p-8 rounded-2xl border border-white/10 backdrop-blur-xl">
                                <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
                                
                                {submitStatus === 'success' && (
                                    <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-300 animate-fade-in">
                                        <div className="flex items-center space-x-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span>Message sent successfully! We'll get back to you soon.</span>
                                        </div>
                                    </div>
                                )}

                                {submitStatus === 'error' && (
                                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 animate-shake">
                                        <div className="flex items-center space-x-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                            </svg>
                                            <span>Error sending message. Please try again.</span>
                                        </div>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="name" className="block text-white mb-2 font-medium">Name</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 bg-white/5 border border-gray-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                                placeholder="Your name"
                                                required
                                                disabled={isSubmitting}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-white mb-2 font-medium">Email</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 bg-white/5 border border-gray-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                                placeholder="your@email.com"
                                                required
                                                disabled={isSubmitting}
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="subject" className="block text-white mb-2 font-medium">Subject</label>
                                            <input
                                                type="text"
                                                id="subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 bg-white/5 border border-gray-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                                placeholder="How can we help?"
                                                required
                                                disabled={isSubmitting}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="priority" className="block text-white mb-2 font-medium">Priority</label>
                                            <select
                                                id="priority"
                                                name="priority"
                                                value={formData.priority}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 bg-white/5 border border-gray-500/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                                disabled={isSubmitting}
                                            >
                                                <option value="low" className="bg-gray-800">Low</option>
                                                <option value="medium" className="bg-gray-800">Medium</option>
                                                <option value="high" className="bg-gray-800">High</option>
                                                <option value="urgent" className="bg-gray-800">Urgent</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-white mb-2 font-medium">Message</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            rows={5}
                                            className="w-full px-4 py-3 bg-white/5 border border-gray-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                                            placeholder="Please describe your issue or question in detail..."
                                            required
                                            disabled={isSubmitting}
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                    >
                                        {isSubmitting ? (
                                            <div className="flex items-center justify-center space-x-2">
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                <span>Sending...</span>
                                            </div>
                                        ) : (
                                            'Send Message'
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* FAQ Tab */}
                    {activeTab === 'faq' && (
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
                            <div className="space-y-4">
                                {faqs.map((faq, index) => (
                                    <div key={index} className="glass-card p-6 rounded-2xl border border-white/10 backdrop-blur-xl">
                                        <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                                            <span className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-sm font-bold text-white mr-3">
                                                {index + 1}
                                            </span>
                                            {faq.question}
                                        </h3>
                                        <p className="text-gray-300 leading-relaxed pl-9">{faq.answer}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Resources Tab */}
                    {activeTab === 'resources' && (
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl font-bold text-white mb-8 text-center">Helpful Resources</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="glass-card p-6 rounded-2xl border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all duration-300">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white mr-4">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-semibold text-white">User Guide</h3>
                                    </div>
                                    <p className="text-gray-300 mb-4">Complete guide on how to use all features of Roommate Finder</p>
                                    <Link to="/guide" className="text-green-400 hover:text-green-300 font-medium transition-colors duration-300">
                                        Read Guide →
                                    </Link>
                                </div>

                                <div className="glass-card p-6 rounded-2xl border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all duration-300">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center text-white mr-4">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-semibold text-white">Safety Tips</h3>
                                    </div>
                                    <p className="text-gray-300 mb-4">Important safety guidelines for meeting potential roommates</p>
                                    <Link to="/safety" className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors duration-300">
                                        Learn More →
                                    </Link>
                                </div>

                                <div className="glass-card p-6 rounded-2xl border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all duration-300">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white mr-4">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-semibold text-white">API Documentation</h3>
                                    </div>
                                    <p className="text-gray-300 mb-4">For developers integrating with our platform</p>
                                    <a href="#" className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-300">
                                        View Docs →
                                    </a>
                                </div>

                                <div className="glass-card p-6 rounded-2xl border border-white/10 backdrop-blur-xl hover:border-white/20 transition-all duration-300">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center text-white mr-4">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-semibold text-white">Report Issues</h3>
                                    </div>
                                    <p className="text-gray-300 mb-4">Report bugs, inappropriate content, or security concerns</p>
                                    <a href="mailto:report@roommatesfinder.com" className="text-red-400 hover:text-red-300 font-medium transition-colors duration-300">
                                        Report Now →
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Support;
