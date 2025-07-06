import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        {/* Newsletter Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Stay Connected
          </h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Get the latest updates on new listings and roommate matching tips delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-all duration-300"
            />
            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25">
              Subscribe
            </button>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-4">
                <span className='text-white'>Roommate</span>
                <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text"> Finder</span>
              </h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Connecting people to find their perfect roommate match since 2023. We help you find compatible roommates based on location, budget, and lifestyle preferences.
              </p>
            </div>
            
            {/* Social Media Links */}
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                 className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-blue-600 transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25">
                <i className="fab fa-facebook-f text-lg"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                 className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-blue-400 transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-blue-400/25">
                <i className="fab fa-twitter text-lg"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                 className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-pink-500/25">
                <i className="fab fa-instagram text-lg"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
                 className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-blue-700 transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-blue-700/25">
                <i className="fab fa-linkedin-in text-lg"></i>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
                 className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gray-700 transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-gray-700/25">
                <i className="fab fa-github text-lg"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white relative">
              Quick Links
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r"></div>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-all duration-300 flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/browselist" className="text-gray-300 hover:text-white transition-all duration-300 flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  Browse Listings
                </Link>
              </li>
              <li>
                <Link to="/createroom" className="text-gray-300 hover:text-white transition-all duration-300 flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  Post a Listing
                </Link>
              </li>
              <li>
                <Link to="/mylist" className="text-gray-300 hover:text-white transition-all duration-300 flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  My Listings
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white relative">
              Support
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r"></div>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-all duration-300 flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-all duration-300 flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-gray-300 hover:text-white transition-all duration-300 flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  Help Center
                </Link>
              </li>
              <li>
                <a href="/privacy-policy" className="text-gray-300 hover:text-white transition-all duration-300 flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white relative">
              Get in Touch
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r"></div>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center group-hover:bg-blue-600/40 transition-all duration-300">
                  <i className="fas fa-map-marker-alt text-blue-400"></i>
                </div>
                <div className="text-gray-300">
                  <div className="font-medium">Office Address</div>
                  <div className="text-sm">123 Roommate Street, Apartmentville, NY 10001</div>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center group-hover:bg-green-600/40 transition-all duration-300">
                  <i className="fas fa-phone-alt text-green-400"></i>
                </div>
                <div className="text-gray-300">
                  <div className="font-medium">Phone</div>
                  <div className="text-sm">+1 (555) 123-4567</div>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center group-hover:bg-purple-600/40 transition-all duration-300">
                  <i className="fas fa-envelope text-purple-400"></i>
                </div>
                <div className="text-gray-300">
                  <div className="font-medium">Email</div>
                  <div className="text-sm">support@roommatefinder.com</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} RoommateFinder. All rights reserved. Made with ❤️ for better living.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="/terms" className="text-gray-400 hover:text-white transition-colors duration-300">Terms of Service</a>
              <a href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-300">Privacy Policy</a>
              <a href="/cookies" className="text-gray-400 hover:text-white transition-colors duration-300">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;