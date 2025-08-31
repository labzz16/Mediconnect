import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserMd, FaUser } from 'react-icons/fa';

const UserSelectionLogin = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-50 dark:from-gray-900 dark:to-gray-950 px-4 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-10 max-w-xl w-full text-center animate-fade-in transition-colors duration-300">
        <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-400 mb-8">Select User Type</h1>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          {/* Doctor Button */}
          <button
            onClick={() => navigate('/doctor-login')}
            className="w-full sm:w-1/2 bg-blue-600 text-white px-6 py-4 rounded-xl text-lg font-semibold flex items-center justify-center gap-3 hover:bg-blue-700 hover:scale-105 transition shadow-md"
          >
            <FaUserMd className="text-2xl" />
            Doctor
          </button>

          {/* Patient Button */}
          <button
            onClick={() => navigate('/patient-login')}
            className="w-full sm:w-1/2 bg-green-600 text-white px-6 py-4 rounded-xl text-lg font-semibold flex items-center justify-center gap-3 hover:bg-green-700 hover:scale-105 transition shadow-md"
          >
            <FaUser className="text-2xl" />
            Patient
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSelectionLogin;
