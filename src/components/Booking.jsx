import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/calendar.css';
import { useLocation } from 'react-router-dom';
import { doctors as allDoctors } from '../components/DoctorCards';
import FileUploader from '../components/FileUploader';
import CountdownTimer from '../components/CountdownTimer';
import JitsiRoom from '../components/JitsiRoom';

const mockDB = {};

const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '2:00 PM', '3:00 PM',
  '4:00 PM', '5:00 PM'
];

function get24Hour(slot) {
  if (!slot) return [0, 0];
  const [time, modifier] = slot.split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  if (modifier === 'PM' && hours !== 12) hours += 12;
  if (modifier === 'AM' && hours === 12) hours = 0;
  return [hours, minutes];
}

const BookAppointment = () => {
  const { state } = useLocation();
  const passedDoctor = state?.doctor || null;
  const searchQuery = state?.searchQuery || '';
  const suggestedDoctors = state?.suggestedDoctors || allDoctors;

  const [selectedDoctorId, setSelectedDoctorId] = useState(passedDoctor?.id || '');
  const [date, setDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState('');
  const [consultationType, setConsultationType] = useState('');
  const [message, setMessage] = useState('');

  // 🔹 Auto-select doctor if searchQuery is passed
  useEffect(() => {
    if (!passedDoctor && searchQuery) {
      const foundDoctor = allDoctors.find((doc) =>
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.specialty.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (foundDoctor) {
        setSelectedDoctorId(foundDoctor.id);
      }
    }
  }, [passedDoctor, searchQuery]);

  const doctor = suggestedDoctors.find((doc) => doc.id === selectedDoctorId);

  const handleBooking = () => {
    if (!doctor || !selectedSlot || !consultationType) {
      setMessage('❗ Please select doctor, consultation type, and time slot.');
      return;
    }

    const dateStr = date.toDateString();
    const key = `${doctor.id}|${dateStr}|${selectedSlot}`;
    const currentCount = mockDB[key] || 0;

    if (currentCount >= 10) {
      setMessage('⚠️ This slot is fully booked. Please choose another one.');
    } else {
      mockDB[key] = currentCount + 1;
      setMessage(`✅ Appointment booked with ${doctor.name} at ${selectedSlot} on ${dateStr} (${consultationType})`);
    }
  };

  const targetTime = new Date(date);
  if (selectedSlot) {
    const [h, m] = get24Hour(selectedSlot);
    targetTime.setHours(h, m, 0, 0);
  }

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-10 px-4 flex flex-col items-center gap-8 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl max-w-2xl w-full transition-colors duration-300">
        <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-6">
          {passedDoctor ? `Book Appointment with ${passedDoctor.name}` : 'Book Appointment'}
        </h2>

        {/* Doctor Selection Dropdown */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Select Doctor:</label>
          <select
            value={selectedDoctorId}
            onChange={(e) => setSelectedDoctorId(parseInt(e.target.value))}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-xl focus:outline-none focus:border-blue-500"
          >
            <option value="">-- Choose Doctor --</option>
            {suggestedDoctors.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.name} ({doc.specialty})
              </option>
            ))}
          </select>
        </div>

        {/* Date Picker */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Select Date:</label>
          <div className="bg-white dark:bg-gray-700 p-2 rounded-xl">
            <Calendar
              value={date}
              onChange={setDate}
              minDate={new Date()}
              className="REACT-CALENDAR"
            />
          </div>
        </div>

        {/* Consultation Type */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Consultation Type:</label>
          <select
            value={consultationType}
            onChange={(e) => setConsultationType(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-xl focus:outline-none focus:border-blue-500"
          >
            <option value="">-- Select --</option>
            <option value="In-Person">In-Person</option>
            <option value="Video Consultation">Video Consultation</option>
          </select>
        </div>

        {/* Time Slots */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Select Time Slot:</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {timeSlots.map((slot) => {
              const key = `${doctor?.id}|${date.toDateString()}|${slot}`;
              const isFull = doctor ? (mockDB[key] || 0) >= 10 : false;

              const isToday = new Date().toDateString() === date.toDateString();
              const [slotHour, slotMinute] = get24Hour(slot);
              const now = new Date();
              const slotTime = new Date(date);
              slotTime.setHours(slotHour, slotMinute, 0, 0);

              const isPast = isToday && slotTime <= now;
              const isDisabled = !doctor || isFull || isPast;

              return (
                <button
                  key={slot}
                  onClick={() => !isDisabled && setSelectedSlot(slot)}
                  disabled={isDisabled}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition
                    ${isDisabled
                      ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      : selectedSlot === slot
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800'}`}
                >
                  {slot} {isFull ? '(Full)' : isPast ? '(Passed)' : ''}
                </button>
              );
            })}
          </div>
        </div>

        <FileUploader />

        {selectedSlot && consultationType === 'Video Consultation' && (
          <CountdownTimer targetDateTime={targetTime} />
        )}

        <button
          onClick={handleBooking}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition hover:scale-105"
        >
          Confirm Booking
        </button>

        {message && (
          <div className="mt-4 text-sm text-center font-medium text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-gray-700 py-2 rounded">
            {message}
          </div>
        )}
      </div>

      {/* Jitsi Video Room */}
      {message.includes('Appointment booked') && consultationType === 'Video Consultation' && (
        <div className="w-full max-w-5xl">
          <h3 className="text-center text-xl font-semibold mb-4">Join Your Video Consultation Room</h3>
          <JitsiRoom roomName={`MediConnect-${doctor?.name?.replace(/\s/g, '')}-${date.toDateString().replace(/\s/g, '')}`} />
        </div>
      )}
    </div>
  );
};

export default BookAppointment;