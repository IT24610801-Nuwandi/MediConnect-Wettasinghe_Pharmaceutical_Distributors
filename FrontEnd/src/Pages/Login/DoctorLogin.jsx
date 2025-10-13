// src/Pages/Login/DoctorLogin.jsx
import React, { useState } from 'react';
import axios from 'axios';
import '../../Pages/Login/Login.css';

const DoctorLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8083/api/doctors/login', formData);
      const { token, verified } = response.data;

      if (!verified) {
        setErrors({ general: 'Your account is not verified yet. Please wait for admin approval.' });
        return;
      }

      localStorage.setItem('auth_token', token);
      localStorage.setItem('auth_role', 'doctor');
      window.location.href = '/doctor/dashboard';
    } catch (error) {
      const message = error.response?.data || 'Login failed. Please try again.';
      setErrors({ general: message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Doctor Login</h2>

        {errors.general && <p className="error">{errors.general}</p>}

        <label htmlFor="email" className="input-label">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="username"
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <label htmlFor="password" className="input-label">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="current-password"
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className="login-links">
          <a href="/doctor/forgot-password">Forgot Password?</a>
        </p>

        <p className="register-redirect">
          Don’t have an account? <a href="/doctor/register">Register Here</a>
        </p>
      </form>
    </div>
  );
};

export default DoctorLogin;
