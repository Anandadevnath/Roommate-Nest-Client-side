import React from 'react';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';

function About() {
    return (
        <>
            <NavBar />
            <main className="bg-gray-50 text-gray-800 min-h-screen pt-20 pb-16 mt-16">
                <div className="max-w-4xl mx-auto px-6">
                    <section className="bg-white shadow-lg rounded-2xl p-8">
                        <h1 className="text-4xl font-extrabold text-black mb-6">About Event Explorer</h1>
                        <p className="text-lg leading-relaxed mb-6">
                            <strong>Event Explorer</strong> is your go-to platform for discovering exciting local events happening around you. Whether you're interested in conferences, workshops, sports events, art exhibitions, or other community gatherings, Event Explorer makes it easy to find and explore them all in one place.
                        </p>
                        <h2 className="text-2xl font-bold text-black mb-4">Project Theme</h2>
                        <p className="text-lg leading-relaxed mb-4">
                            This project focuses on building a dynamic and interactive platform that allows users to:
                        </p>
                        <ul className="list-disc list-inside text-lg text-gray-700 space-y-2 mb-6">
                            <li>Browse and search for local events</li>
                            <li>View detailed information about each event</li>
                            <li>Log in to personalize their experience</li>
                            <li>Leave feedback and rate events they've attended</li>
                        </ul>
                        <p className="text-lg leading-relaxed">
                            Our goal is to connect people with local experiences and foster community engagement through easy access to event information.
                        </p>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default About;
