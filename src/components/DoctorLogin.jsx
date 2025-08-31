import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserMd } from 'react-icons/fa';

const DoctorLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setMessage('❗ Please enter both email and password.');
    } else if (email === 'doctor@example.com' && password === 'doc123') {
      setMessage('✅ Login successful!');
    } else {
      setMessage('❌ Invalid email or password.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center px-4 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-xl max-w-xl w-full border border-gray-100 dark:border-gray-700 animate-fade-in transition-colors duration-300">
        <h2 className="text-3xl font-bold text-center text-blue-700 dark:text-blue-400 mb-6 flex justify-center items-center gap-2">
          <FaUserMd className="text-blue-600 dark:text-blue-400" />
          Doctor Login
        </h2>

        {message && (
          <div className="mb-4 text-center text-sm text-yellow-700 dark:text-yellow-300 bg-yellow-100 dark:bg-yellow-800 px-4 py-2 rounded transition duration-300">
            {message}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
                className="rounded"
              />
              Remember me
            </label>
            <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Forgot Password?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition hover:scale-105 shadow-md"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 dark:text-gray-300 mt-6">
          Don’t have an account?{' '}
          <Link to="/doctor-signup" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            Register here
          </Link>
        </p>

        <p className="text-sm text-center text-gray-600 dark:text-gray-300 mt-2">
          Not a doctor?{' '}
          <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            Go back to user selection
          </Link>
        </p>
      </div>
    </div>
  );
};

export default DoctorLogin;
