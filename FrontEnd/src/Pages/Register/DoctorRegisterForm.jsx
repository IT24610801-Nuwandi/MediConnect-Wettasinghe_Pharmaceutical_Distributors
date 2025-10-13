import React, { useState } from 'react';
import axios from 'axios';
import '../../Pages/Login/Login.css'; // Reuse Login.css for layout and styling
import heroDoctor from '../../assets/doctor.jpg'; // Make sure this path is correct

const DoctorRegisterForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    licenseNumber: '',
    specialization: '',
    contactNumber: '',
    licenseFile: null,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    if (!formData.licenseNumber.trim()) newErrors.licenseNumber = 'License number is required';
    if (!formData.specialization.trim()) newErrors.specialization = 'Specialization is required';
    if (!formData.contactNumber.trim()) newErrors.contactNumber = 'Contact number is required';
    if (!formData.licenseFile) newErrors.licenseFile = 'License file is required';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/;
    if (formData.password && !passwordRegex.test(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters and include a number and special character';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (formData.licenseFile) {
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      if (!allowedTypes.includes(formData.licenseFile.type)) {
        newErrors.licenseFile = 'File must be PDF, JPG, or PNG';
      }
      if (formData.licenseFile.size > 2 * 1024 * 1024) {
        newErrors.licenseFile = 'File size must be under 2MB';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const data = new FormData();
    data.append('fullName', formData.fullName);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('licenseNumber', formData.licenseNumber);
    data.append('specialization', formData.specialization);
    data.append('contactNumber', formData.contactNumber);
    data.append('license', formData.licenseFile);

    try {
      const response = await axios.post('http://localhost:8083/api/doctors/register', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log('Registration successful:', response.data);
      window.location.href = '/login?role=doctor';
    } catch (error) {
      const message = error.response?.data || 'Registration failed. Please try again.';
      setErrors({ general: message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-split" style={{ display: 'grid' }}>
      {/* Left: Hero */}
      <div className="auth-hero">
        <img src={heroDoctor} alt="Doctor Registration" className="hero-img" />
        <div className="overlay">
          <div className="brand">Medi Connect</div>
          <div className="tagline">Join our trusted network of verified doctors.</div>
        </div>
      </div>

      {/* Right: Form */}
      <div className="auth-panel">
        <div className="panel-inner">
          <h2 className="title">Doctor Sign Up</h2>
          <p className="subtitle">Register to manage prescriptions and patient care.</p>

          <form className="form" onSubmit={handleSubmit}>
            {errors.general && <div className="alert">{errors.general}</div>}

            <div className="field">
              <label className="label">Full Name</label>
              <input className="input" type="text" name="fullName" onChange={handleChange} />
              {errors.fullName && <div className="alert">{errors.fullName}</div>}
            </div>

            <div className="field">
              <label className="label">Email</label>
              <input className="input" type="email" name="email" onChange={handleChange} />
              {errors.email && <div className="alert">{errors.email}</div>}
            </div>

            <div className="field">
              <label className="label">Password</label>
              <input className="input" type="password" name="password" onChange={handleChange} />
              {errors.password && <div className="alert">{errors.password}</div>}
            </div>

            <div className="field">
              <label className="label">Confirm Password</label>
              <input className="input" type="password" name="confirmPassword" onChange={handleChange} />
              {errors.confirmPassword && <div className="alert">{errors.confirmPassword}</div>}
            </div>

            <div className="field">
              <label className="label">License Number</label>
              <input className="input" type="text" name="licenseNumber" onChange={handleChange} />
              {errors.licenseNumber && <div className="alert">{errors.licenseNumber}</div>}
            </div>

            <div className="field">
              <label className="label">Specialization</label>
              <input className="input" type="text" name="specialization" onChange={handleChange} />
              {errors.specialization && <div className="alert">{errors.specialization}</div>}
            </div>

            <div className="field">
              <label className="label">Contact Number</label>
              <input className="input" type="text" name="contactNumber" onChange={handleChange} />
              {errors.contactNumber && <div className="alert">{errors.contactNumber}</div>}
            </div>

            <div className="field">
              <label className="label">Upload Doctor License</label>
              <input
                className="input"
                type="file"
                name="licenseFile"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleChange}
              />
              {formData.licenseFile && (
                <p className="file-name">Selected: {formData.licenseFile.name}</p>
              )}
              {errors.licenseFile && <div className="alert">{errors.licenseFile}</div>}
            </div>

            <div style={{ marginTop: 12, display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn primary" type="submit" disabled={loading}>
                {loading ? 'Submitting…' : 'Sign Up'}
              </button>
            </div>

            <p className="footer">
              Already have an account? <a className="link" href="/login?role=doctor">Login Here</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DoctorRegisterForm;
