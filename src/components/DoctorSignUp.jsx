import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorSignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    doctorId: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, doctorId, password } = formData;

    if (!name || !email || !doctorId || !password) {
      setMessage('❗ Please fill in all fields.');
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setMessage('⚠️ Please enter a valid email address.');
    } else if (!/^DOC-\d{4}$/.test(doctorId)) {
      setMessage('🆔 Doctor ID must be in format: DOC-1234');
    } else if (password.length < 6) {
      setMessage('🔒 Password must be at least 6 characters long.');
    } else {
      setMessage('✅ Doctor signed up successfully!');
      // navigate('/doctor-login');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 dark:from-gray-900 dark:to-gray-950 flex items-center justify-center px-4 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-xl max-w-xl w-full border border-gray-100 dark:border-gray-700 animate-fade-in transition-colors duration-300">
        <h2 className="text-3xl font-bold text-center text-blue-700 dark:text-blue-400 mb-6">
          Doctor Sign Up 🩺
        </h2>

        {message && (
          <div
            className={`mb-4 text-center text-sm px-4 py-2 rounded font-medium transition duration-300 ${
              message.startsWith('✅')
                ? 'bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300'
                : message.startsWith('⚠️') || message.startsWith('❗') || message.startsWith('🆔')
                ? 'bg-yellow-100 dark:bg-yellow-700 text-yellow-700 dark:text-yellow-200'
                : 'bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-300'
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              placeholder="Dr. John Doe"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email</label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              placeholder="doctor@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Doctor ID</label>
            <input
              type="text"
              name="doctorId"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              placeholder="DOC-1234"
              value={formData.doctorId}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md hover:scale-105"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-300">
          Already registered?{' '}
          <span
            className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
            onClick={() => navigate('/doctor-login')}
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default DoctorSignUp;
