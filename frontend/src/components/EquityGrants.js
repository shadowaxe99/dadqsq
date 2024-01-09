import React, { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';
import './styles/EquityGrants.css';

const EquityGrants = () => {
  const [equityGrants, setEquityGrants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEquityGrants = async () => {
      setLoading(true);
      try {
        const response = await apiService.get('/api/equitygrants');
        setEquityGrants(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEquityGrants();
  }, []);

  const handleIssueGrant = async (grantData) => {
    try {
      const response = await apiService.post('/api/equitygrants', grantData);
      setEquityGrants([...equityGrants, response.data]);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="equity-grants-page">
      <h1>Equity Grants</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Shareholder</th>
            <th>Number of Shares</th>
            <th>Grant Date</th>
            <th>Vesting Schedule</th>
          </tr>
        </thead>
        <tbody>
          {equityGrants.map((grant) => (
            <tr key={grant._id}>
              <td>{grant._id}</td>
              <td>{grant.shareholder}</td>
              <td>{grant.numberOfShares}</td>
              <td>{new Date(grant.grantDate).toLocaleDateString()}</td>
              <td>{grant.vestingSchedule}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="issue-grant-form">
        <h2>Issue a New Equity Grant</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const grantData = {
            shareholder: formData.get('shareholder'),
            numberOfShares: formData.get('numberOfShares'),
            grantDate: formData.get('grantDate'),
            vestingSchedule: formData.get('vestingSchedule')
          };
          handleIssueGrant(grantData);
        }}>
          <label htmlFor="shareholder">Shareholder:</label>
          <input type="text" id="shareholder" name="shareholder" required />

          <label htmlFor="numberOfShares">Number of Shares:</label>
          <input type="number" id="numberOfShares" name="numberOfShares" required />

          <label htmlFor="grantDate">Grant Date:</label>
          <input type="date" id="grantDate" name="grantDate" required />

          <label htmlFor="vestingSchedule">Vesting Schedule:</label>
          <input type="text" id="vestingSchedule" name="vestingSchedule" required />

          <button type="submit">Issue Grant</button>
        </form>
      </div>
    </div>
  );
};

export default EquityGrants;