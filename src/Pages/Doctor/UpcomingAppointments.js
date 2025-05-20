import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaCalendarAlt } from "react-icons/fa";
import { motion } from 'framer-motion';
import { colors } from '../../Constants/Colors';

const UpcomingAppointments = () => {
  const location = useLocation();
  const approvedAppointments = location.state?.approvedAppointments || [];

  return (
    <div
      className="min-h-screen p-3 sm:p-4 md:p-6"
      style={{ backgroundColor: colors.background }}
    >
      <motion.div
        className="w-full max-w-5xl mx-auto mb-4 sm:mb-6 mt-10 md:mt-7 lg:mt-0"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <h1
            className="text-xl sm:text-2xl md:text-3xl font-bold mb-2"
            style={{ color: colors.black }}
          >
            Upcoming Appointments
          </h1>
          <div className="w-16 sm:w-20 md:w-24 h-1 mx-auto mb-3 sm:mb-4" style={{ backgroundColor: colors.primary }}></div>
          <p className="text-xs sm:text-sm md:text-base" style={{ color: colors.black }}>
            View your approved upcoming appointments
          </p>
        </div>
      </motion.div>

      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-4 sm:p-6">
        {approvedAppointments.length === 0 ? (
          <div className="text-center">
            <p className="text-sm sm:text-base" style={{ color: colors.black }}>
              No upcoming appointments found.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {approvedAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="p-3 sm:p-4 rounded-lg shadow-sm"
                style={{ backgroundColor: colors.secondary }}
              >
                <h3
                  className="text-base sm:text-lg font-semibold mb-1 sm:mb-2"
                  style={{ color: colors.black }}
                >
                  {appointment.patientName}
                </h3>
                <p
                  className="text-xs sm:text-sm mb-1 sm:mb-2 truncate"
                  style={{ color: colors.black }}
                >
                  {appointment.patientEmail}
                </p>
                <p
                  className="flex items-center text-xs sm:text-sm mb-2 sm:mb-3"
                  style={{ color: colors.black }}
                >
                  <FaCalendarAlt className="mr-1 sm:mr-2 text-xs sm:text-sm" style={{ color: colors.primary }} />
                  {new Date(appointment.appointmentDate).toDateString()} at {appointment.bookedSlots.split('-')[0]}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingAppointments;
