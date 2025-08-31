import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaInstagram, FaTwitter } from "react-icons/fa"; // icons

export default function Footer() {
    return (
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-200 transition-colors duration-300">
            <div className="mx-auto w-full max-w-screen-xl p-6 lg:py-8">
                {/* Top Section */}
                <div className="flex flex-wrap justify-between items-center mb-6">
                    <Link to="/" className="flex items-center mb-4 md:mb-0">
                        <img
                            src="https://imgcdn.stablediffusionweb.com/2024/12/5/caa5f1b1-3c88-4ba3-a510-f3a1c4921013.jpg"
                            alt="MediConnect Logo"
                            className="h-16 w-16 rounded-full shadow-md border-2 border-blue-200 transition-transform duration-300 hover:scale-105"
                        />
                        <h1 className="ml-4 text-xl font-bold text-blue-600 dark:text-blue-400">
                            MediConnect
                        </h1>
                    </Link>
                </div>

                {/* Footer Links */}
                <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                    {/* Quick Links */}
                    <div>
                        <h2 className="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-gray-100">
                            Quick Links
                        </h2>
                        <ul className="text-gray-600 dark:text-gray-300 font-medium space-y-3">
                            <li>
                                <Link to="/book-appointment" className="hover:underline">
                                    Book Appointment
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="hover:underline">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Follow Us */}
                    <div>
                        <h2 className="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-gray-100">
                            Follow Us
                        </h2>
                        <ul className="text-gray-600 dark:text-gray-300 font-medium space-y-3">
                            <li className="flex items-center space-x-2">
                                <FaLinkedin className="text-blue-700" />
                                <a
                                    href="https://www.linkedin.com/company/mediconnect"
                                    className="hover:underline"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    LinkedIn
                                </a>
                            </li>
                            <li className="flex items-center space-x-2">
                                <FaInstagram className="text-pink-500" />
                                <a
                                    href="https://www.instagram.com/mediconnect"
                                    className="hover:underline"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Instagram
                                </a>
                            </li>
                            <li className="flex items-center space-x-2">
                                <FaTwitter className="text-sky-500" />
                                <a
                                    href="https://twitter.com/mediconnect"
                                    className="hover:underline"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Twitter
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h2 className="mb-6 text-sm font-semibold uppercase text-gray-900 dark:text-gray-100">
                            Legal
                        </h2>
                        <ul className="text-gray-600 dark:text-gray-300 font-medium space-y-3">
                            <li>
                                <Link to="#" className="hover:underline">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="#" className="hover:underline">
                                    Terms &amp; Conditions
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <hr className="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />

                {/* Bottom Section */}
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400 sm:text-center">
                        © {new Date().getFullYear()}{" "}
                        <a href="/" className="hover:underline">
                            MediConnect
                        </a>
                        . All Rights Reserved.
                    </span>
                </div>
            </div>
        </footer>
    );
}
