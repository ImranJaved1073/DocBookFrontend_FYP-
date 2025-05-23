// sidebarNavConfig.js
import { FiHome, FiFilePlus, FiFileText, FiUsers, FiUser, FiLogOut, FiCalendar } from "react-icons/fi"; // Doctor Icons
import { FaUserMd,FaCalendarAlt } from "react-icons/fa"; // Patient Icons
import { Home, FileText, Bell, LogOut, Scan } from "lucide-react"; // Patient Icons

export const getSidebarNavLinks = (userType) => {
  if (userType === "doctor") {
    return [
      { to: "doctorDashboard", icon: <FiHome size={18} />, text: "Dashboard" },
      { to: "doctor/create_prescription", icon: <FiFilePlus size={18} />, text: "Create Prescription" },
      { to: "doctor/prescriptions", icon: <FiFileText size={18} />, text: "Prescriptions" },
      { to: "doctor/patients", icon: <FiUsers size={18} />, text: "Patients" },
      { to: "doctor/my_profile", icon: <FiUser size={18} />, text: "My Profile" },
      { to: "doctor/my_appointments", icon: <FiCalendar size={18} />, text: "Appointments" },
      { to: "doctor/upcoming", icon: <FaCalendarAlt size={18} />, text: "Upcoming Appointments" },
    ];
  } else if (userType === "patient") {
    return [
      { to: "patientDashboard", icon: <Home size={18} />, text: "Dashboard" },
      { to: "patient/scan_prescription", icon: <Scan size={18} />, text: "Scan Prescription" },
      { to: "patient/view_prescriptions", icon: <FileText size={18} />, text: "View Prescriptions" },
      { to: "patient/doctors", icon: <FaUserMd size={18} />, text: "Doctors" },
      { to: "patient/Reminders", icon: <Bell size={18} />, text: "Reminders" },
      { to: "patient/my_appointments", icon: <FiCalendar size={18} />, text: "Appointments" },
      { to: "patient/my_appointments/upcoming", icon: <FiCalendar size={18} />, text: "Appointments" },
    ];
  } else {
    return []; // Default case (optional)
  }
};