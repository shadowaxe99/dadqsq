import React, { useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { apiService } from '../services/apiService';

const Settings = () => {
  const [settings, setSettings] = useState({
    companyName: '',
    companyAddress: '',
    companyEmail: '',
    companyPhone: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        const response = await apiService.get('/api/settings');
        setSettings(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prevSettings => ({
      ...prevSettings,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiService.put('/api/settings', settings);
      alert('Settings updated successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="settings-page">
      <h2>Company Settings</h2>
      <form id="settings-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="companyName">Company Name:</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={settings.companyName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="companyAddress">Company Address:</label>
          <input
            type="text"
            id="companyAddress"
            name="companyAddress"
            value={settings.companyAddress}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="companyEmail">Company Email:</label>
          <input
            type="email"
            id="companyEmail"
            name="companyEmail"
            value={settings.companyEmail}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="companyPhone">Company Phone:</label>
          <input
            type="tel"
            id="companyPhone"
            name="companyPhone"
            value={settings.companyPhone}
            onChange={handleChange}
          />
        </div>
        <button type="submit" disabled={loading}>Update Settings</button>
      </form>
    </div>
  );
};

export default Settings;