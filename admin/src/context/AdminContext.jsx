import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [aToken, setAToken] = useState(localStorage.getItem('aToken') || '');
    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [dashData, setDashData] = useState(false);
    const [editingDoctor, setEditingDoctor] = useState(null);

    // Get All Doctors
    const getAllDoctors = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/apis/admin/all-doctors`, {
                headers: {
                    'Authorization': `Bearer ${aToken}`,
                    'Content-Type': 'application/json'
                }
            });
            if (data.success) {
                setDoctors(data.doctors);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Change Doctor Availability
    const changeAvailability = async (docId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/apis/admin/change-availability`, 
                { docId }, 
                { headers: { 'Authorization': `Bearer ${aToken}` } }
            );
            if (data.success) {
                toast.success(data.message);
                getAllDoctors();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

      //update doctor
    const updateDoctor = async (docId, updatedDetails) => {
        try {
            const { data } = await axios.put(`${backendUrl}/apis/admin/update-doctor/${docId}`, updatedDetails, {
                headers: { 'Authorization': `Bearer ${aToken}` }
            });
    
            if (data.success) {
                toast.success(data.message);
                getAllDoctors(); // Refresh the list after update
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };
    

    // Delete Doctor
    const deleteDoctor = async (docId) => {
        try {
            const { data } = await axios.delete(`${backendUrl}/apis/admin/delete-doctor/${docId}`, {
                headers: { 'Authorization': `Bearer ${aToken}` }
            });
            if (data.success) {
                toast.success(data.message);
                getAllDoctors();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    

    // Get All Appointments
    const getAllAppointments = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/apis/admin/appointments`, {
                headers: { 'Authorization': `Bearer ${aToken}` }
            });
            if (data.success) {
                setAppointments(data.appointments.reverse());
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Cancel Appointment
    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(`${backendUrl}/apis/admin/cancel-appointment`, 
                { appointmentId }, 
                { headers: { 'Authorization': `Bearer ${aToken}` } }
            );
            if (data.success) {
                toast.success(data.message);
                getAllAppointments();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Get Dashboard Data
    const getDashData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/apis/admin/dashboard`, {
                headers: { 'Authorization': `Bearer ${aToken}` }
            });
            if (data.success) {
                setDashData(data.dashData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Providing everything via context
    const value = {
        aToken, setAToken,
        doctors, getAllDoctors,
        changeAvailability,
        deleteDoctor,
        updateDoctor,
        appointments, getAllAppointments,
        cancelAppointment,
        editingDoctor,
        setEditingDoctor,
        getDashData,
        dashData
    };

    

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;