import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { doctors } from "./DoctorCards";

export default function Header() {
  const [query, setQuery] = useState('');
  const [dark, setDark] = useState(() =>
    localStorage.getItem('theme') === 'dark' ||
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  const navigate = useNavigate();

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (dark) {
      html.classList.add('dark');
      body.classList.add('bg-gray-900', 'text-white');
      body.classList.remove('bg-white', 'text-black');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      body.classList.add('bg-white', 'text-black');
      body.classList.remove('bg-gray-900', 'text-white');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  // Doctor search filter
  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(query.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(query.toLowerCase()) ||
    doctor.symptoms.some(symptom =>
      symptom.toLowerCase().includes(query.toLowerCase())
    ) ||
    doctor.location.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-lg border-b border-blue-100">
      <nav className="px-4 md:px-20 py-3 w-full">
        <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-4">
            <img
              src="https://imgcdn.stablediffusionweb.com/2024/12/5/caa5f1b1-3c88-4ba3-a510-f3a1c4921013.jpg"
              alt="Logo"
              className="h-14 w-14 rounded-full border-2 border-blue-300 shadow-md hover:scale-105 transition-transform"
            />
            <h1 className="text-2xl font-bold text-blue-700 dark:text-white tracking-wide">MediConnect</h1>
          </Link>

          {/* Search */}
          <div className="relative">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (query.trim()) {
                  const foundDoctor = doctors.find((doctor) =>
                    doctor.name.toLowerCase().includes(query.toLowerCase())
                  );
                  if (foundDoctor) {
                    // Navigate directly to the booking page for that doctor
                    navigate(`/book-appointment/${foundDoctor.id}`);
                  } else {
                    // Take to booking page with search query if no exact match
                    navigate("/book-appointment", { state: { searchQuery: query } });
                  }
                }
              }}
              className="flex items-center space-x-2 animate-fade-in"
            >
              <input
                type="text"
                placeholder="Search doctors by name or specialty..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="px-4 py-2 rounded-full border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all w-48 md:w-72 dark:bg-gray-800 dark:text-white dark:border-gray-600 shadow-sm"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow"
              >
                🔍
              </button>
            </form>

            {/* Suggestions dropdown */}
            {query && (
              <ul className="absolute left-0 mt-1 w-72 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                {filteredDoctors.slice(0, 5).map((doctor) => (
                  <li
                    key={doctor.id}
                    onClick={() => {
                      setQuery("");
                      navigate(`/book-appointment/${doctor.id}`);
                    }}
                    className="px-4 py-2 cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-700"
                  >
                    <div className="font-medium">{doctor.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {doctor.specialty}
                    </div>
                  </li>
                ))}
                {filteredDoctors.length === 0 && (
                  <li className="px-4 py-2 text-gray-500 dark:text-gray-400">
                    No matches found
                  </li>
                )}
              </ul>
            )}
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDark(!dark)}
            className="text-sm px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white transition"
          >
            {dark ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>

          {/* Nav Links */}
          <div className="hidden lg:flex w-auto items-center mt-4 lg:mt-0">
            <ul className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-6 font-medium text-gray-700 dark:text-gray-200">
              <li>
                <NavLink
                  to="/book-appointment"
                  className={({ isActive }) =>
                    `${isActive ? 'text-blue-700 dark:text-blue-300' : 'hover:text-blue-700 dark:hover:text-blue-300'} transition`
                  }
                >
                  Book Now
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/signin"
                  className={({ isActive }) =>
                    `${isActive ? 'text-blue-700 dark:text-blue-300' : 'hover:text-blue-700 dark:hover:text-blue-300'} transition`
                  }
                >
                  Sign-in
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `${isActive ? 'text-blue-700 dark:text-blue-300' : 'hover:text-blue-700 dark:hover:text-blue-300'} transition`
                  }
                >
                  Login
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
