import { useEffect, useState } from 'react';
import ChatWindow from './ChatWindow';
import axios from 'axios';

export default function DoctorChat() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [appointments, setAppointments] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [prescriptionText, setPrescriptionText] = useState('');
  const [reportFile, setReportFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get(`/api/apis/appointments/doctor/${user?.doctor?._id}`);
      setAppointments(res.data);
    } catch (err) {
      console.error('Error fetching appointments:', err);
    }
  };

  const handlePrescriptionSubmit = async () => {
    if (!selectedPatient || !prescriptionText.trim()) {
      return alert('Please select a patient and write the prescription.');
    }

    const patient = appointments.find((apt) => apt.patientId?._id === selectedPatient);
    const doctorName = user.doctor.name;
    const patientName = patient?.patientId?.name || 'Unknown Patient';

    const formattedPrescription = `
Prescription
------------
Doctor: ${doctorName}
Patient: ${patientName}
Date: ${new Date().toLocaleDateString()}
----------------------------------------
${prescriptionText}
    `;

    try {
      await axios.post('/api/apis/prescription/create', {
        doctorId: user.doctor._id,
        patientId: selectedPatient,
        prescriptionText: formattedPrescription,
        doctorName,
        patientName,
      });

      alert('✅ Prescription saved and sent successfully.');
      setPrescriptionText('');
    } catch (error) {
      console.error('Error sending prescription:', error);
      alert('Failed to send prescription.');
    }
  };

  const handleReportSubmit = async () => {
    if (!selectedPatient || !reportFile) {
      alert('Please select a patient and choose a report file.');
      return;
    }
  
    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('reportFile', reportFile);
      formData.append('doctorId', user.doctor._id);
      formData.append('patientId', selectedPatient);
  
      const res = await axios.post('/api/apis/report/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
  
      console.log(res.data);
      alert('✅ Report uploaded successfully!');
      setReportFile(null);
      document.getElementById('reportFileInput').value = '';
    } catch (error) {
      console.error('Error uploading report:', error);
      alert('❌ Failed to upload report. Try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl text-blue-600 font-bold mb-2">Doctor Dashboard</h1>
      <h2 className="text-xl mb-4">Welcome Dr. {user?.doctor?.name}</h2>

      <ChatWindow role="doctor" user={user.doctor} />

      <div className="bg-white shadow-md rounded-lg p-6 mt-5">
        <h3 className="text-lg font-semibold mb-4">Send Prescription / Upload Report</h3>

        <select
          className="w-full p-2 border rounded mb-4"
          value={selectedPatient}
          onChange={(e) => setSelectedPatient(e.target.value)}
        >
          <option value="" disabled>Select Patient</option>
          {appointments.map((apt) => (
            <option key={apt._id} value={apt.patientId?._id}>
              {apt.patientId?.name}
            </option>
          ))}
        </select>

        <textarea
          className="w-full p-2 border rounded mb-4 min-h-[150px]"
          placeholder="Write Prescription"
          value={prescriptionText}
          onChange={(e) => setPrescriptionText(e.target.value)}
        />

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
          onClick={handlePrescriptionSubmit}
          disabled={!selectedPatient}
        >
          Send Prescription
        </button>

        <div className="mt-6">
          <p className="text-sm mb-2">Upload Report (PDF/Image)</p>
          <input
            id="reportFileInput"
            type="file"
            accept=".pdf,.png,.jpg,.jpeg"
            className="w-full file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-blue-50 hover:file:bg-blue-100"
            onChange={(e) => setReportFile(e.target.files[0])}
          />

          <button
            className="mt-4 w-full bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 disabled:bg-purple-300"
            onClick={handleReportSubmit}
            disabled={!selectedPatient || isUploading}
          >
            {isUploading ? 'Uploading...' : 'Upload Report'}
          </button>
        </div>
      </div>
    </div>
  );
}