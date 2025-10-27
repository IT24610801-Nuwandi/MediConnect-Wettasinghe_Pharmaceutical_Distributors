import React, { useEffect, useState } from 'react';
import { api } from '../../../../api/api';

const AdminDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPendingDoctors = async () => {
      try {
        console.log('Fetching pending doctors...');
        const response = await api.get('/doctors?status=pending');
        console.log('Doctors data received:', response.data);
        setDoctors(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setError('Failed to load doctors. Please check if the server is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchPendingDoctors();
  }, []);

  const handleApprove = async (id) => {
    try {
      await api.patch(`/doctors/${id}`, { status: 'approved' });
      setDoctors((prev) => prev.filter((doc) => doc.id !== id || doc._id !== id));
    } catch (error) {
      console.error('Error approving doctor:', error);
      alert('Failed to approve doctor');
    }
  };

  const handleReject = async (id) => {
    try {
      await api.patch(`/doctors/${id}`, { status: 'rejected' });
      setDoctors((prev) => prev.filter((doc) => doc.id !== id || doc._id !== id));
    } catch (error) {
      console.error('Error rejecting doctor:', error);
      alert('Failed to reject doctor');
    }
  };

  return (
    <div className="admin-dashboard">
      <h3>Pending Doctor Verifications</h3>
      
      {error && (
        <div style={{ color: 'red', padding: '10px', background: '#fee', borderRadius: '5px', marginBottom: '10px' }}>
          {error}
        </div>
      )}
      
      {loading ? (
        <p>Loading doctors...</p>
      ) : doctors.length === 0 ? (
        <p>No pending doctor registrations found.</p>
      ) : (
        doctors.map((doc) => (
          <div key={doc.id || doc._id} className="doctor-card">
            <p><strong>Name:</strong> {doc.fullName}</p>
            <p><strong>Email:</strong> {doc.email}</p>
            <p><strong>License:</strong> {doc.licenseNumber}</p>
            <div className="action-buttons">
              <button onClick={() => handleApprove(doc.id || doc._id)}>✅ Approve</button>
              <button onClick={() => handleReject(doc.id || doc._id)}>❌ Reject</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminDashboard;