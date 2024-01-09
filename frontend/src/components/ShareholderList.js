import React, { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';
import './styles/shareholderList.css';

const ShareholderList = () => {
  const [shareholders, setShareholders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShareholders = async () => {
      try {
        const response = await apiService.get('/api/shareholders');
        setShareholders(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchShareholders();
  }, []);

  if (loading) {
    return <div>Loading shareholders...</div>;
  }

  if (error) {
    return <div>Error fetching shareholders: {error}</div>;
  }

  return (
    <div className="shareholder-list-container">
      <h2>Shareholders</h2>
      <table className="shareholder-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Shares Owned</th>
            <th>Percentage Ownership</th>
          </tr>
        </thead>
        <tbody>
          {shareholders.map((shareholder) => (
            <tr key={shareholder._id}>
              <td>{shareholder.name}</td>
              <td>{shareholder.email}</td>
              <td>{shareholder.sharesOwned}</td>
              <td>{(shareholder.percentageOwnership * 100).toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShareholderList;