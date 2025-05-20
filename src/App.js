import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import Sidebar from "./Components/Sidebar";
import ChangePassword from "./Pages/ChangePassword";
import ForgotPassword from "./Pages/ForgotPassword";


// Doctor Pages
import CreatePrescription from "./Pages/Doctor/CreatePrescription";
import Prescriptions from "./Pages/Doctor/Prescriptions";
import MyProfile from "./Pages/Doctor/MyProfile";
import Patients from "./Pages/Doctor/Patients";
import DoctorAppointments from "./Pages/Doctor/Appointments";
import DoctorDashboard from "./Pages/Doctor/Dashboard";
import UpcomingAppointments from './Pages/Doctor/UpcomingAppointments';

// Patient Pages
import PatientAppointments from "./Pages/Patient/Appointments";
import PatientDashboard from "./Pages/Patient/Dashboard";
import ViewPrescriptions from "./Pages/Patient/ViewPrescriptions";
import Reminders from "./Pages/Patient/Reminders";
import ScanPrescription from "./Pages/Patient/ScanPrescription";
import Doctors from "./Pages/Patient/Doctors";
import DoctorProfile from "./Pages/Patient/DoctorProfile";
import BookAppointment from "./Pages/Patient/BookAppointment";
import RequestSubmitted from "./Pages/Patient/RequestSubmitted";
import AppointmentCancelled from "./Pages/Patient/AppointmentCancelled";

// Common Pages
import About from "./Pages/About";
import Help from "./Pages/Help";
import Home from "./Pages/Home";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import Contact from "./Pages/Contact";
import NotFound from "./Pages/NotFound";
import AccessDenied from "./Pages/AccessDenied";

const AppWrapper = () => {
  const location = useLocation();
  const userType = localStorage.getItem("userRole")?.toLowerCase();

  const publicPaths = ["/", "/about", "/help", "/contact "];
  const passwordPaths = ["/forgot-password", "/change-password"];
  const isPasswordPage = passwordPaths.includes(location.pathname);
  const isPublicPage = publicPaths.includes(location.pathname) && !isPasswordPage;

  return (
    <div className="App min-h-screen flex flex-col">
      {/* Show Navbar and Footer only on public pages */}
      {isPublicPage && <Navbar />}

      <div className="flex flex-1">
        {/* Show Sidebar only on private pages */}
        {userType && !isPublicPage && !isPasswordPage && <Sidebar userType={userType} />}

        <div className={`content flex-1  ${userType && !isPublicPage && !isPasswordPage ? "lg:ml-64" : ""}`}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/help" element={<Help />} />
            <Route path="/contact" element={<Contact />} />
            
            <Route path={`/${userType}Dashboard`} element={userType === "doctor" ? <DoctorDashboard /> : userType === "patient" ? <PatientDashboard /> : <AccessDenied />} />

            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/change-password" element={<ChangePassword />} />
            
            {!userType && (
              <>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
              </>
            )}

            {/* Doctor Routes */}
            {userType === "doctor" && (
              <>
                <Route path="/doctorDashboard" element={<DoctorDashboard />} />
                <Route path="/doctor/create_prescription" element={<CreatePrescription />} />
                <Route path="/doctor/prescriptions" element={<Prescriptions />} />
                <Route path="/doctor/patients" element={<Patients />} />
                <Route path="/doctor/my_profile" element={<MyProfile />} />
                <Route path="/doctor/my_appointments" element={<DoctorAppointments />} />
                <Route path="/doctor/upcoming" element={<UpcomingAppointments />} />
              </>
            )}

            {/* Patient Routes */}
            {userType === "patient" && (
              <>
                <Route path="/patientDashboard" element={<PatientDashboard />} />
                <Route path="/patient/scan_prescription" element={<ScanPrescription />} />
                <Route path="/patient/view_prescriptions" element={<ViewPrescriptions />} />
                <Route path="/patient/doctors" element={<Doctors />} />
                <Route path="/patient/doctors/Doctor_Profile" element={<DoctorProfile />} />
                <Route path="/patient/doctors/Book_Appointment" element={<BookAppointment />} />
                <Route path="/patient/doctors/Book_Appointment/Request_submitted" element={<RequestSubmitted />} />
                <Route path="/patient/doctors/Doctor_Profile/Book_Appointment" element={<BookAppointment />} />
                <Route path="/patient/doctors/Doctor_Profile/Book_Appointment/Request_submitted" element={<RequestSubmitted />} />
                <Route path="/patient/Reminders" element={<Reminders />} />
                <Route path="/patient/my_appointments" element={<PatientAppointments />} />
                <Route path="/patient/my_appointments/AppointmentCancelled" element={<AppointmentCancelled />} />
                <Route path="/signup" element={<AccessDenied />} />
                <Route path="/doctor/upcoming" element={<UpcomingAppointments />} />
              </>
            )}

            
          <Route path="*" element={<NotFound />} />

          </Routes>
        </div>
      </div>

      {/* Footer only on public pages */}
      {isPublicPage && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <ToastContainer
      />
      <AppWrapper />
    </Router>
  );
}

export default App;
