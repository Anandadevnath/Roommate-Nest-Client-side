import React from 'react';

function Footer() {
  return (
    <footer className="bg-[#1e293b] border-black footerhead text-white py-10 mt-12">
      <div className="max-w-8xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h2 className="text-2xl font-bold mb-2 text-white">
              <span className='footertitle text-white'>Roommate</span>
              <span className="text-blue-400"> Finder</span>
            </h2>
            <p className="text-white footerdescrip mb-4">
              Connecting people to find their perfect roommate match since 2023. We help you find compatible roommates based on location, budget, and lifestyle preferences.
            </p>
            <div className="flex space-x-4 mt-2 text-2xl">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition"><i className="fab fa-facebook-f"></i></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition"><i className="fab fa-twitter"></i></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition"><i className="fab fa-instagram"></i></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 transition"><i className="fab fa-linkedin-in"></i></a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition"><i className="fab fa-github"></i></a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-white footerlasttitle">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="/" className="hover:text-blue-400 footerhome transition">Home</a>
              </li>
              <li>
                <a href="/browse" className="hover:text-blue-400 footerbrowse transition">Browse Listings</a>
              </li>
              <li>
                <a href="/post" className="hover:text-blue-400 footerlist transition">Post a Listing</a>
              </li>
              <li>
                <a href="/my-listings" className="hover:text-blue-400 footermylist transition">My Listings</a>
              </li>
              <li>
                <a href="/terms-and-conditions" className="hover:text-blue-400 footerterm transition">Terms & Conditions</a>
              </li>
              <li>
                <a href="/privacy-policy" className="hover:text-blue-400 footerpolicy transition">Privacy Policy</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-white footercontact">Contact Us</h3>
            <ul className="space-y-3 text-white footerlastcontact">
              <li className="flex items-start gap-2">
                <i className="fas fa-map-marker-alt text-blue-400 mt-1"></i>
                <span>123 Roommate Street, Apartmentville, NY 10001</span>
              </li>
              <li className="flex items-center gap-2">
                <i className="fas fa-phone-alt text-blue-400"></i>
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <i className="fas fa-envelope text-blue-400"></i>
                <span>support@roommatefinder.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-4 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} RoommateFinder. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;