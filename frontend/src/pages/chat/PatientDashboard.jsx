import { useState, useEffect } from 'react';
import ChatWindow from './ChatWindow';
import axios from 'axios';

export default function PatientDashboard() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState({ doctorId: '', date: '', time: '' });

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      await Promise.all([fetchDoctors(), fetchAppointments(), fetchPrescriptions(), fetchReports()]);
    } catch (err) {
      console.error('❌ Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch doctors
  const fetchDoctors = async () => {
    const res = await axios.get('/api/apis/doctors/all');
    setDoctors(res.data);
  };

  // Fetch patient appointments
  const fetchAppointments = async () => {
    const res = await axios.get(`/api/apis/appointments/get/${user?.patient?._id}`);
    setAppointments(res.data);
  };

  // Fetch prescriptions
  const fetchPrescriptions = async () => {
    const res = await axios.get(`/api/apis/prescription/get/${user?.patient?._id}`);
    setPrescriptions(res.data);
  };

  // Fetch reports
  const fetchReports = async () => {
    const res = await axios.get(`/api/apis/report/${user?.patient?._id}`);
    setReports(res.data);
  };

  // Book appointment handler
  const handleBookAppointment = async () => {
    const { doctorId, date, time } = bookingData;
    if (!doctorId || !date || !time) return alert('⚠️ Please fill all fields.');

    try {
      await axios.post('/api/apis/appointments/book', {
        ...bookingData,
        patientId: user.patient._id
      });
      alert('✅ Appointment booked successfully!');
      setBookingData({ doctorId: '', date: '', time: '' });
      fetchAppointments();
    } catch (error) {
      console.error('❌ Failed to book appointment:', error);
      alert('❌ Error booking appointment.');
    }
  };

  // File download handler (supports both absolute and relative paths)
  const handleDownload = async (fileUrl, fileName) => {
    try {
      const downloadUrl = fileUrl.startsWith('http') ? fileUrl : `/api/${fileUrl}`;
      const response = await axios.get(downloadUrl, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('❌ Failed to download:', error);
    }
  };

  // Download prescription text as .txt file
  const downloadTextPrescription = (text, index) => {
    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `prescription-${index + 1}.txt`;
    document.body.appendChild(element);
    element.click();
    element.remove();
  };

  // Helper: Get doctor name by ID
  const getDoctorName = (doctorId) => {
    const doc = doctors.find(d => d._id === (typeof doctorId === 'object' ? doctorId?._id : doctorId));
    return doc?.name || 'N/A';
  };

  // Loading screen
  if (loading) return (
    <div className="p-4 text-center">
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
      </div>
      <p className="mt-2">Loading your dashboard...</p>
    </div>
  );

  return (
    <div className="p-4 bg-gray-100 min-h-screen mt-20">
      {/* Header */}
      <h1 className="text-3xl text-blue-600 font-bold mb-2">Patient Dashboard</h1>
      <h2 className="text-xl">Welcome, {user?.patient?.name || 'Patient'}</h2>

      

      {/* Prescriptions */}
      <div className="bg-white shadow-md rounded-lg p-4 mt-4">
        <h3 className="text-lg font-semibold mb-4">💊 My Prescriptions</h3>
        {prescriptions.length === 0 ? (
          <p>No prescriptions available.</p>
        ) : (
          prescriptions.map((pres, idx) => (
            <div key={idx} className="my-2 p-2 border rounded-lg">
              <p><strong>Doctor:</strong> {getDoctorName(pres.doctorId)}</p>
              <p><strong>Notes:</strong></p>
              <pre className="bg-gray-100 p-2 rounded">{pres.prescriptionText || 'No prescription text available'}</pre>
              {pres.pdfUrl ? (
                <button
                  className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  onClick={() => handleDownload(pres.pdfUrl, `prescription-${idx + 1}.pdf`)}
                >
                  📥 Download PDF
                </button>
              ) : (
                <button
                  className="mt-2 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                  onClick={() => downloadTextPrescription(pres.prescriptionText || '', idx)}
                >
                  📥 Download as TXT
                </button>
              )}
            </div>
          ))
        )}
      </div>

      {/* Reports */}
      <div className="bg-white shadow-md rounded-lg p-4 mt-4">
        <h3 className="text-lg font-semibold mb-4">📑 My Reports</h3>
        {reports.length === 0 ? (
          <p>No reports uploaded yet.</p>
        ) : (
          reports.map((rep, idx) => (
            <div key={idx} className="my-2 p-2 border rounded-lg">
              <p><strong>File:</strong> {rep.fileName || `Report ${idx + 1}`}</p>
              <p><strong>Uploaded:</strong> {new Date(rep.createdAt).toLocaleDateString()}</p>
              <p><strong>Doctor:</strong> {getDoctorName(rep.doctorId)}</p>

              <button
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => handleDownload(rep.filePath, rep.fileName || `report-${idx + 1}.pdf`)}
              >
                📥 Download Report
              </button>
            </div>
          ))
        )}
      </div>

      {/* Chat Section */}
      <div className="mt-4">
        <ChatWindow
          role="patient"
          user={user?.patient}
          patientId={user?.patient?._id}
          patientName={user?.patient?.name}
        />
      </div>
    </div>
  );
}
