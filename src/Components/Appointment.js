// src/Components/Appointment.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiClock } from "react-icons/fi";
import ApiService from "../Services/ApiService";
import { colors } from "../Constants/Colors";

const Appointment = () => {
  const [appointmentCount, setAppointmentCount] = useState(0);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const doctorEmail = localStorage.getItem("userEmail");
        const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

        const result = await ApiService.getAppointmentsByDate(doctorEmail, today);
        setAppointments(result);
        setAppointmentCount(result.length);
      } catch (err) {
        console.error("Error loading appointments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <motion.div
      className="p-3 sm:p-4 rounded-lg shadow-md flex justify-between items-center cursor-pointer"
      style={{ backgroundColor: colors.secondary }}
      whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
      onClick={() => navigate("/doctor/my_appointments", { state: { appointments } })}
    >
      <div>
        <p className="text-xs sm:text-sm" style={{ color: colors.textLight }}>
          Appointments
        </p>
        <h2 className="text-xl sm:text-2xl font-bold" style={{ color: colors.textDark }}>
          {loading ? (
            <div className="h-6 sm:h-8 w-10 sm:w-12 bg-gray-200 animate-pulse rounded"></div>
          ) : (
            appointmentCount
          )}
        </h2>
      </div>
      <div
        className="p-2 sm:p-3 rounded-full"
        style={{ backgroundColor: `${colors.primary}15` }}
      >
        <FiClock className="text-xl sm:text-2xl" style={{ color: colors.primary }} />
      </div>
    </motion.div>
  );
};

export default Appointment;
