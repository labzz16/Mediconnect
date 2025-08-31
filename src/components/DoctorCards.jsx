import React, { useState } from 'react';
import { FaUserMd, FaMapMarkerAlt, FaMoneyBillWave } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { getSpecialtyFromSymptoms } from '../utils/symptomHelper';

export const doctors = [
  {
    id: 1,
    name: 'Dr. Priya Sharma',
    gender: 'female',
    ageGroup: 'Adult (20-59)',
    consultation: 'In-Person',
    language: ['Hindi', 'English'],
    symptoms: ['chest pain', 'breathlessness'],
    specialty: 'Cardiologist',
    rating: 4.8,
    reviews: 127,
    location: 'Fortis Hospital, Mumbai',
    fee: 800,
  },
  {
    id: 2,
    name: 'Dr. Rakesh Verma',
    gender: 'male',
    ageGroup: 'Senior (60+)',
    consultation: 'Video Consultation',
    language: ['Hindi', 'English'],
    symptoms: ['joint pain', 'arthritis'],
    specialty: 'Orthopedic',
    rating: 4.6,
    reviews: 89,
    location: 'Apollo Hospital, Delhi',
    fee: 600,
  },
  {
    id: 3,
    name: 'Dr. Neha Patil',
    gender: 'female',
    ageGroup: 'Child (0-12)',
    consultation: 'Either',
    language: ['Marathi', 'English'],
    symptoms: ['fever', 'cold', 'cough'],
    specialty: 'Pediatrician',
    rating: 4.9,
    reviews: 156,
    location: 'Cloudnine Hospital, Pune',
    fee: 500,
  },
  {
    id: 4,
    name: 'Dr. Arjun Singh',
    gender: 'male',
    ageGroup: 'Adult (20-59)',
    consultation: 'In-Person',
    language: ['Hindi', 'Punjabi'],
    symptoms: ['anxiety', 'depression'],
    specialty: 'Psychiatrist',
    rating: 4.7,
    reviews: 102,
    location: 'AIIMS, Delhi',
    fee: 700,
  },
  {
    id: 5,
    name: 'Dr. Kavita Mehra',
    gender: 'female',
    ageGroup: 'Teen (13-19)',
    consultation: 'Video Consultation',
    language: ['English', 'Gujarati'],
    symptoms: ['skin rash', 'acne'],
    specialty: 'Dermatologist',
    rating: 4.5,
    reviews: 76,
    location: 'Nanavati Hospital, Mumbai',
    fee: 650,
  },
  {
    id: 6,
    name: 'Dr. Aman Kapoor',
    gender: 'male',
    ageGroup: 'Adult (20-59)',
    consultation: 'Either',
    language: ['English', 'Hindi'],
    symptoms: ['stomach pain', 'indigestion'],
    specialty: 'Gastroenterologist',
    rating: 4.4,
    reviews: 95,
    location: 'Max Hospital, Gurgaon',
    fee: 750,
  },
];

export default function DoctorCards() {
  const [filters, setFilters] = useState({
    symptoms: '',
    gender: '',
    ageGroup: '',
    consultation: '',
    location: '',
    language: '',
  });

  const [suggested, setSuggested] = useState([]);
  const [suggestedSpecialty, setSuggestedSpecialty] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const updatedFilters = { ...filters, [e.target.name]: e.target.value };
    setFilters(updatedFilters);

    if (e.target.name === 'symptoms') {
      const autoSpecialty = getSpecialtyFromSymptoms(e.target.value);
      setSuggestedSpecialty(autoSpecialty || '');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const results = doctors.filter((doc) => {
      const symptomMatch =
        !filters.symptoms ||
        doc.symptoms.some((s) =>
          s.toLowerCase().includes(filters.symptoms.toLowerCase())
        );
      const genderMatch = !filters.gender || doc.gender === filters.gender;
      const ageMatch = !filters.ageGroup || doc.ageGroup === filters.ageGroup;
      const consultMatch =
        !filters.consultation ||
        doc.consultation === filters.consultation ||
        filters.consultation === 'Either';
      const locationMatch =
        !filters.location ||
        doc.location.toLowerCase().includes(filters.location.toLowerCase());
      const langMatch =
        !filters.language ||
        doc.language.some((l) =>
          l.toLowerCase().includes(filters.language.toLowerCase())
        );

      return (
        symptomMatch && genderMatch && ageMatch && consultMatch && locationMatch && langMatch
      );
    });

    setSuggested(results);
    setSubmitted(true);
  };

  const navigate = useNavigate();
  const renderCard = (doc) => (
    <div
      key={doc.id}
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 flex flex-col justify-between animate-fade-in"
    >
      <div>
        <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
          <FaUserMd className="text-blue-500" />
          {doc.name}
        </h4>
        <p className="text-blue-600 dark:text-blue-400 font-semibold">{doc.specialty}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 flex items-center">
          <FaMapMarkerAlt className="mr-2" />
          {doc.location}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 flex items-center">
          <FaMoneyBillWave className="mr-2" />
          ₹{doc.fee}
        </p>
      </div>
      <button
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-medium text-sm transition-transform duration-200 hover:scale-105 shadow"
        onClick={() => navigate('/book-appointment', { state: { doctor: doc } })}
      >
        Book Now
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-10 px-4">
      {/* Patient Requirements */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-10 px-4">
        <div className="hidden lg:block w-[700px] h-[500px] rounded-3xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-600">
          <img
            src="https://img.freepik.com/premium-vector/online-doctor-virtual-medicine-online-medical-consultation_572614-122.jpg"
            alt="Left side healthcare"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full max-w-[600px] bg-white dark:bg-gray-900 bg-opacity-90 rounded-3xl shadow-xl p-6 border border-gray-200 dark:border-gray-600 transition-all duration-500 hover:scale-[1.01] animate-fade-in delay-400">
          <h2 className="text-center text-4xl font-bold text-blue-700 dark:text-white mb-10">
            Patient Requirements 📝
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <input
              name="symptoms"
              placeholder="Enter symptoms (e.g., rash, chest pain)"
              onChange={handleChange}
              className="p-4 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-xl focus:outline-none focus:border-blue-500 shadow-sm"
            />
            <select
              name="gender"
              onChange={handleChange}
              className="p-4 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-xl focus:outline-none focus:border-blue-500 shadow-sm"
            >
              <option value="">Preferred Doctor Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <select
              name="ageGroup"
              onChange={handleChange}
              className="p-4 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-xl focus:outline-none focus:border-blue-500 shadow-sm"
            >
              <option value="">Select Age Group</option>
              <option value="Child (0-12)">Child (0-12)</option>
              <option value="Teen (13-19)">Teen (13-19)</option>
              <option value="Adult (20-59)">Adult (20-59)</option>
              <option value="Senior (60+)">Senior (60+)</option>
            </select>
            <select
              name="consultation"
              onChange={handleChange}
              className="p-4 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-xl focus:outline-none focus:border-blue-500 shadow-sm"
            >
              <option value="">Consultation Type</option>
              <option value="In-Person">In-Person</option>
              <option value="Video Consultation">Video Consultation</option>
              <option value="Either">Either</option>
            </select>
            <input
              name="location"
              placeholder="Preferred Location (e.g., Mumbai, Delhi)"
              onChange={handleChange}
              className="p-4 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-xl focus:outline-none focus:border-blue-500 shadow-sm md:col-span-2"
            />
            <input
              name="language"
              placeholder="Preferred Language (e.g., Hindi, English)"
              onChange={handleChange}
              className="p-4 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-xl focus:outline-none focus:border-blue-500 shadow-sm md:col-span-2"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold rounded-xl py-4 hover:bg-blue-700 transition md:col-span-2 text-lg shadow-lg hover:scale-105"
            >
              Submit Requirements
            </button>
          </form>
          {suggestedSpecialty && (
            <p className="text-center text-blue-600 dark:text-blue-300 mt-4 text-base font-medium">
              🔍 Suggested Specialty: <span className="font-bold">{suggestedSpecialty}</span>
            </p>
          )}
        </div>

        <div className="hidden lg:block w-[700px] h-[500px] rounded-3xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-600">
          <img
            src="https://img.freepik.com/premium-photo/specialist-doctor-giving-advice-patient-flat-design_734610-16061.jpg"
            alt="Right side healthcare"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Suggested Doctors */}
      {submitted && (
        <div className="w-full max-w-7xl mx-auto mb-10">
          {suggested.length > 0 ? (
            <>
              <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white text-center">
                Suggested Doctors ({suggested.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {suggested.map(renderCard)}
              </div>
              <div className="text-center mt-6">
                <button
                  onClick={() => {
                    setSuggested([]);
                    setSubmitted(false);
                    setFilters({
                      symptoms: '',
                      gender: '',
                      ageGroup: '',
                      consultation: '',
                      location: '',
                      language: '',
                    });
                  }}
                  className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                >
                  Clear Search & Reset
                </button>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-800 dark:text-white text-lg">
              No doctors found matching your requirements.
            </p>
          )}
        </div>
      )}

      {/* Always show 6 doctor cards at the bottom */}
      <div id="top-doctors" className="w-full max-w-7xl mx-auto mt-12">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white text-center">
          Meet Our Top Doctors
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.slice(0, 6).map(renderCard)}
        </div>
      </div>
    </div>
  );
}
