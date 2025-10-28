import React, { useEffect, useState } from "react";
import "./Profile.css";

export default function DoctorProfile() {
  const [doctor, setDoctor] = useState(null);
  const email = localStorage.getItem("doctor_email");

  useEffect(() => {
    if (!email) return;

    fetch(`/api/doctor/dashboard?email=${email}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch profile");
        return res.json();
      })
      .then((data) => setDoctor(data))
      .catch((err) => console.error("Profile fetch error:", err));
  }, [email]);

  if (!doctor) {
    return <div className="profile-loading">Loading profile...</div>;
  }

  return (
    <div className="profile-wrap">
      {/* Left panel */}
      <div className="profile-left">
        <div className={`photo-card ${doctor.profileImageUrl ? "" : "fallback"}`}>
          {doctor.profileImageUrl ? (
            <img src={doctor.profileImageUrl} alt="Doctor" className="photo" />
          ) : (
            <div className="photo fallback">
              {doctor.fullName?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="summary">
          <div className="summary-name">Dr. {doctor.fullName}</div>
          <div className="summary-email">{doctor.email}</div>
        </div>
      </div>

      {/* Right panel */}
      <div className="profile-right">
        <div className="toolbar">
          <div className="badge view">Verified</div>
          <div className="toolbar-actions">
            <button className="btn ghost" disabled>Edit</button>
          </div>
        </div>

        <form className="profile-form">
          <div className="row">
            <div className="field">
              <label className="label">License Number</label>
              <input type="text" value={doctor.licenseNumber} disabled />
            </div>
            <div className="field">
              <label className="label">Specialization</label>
              <input type="text" value={doctor.specialization} disabled />
            </div>
          </div>
          <div className="row">
            <div className="field">
              <label className="label">Contact Number</label>
              <input type="text" value={doctor.contactNumber} disabled />
            </div>
            <div className="field">
              <label className="label">Verification Status</label>
              <input type="text" value={doctor.verificationStatus} disabled />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
